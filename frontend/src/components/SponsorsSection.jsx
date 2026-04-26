import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { sponsorsData } from '../data/sponsorsData';
import { getSponsors } from '../services/api';
import { FaBuilding } from 'react-icons/fa';

// ── Styled Components ──────────────────────────────────────────────────────────

const Section = styled.section`
  padding: 100px 5%;
  background: var(--card-bg);
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 60px;
`;

const Title = styled(motion.h2)`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: 4px;
  color: #fff;
  margin-bottom: 12px;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SponsorCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(59, 163, 239, 0.15);
  border-radius: 12px;
  padding: 30px 20px;
  text-decoration: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(59, 163, 239, 0.08), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: var(--blue);
    box-shadow: 0 10px 30px rgba(59, 163, 239, 0.15);
    
    &::before {
      opacity: 1;
    }

    .icon-placeholder {
      color: var(--blue);
      transform: scale(1.1);
    }
    
    .sponsor-name {
      color: #fff;
    }
  }
`;

const LogoPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  z-index: 1;

  svg {
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  z-index: 1;
  transition: transform 0.3s ease;
  background: rgba(255, 255, 255, 0.05);

  ${SponsorCard}:hover & {
    transform: scale(1.1);
  }
`;

const SponsorName = styled.span`
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    getSponsors()
      .then((data) => {
        if (cancelled) return;
        // data === null => Strapi caído -> usar estáticos
        // data === [] o array con items => Strapi es la fuente de verdad
        if (data === null) {
          setSponsors(sponsorsData);
        } else {
          setSponsors(data);
        }
      })
      .catch(() => {
        if (!cancelled) setSponsors(sponsorsData);
      });

    return () => { cancelled = true; };
  }, []);

  // Reliable visibility detection with IntersectionObserver + fallback
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Safety fallback: make visible after 2s no matter what
    const timer = setTimeout(() => setIsVisible(true), 2000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <Header>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          NUESTROS SPONSORS
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Gracias a quienes hacen posible el club
        </Subtitle>
      </Header>

      <Grid
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {sponsors.map((sponsor, idx) => (
          <SponsorCard
            key={sponsor.id}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            {sponsor.logo ? (
              <LogoImage src={sponsor.logo} alt={sponsor.name} />
            ) : (
              <LogoPlaceholder>
                <FaBuilding className="icon-placeholder" />
              </LogoPlaceholder>
            )}
            <SponsorName className="sponsor-name">{sponsor.name}</SponsorName>
          </SponsorCard>
        ))}
      </Grid>
    </Section>
  );
}
