// === FILENAME: src/pages/EventoPage.jsx ===
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaBookOpen,
} from 'react-icons/fa';
import { getEventoById, formatDateAR } from '../services/api';

// ── Styled Components ──────────────────────────────────────────────────────────

const PageContainer = styled(motion.main)`
  min-height: 100vh;
  padding-top: 70px;
  background: var(--gradient-2);
`;

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #b45309 0%, #000 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, var(--card-bg) 0%, transparent 100%);
  }

  > svg {
    font-size: 5rem;
    color: rgba(255, 255, 255, 0.18);
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

const BackButton = styled.button`
  position: absolute;
  top: 40px;
  left: 5%;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-family: var(--font-display);
  font-size: 1.2rem;
  letter-spacing: 2px;
  background: rgba(0, 0, 0, 0.4);
  padding: 8px 20px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f59e0b;
    color: #1a1a1a;
    transform: translateX(-4px);
  }
`;

const ContentContainer = styled.article`
  max-width: 800px;
  margin: -100px auto 80px;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 60px;
  position: relative;
  z-index: 5;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border-top: 4px solid #f59e0b;

  @media (max-width: 768px) {
    margin: -60px 5% 60px;
    padding: 40px 24px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 10px;
`;

const Category = styled.span`
  font-weight: 800;
  color: #f59e0b;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
`;

const DateText = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 26px;
  letter-spacing: 1px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(245, 158, 11, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.18);
  border-radius: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    color: #f59e0b;
    font-size: 1.1rem;
    margin-top: 4px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  small {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  strong {
    font-size: 0.95rem;
    color: #fff;
    font-weight: 600;
  }
`;

const BodyContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.85);

  p {
    margin-bottom: 22px;
  }
`;

const InscribeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 14px 30px;
  background: #f59e0b;
  color: #1a1a1a;
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 800;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);
  }
`;

const NotFound = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  padding: 0 20px;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function EventoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [evento, setEvento] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setEvento(null);

    getEventoById(id)
      .then((e) => {
        if (cancelled || !e) return;
        setEvento({
          id: e.id,
          title: e.title,
          description: e.description,
          date: formatDateAR(e.date),
          dateEnd: e.dateEnd ? formatDateAR(e.dateEnd) : null,
          location: e.location,
          category: e.category || 'Evento',
          link: e.link,
          cover: e.cover,
        });
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoaded(true); });

    return () => { cancelled = true; };
  }, [id]);

  if (!evento && !loaded) {
    return <PageContainer />;
  }

  if (!evento) {
    return (
      <PageContainer>
        <NotFound>Evento no encontrado</NotFound>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroImage>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </BackButton>
        {evento.cover ? (
          <img src={evento.cover} alt={evento.title} />
        ) : (
          <FaBookOpen />
        )}
      </HeroImage>

      <ContentContainer>
        <MetaRow>
          <Category>{evento.category}</Category>
          <DateText>{evento.date}</DateText>
        </MetaRow>

        <Title>{evento.title}</Title>

        <InfoGrid>
          <InfoItem>
            <FaCalendarAlt />
            <div>
              <small>Fecha</small>
              <strong>
                {evento.date}
                {evento.dateEnd && evento.dateEnd !== evento.date && ` — ${evento.dateEnd}`}
              </strong>
            </div>
          </InfoItem>
          {evento.location && (
            <InfoItem>
              <FaMapMarkerAlt />
              <div>
                <small>Ubicación</small>
                <strong>{evento.location}</strong>
              </div>
            </InfoItem>
          )}
        </InfoGrid>

        {evento.description && (
          <BodyContent>
            <p>{evento.description}</p>
          </BodyContent>
        )}

        {evento.link && (
          <InscribeButton href={evento.link} target="_blank" rel="noopener noreferrer">
            Inscribirse / Más info <FaExternalLinkAlt />
          </InscribeButton>
        )}
      </ContentContainer>
    </PageContainer>
  );
}
