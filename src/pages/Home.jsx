// === FILENAME: src/pages/Home.jsx ===
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import FixturesSection from '../components/FixturesSection';
import BochasSection from '../components/BochasSection';
import SponsorsSection from '../components/SponsorsSection';

// ── Styled Components ──────────────────────────────────────────────────────────

const PageContainer = styled(motion.div)`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <NewsSection />
      <FixturesSection />
      <BochasSection />
      <SponsorsSection />
    </PageContainer>
  );
}
