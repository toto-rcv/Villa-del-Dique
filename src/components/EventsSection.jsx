// === FILENAME: src/components/EventsSection.jsx ===
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBookOpen,
  FaStar,
} from 'react-icons/fa';
import { getEventos, formatDateAR } from '../services/api';

// ── Styled Components ──────────────────────────────────────────────────────────

const Section = styled.section`
  padding: 100px 5% 80px;
  background: linear-gradient(180deg, #0a1320 0%, #0d1b2a 100%);
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
    background: #f59e0b;
    border-radius: 2px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-top: 25px;
  font-weight: 600;
`;

const FeaturedWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto 50px;
`;

const FeaturedCard = styled(motion.article)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  min-height: 360px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(0, 0, 0, 0.5));
  border-radius: 20px;
  overflow: hidden;
  border-top: 4px solid #f59e0b;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 70px rgba(245, 158, 11, 0.25);

    .feat-cta svg {
      transform: translateX(6px);
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImage = styled.div`
  position: relative;
  background: linear-gradient(135deg, #b45309 0%, #000 100%);
  min-height: 280px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 30% 60%, rgba(245, 158, 11, 0.35) 0%, transparent 65%),
      repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.03) 0,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 24px
      );
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5.5rem;
    color: rgba(255, 255, 255, 0.15);
    z-index: 1;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  background: #f59e0b;
  color: #1a1a1a;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const FeaturedContent = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 30px 24px;
  }
`;

const FeaturedCategory = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: #f59e0b;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 14px;
`;

const FeaturedTitle = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.4vw, 2.4rem);
  color: #fff;
  letter-spacing: 1px;
  line-height: 1.15;
  margin-bottom: 18px;
`;

const FeaturedExcerpt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 24px;
`;

const FeaturedMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 28px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  svg {
    color: #f59e0b;
    font-size: 0.85rem;
  }
`;

const FeaturedCTA = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.85rem;

  svg {
    color: #f59e0b;
    transition: transform 0.3s ease;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled(motion.article)`
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.08), rgba(0, 0, 0, 0.4));
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-left: 4px solid #f59e0b;
  border-radius: 12px;
  padding: 22px 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #f59e0b;
    box-shadow: 0 12px 30px rgba(245, 158, 11, 0.18);
  }
`;

const EventCategory = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  color: #f59e0b;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const EventTitle = styled.h4`
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: #fff;
  letter-spacing: 0.5px;
  line-height: 1.25;
`;

const EventExcerpt = styled.p`
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.65);
  flex: 1;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 8px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  svg {
    color: #f59e0b;
    font-size: 0.72rem;
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
  border: 2px solid #f59e0b;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f59e0b;
    color: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(245, 158, 11, 0.35);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const Empty = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  padding: 30px;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

// ── Util ───────────────────────────────────────────────────────────────────────

function parseDateForSort(str) {
  try {
    const months = {
      ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
      jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
    };
    const parts = String(str).toLowerCase().split(' ');
    if (parts.length !== 3) return 0;
    const d = parseInt(parts[0], 10);
    const m = months[parts[1].slice(0, 3)] ?? 0;
    const y = parseInt(parts[2], 10);
    return new Date(y, m, d).getTime();
  } catch {
    return 0;
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function EventsSection() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getEventos({ limit: 20 })
      .then((data) => {
        if (cancelled || data === null) return;
        setEventos(
          data.map((e) => ({
            id: e.documentId || e.id,
            title: e.title,
            excerpt: e.description,
            date: formatDateAR(e.date),
            location: e.location,
            category: e.category || 'Evento',
            featured: !!e.featured,
            link: e.link,
            cover: e.cover,
          }))
        );
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // El destacado: el primero con featured=true, o si no hay, el más próximo en fecha
  const featured = useMemo(() => {
    const flagged = eventos.find((e) => e.featured);
    if (flagged) return flagged;
    const sorted = [...eventos].sort(
      (a, b) => parseDateForSort(b.date) - parseDateForSort(a.date)
    );
    return sorted[0] || null;
  }, [eventos]);

  const rest = useMemo(() => {
    return eventos
      .filter((e) => !featured || e.id !== featured.id)
      .sort((a, b) => parseDateForSort(b.date) - parseDateForSort(a.date))
      .slice(0, 6);
  }, [eventos, featured]);

  const goToEvent = (e) => {
    if (!e) return;
    navigate(`/eventos/${e.id}`);
  };

  if (eventos.length === 0) {
    return null; // No mostramos la sección vacía
  }

  return (
    <Section>
      <Header>
        <Title
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          EVENTOS DEL CLUB
        </Title>
        <Subtitle
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          Actividades, encuentros y celebraciones
        </Subtitle>
      </Header>

      {featured && (
        <FeaturedWrapper>
          <FeaturedCard
            variants={heroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            onClick={() => goToEvent(featured)}
          >
            <FeaturedImage>
              <FeaturedBadge>
                <FaStar /> Destacado
              </FeaturedBadge>
              {featured.cover ? (
                <img src={featured.cover} alt={featured.title} />
              ) : (
                <FaBookOpen />
              )}
            </FeaturedImage>
            <FeaturedContent>
              <FeaturedCategory>{featured.category}</FeaturedCategory>
              <FeaturedTitle>{featured.title}</FeaturedTitle>
              {featured.excerpt && <FeaturedExcerpt>{featured.excerpt}</FeaturedExcerpt>}
              <FeaturedMeta>
                <span><FaCalendarAlt /> {featured.date}</span>
                {featured.location && (
                  <span><FaMapMarkerAlt /> {featured.location}</span>
                )}
              </FeaturedMeta>
              <FeaturedCTA className="feat-cta">
                Ver detalle <FaArrowRight />
              </FeaturedCTA>
            </FeaturedContent>
          </FeaturedCard>
        </FeaturedWrapper>
      )}

      {rest.length > 0 ? (
        <Grid
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {rest.map((e) => (
            <EventCard
              key={e.id}
              variants={cardVariants}
              onClick={() => goToEvent(e)}
              whileHover={{ y: -4 }}
            >
              <EventCategory>{e.category}</EventCategory>
              <EventTitle>{e.title}</EventTitle>
              {e.excerpt && <EventExcerpt>{e.excerpt}</EventExcerpt>}
              <EventMeta>
                <span><FaCalendarAlt /> {e.date}</span>
                {e.location && (
                  <span><FaMapMarkerAlt /> {e.location}</span>
                )}
              </EventMeta>
            </EventCard>
          ))}
        </Grid>
      ) : (
        <Empty>No hay otros eventos programados.</Empty>
      )}

      <ViewAllRow
        variants={heroVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ViewAllButton onClick={() => navigate('/calendario')}>
          Ver calendario completo <FaArrowRight />
        </ViewAllButton>
      </ViewAllRow>
    </Section>
  );
}
