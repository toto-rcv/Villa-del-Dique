// === FILENAME: src/components/NewsSection.jsx ===
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaFutbol } from 'react-icons/fa';
import NewsCard from './NewsCard';
import { getNews, formatDateAR } from '../services/api';

const Section = styled.section`
  padding: 100px 5% 80px;
  background: var(--gradient-2);
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled(motion.h2)`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: 4px;
  color: #fff;
  margin-bottom: 8px;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 20%;
    width: 60%;
    height: 4px;
    background: var(--blue);
    border-radius: 2px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-top: 25px;
  font-weight: 600;
`;

const HeroWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px;
`;

const HeroCard = styled(motion.article)`
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  min-height: 400px;
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  border-top: 4px solid var(--blue);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 70px rgba(59, 163, 239, 0.25);

    .hero-img {
      transform: scale(1.04);
    }
    .hero-cta svg {
      transform: translateX(6px);
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroImage = styled.div`
  position: relative;
  background: linear-gradient(135deg, var(--dark-blue) 0%, #000 100%);
  min-height: 280px;
  overflow: hidden;
  transition: transform 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 100%, rgba(59, 163, 239, 0.3) 0%, transparent 65%),
      repeating-linear-gradient(
        90deg,
        rgba(255,255,255,0.03) 0px,
        rgba(255,255,255,0.03) 1px,
        transparent 1px,
        transparent 40px
      );
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6) 100%);
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 6rem;
    color: rgba(255, 255, 255, 0.08);
    z-index: 1;
  }
`;

const HeroBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  background: var(--blue);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 800;
`;

const HeroContent = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 30px 24px;
  }
`;

const HeroCategory = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--blue);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 14px;
`;

const HeroTitle = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.4vw, 2.4rem);
  color: #fff;
  letter-spacing: 1px;
  line-height: 1.15;
  margin-bottom: 18px;
`;

const HeroExcerpt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 24px;
`;

const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  svg {
    color: var(--blue);
    font-size: 0.8rem;
  }
`;

const HeroCTA = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.85rem;

  svg {
    color: var(--blue);
    transition: transform 0.3s ease;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ViewAllRow = styled(motion.div)`
  text-align: center;
  margin-top: 50px;
`;

const ViewAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 34px;
  border-radius: 30px;
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #fff;
  background: transparent;
  border: 2px solid var(--blue);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--blue);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(59, 163, 239, 0.35);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function NewsSection() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    // Todas las noticias excepto las de categoría Bochas (esas las muestra BochasSection).
    getNews({ categoriaNot: 'Bochas', limit: 5 })
      .then((data) => {
        if (cancelled || data === null) return;
        setItems(
          data.map((n) => ({
            id: n.documentId || n.id,
            title: n.title,
            excerpt: n.excerpt,
            date: formatDateAR(n.date),
            category: n.category || 'General',
            cover: n.cover,
          }))
        );
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const [featured, ...rest] = items;
  const secondary = rest.slice(0, 4);

  return (
    <Section>
      <Header>
        <Title
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          NOTICIAS DEL CLUB
        </Title>
        <Subtitle
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          Lo ultimo de nuestra institucion
        </Subtitle>
      </Header>

      {featured && (
        <HeroWrapper>
          <HeroCard
            variants={heroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            onClick={() => navigate(`/noticias/${featured.id}`)}
          >
            <HeroImage className="hero-img">
              <HeroBadge>Destacada</HeroBadge>
              <FaFutbol />
            </HeroImage>
            <HeroContent>
              <HeroCategory>{featured.category}</HeroCategory>
              <HeroTitle>{featured.title}</HeroTitle>
              <HeroExcerpt>{featured.excerpt}</HeroExcerpt>
              <HeroMeta>
                <span><FaCalendarAlt /> {featured.date}</span>
              </HeroMeta>
              <HeroCTA className="hero-cta">
                Leer nota completa <FaArrowRight />
              </HeroCTA>
            </HeroContent>
          </HeroCard>
        </HeroWrapper>
      )}

      <Grid
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {secondary.map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            excerpt={news.excerpt}
            date={news.date}
            category={news.category}
            isFem={false}
          />
        ))}
      </Grid>

      <ViewAllRow
        variants={heroVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ViewAllButton onClick={() => navigate('/noticias')}>
          Ver todas las noticias <FaArrowRight />
        </ViewAllButton>
      </ViewAllRow>
    </Section>
  );
}
