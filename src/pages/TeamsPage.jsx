// === FILENAME: src/pages/TeamsPage.jsx ===
import styled from 'styled-components';
import { motion } from 'framer-motion';

// ── Styled Components ──────────────────────────────────────────────────────────

const PageContainer = styled(motion.main)`
  min-height: 100vh;
  padding: 140px 5% 80px;
  background: var(--gradient-2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  color: #fff;
  letter-spacing: 4px;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(59, 163, 239, 0.4);
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function TeamsPage() {
  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Title>NUESTROS EQUIPOS</Title>
      <Message>
        Aquí encontrarás información detallada sobre los planteles de primera, 
        fútbol femenino y todas nuestras categorías formativas e inferiores.
      </Message>
    </PageContainer>
  );
}
