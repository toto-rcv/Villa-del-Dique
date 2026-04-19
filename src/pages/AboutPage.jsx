// === FILENAME: src/pages/AboutPage.jsx ===
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
  max-width: 800px;
  line-height: 1.6;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Title>QUIÉNES SOMOS</Title>
      <Message>
        El Club Deportivo Villa del Dique es el corazón deportivo y social de nuestra comunidad. 
        Fundado hace más de cuatro décadas, nuestra misión ha sido siempre formar personas a través del deporte, 
        promoviendo valores de compañerismo, esfuerzo y superación constante.
      </Message>
    </PageContainer>
  );
}
