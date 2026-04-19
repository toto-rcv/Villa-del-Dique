// === FILENAME: src/components/FixturesSection.jsx ===
import styled from 'styled-components';
import { motion } from 'framer-motion';
import FixtureCard from './FixtureCard';
import { fixturesData } from '../data/fixturesData';

// ── Styled Components ──────────────────────────────────────────────────────────

const Section = styled.section`
  padding: 60px 5% 100px;
  background: var(--card-bg);
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
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-top: 25px;
  font-weight: 600;
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function FixturesSection() {
  return (
    <Section>
      <Header>
        <Subtitle
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          ÚLTIMOS RESULTADOS
        </Subtitle>
      </Header>

      <Grid
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {fixturesData.map((fixture) => (
          <FixtureCard key={fixture.id} data={fixture} isFem={false} />
        ))}
      </Grid>
    </Section>
  );
}
