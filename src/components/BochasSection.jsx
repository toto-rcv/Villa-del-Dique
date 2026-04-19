// === FILENAME: src/components/FeminineSection.jsx ===
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NewsCard from './NewsCard';
import FixtureCard from './FixtureCard';
import { newsDataFem } from '../data/newsDataFem';
import { fixturesDataFem } from '../data/fixturesDataFem';

// ── Styled Components ──────────────────────────────────────────────────────────

const Section = styled.section`
  padding: 100px 5%;
  background: radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, #000 70%);
  position: relative;
  border-top: 1px solid rgba(16, 185, 129, 0.1);
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
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
    background: var(--bocha-accent);
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

const GridNews = styled(motion.div)`
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

const GridFixtures = styled(motion.div)`
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
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function BochasSection() {
  return (
    <Section>
      <Header>
        <Title
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          PRIMERA DIVISION BOCHA
        </Title>
        <Subtitle
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          ÚLTIMAS NOTICIAS
        </Subtitle>
      </Header>

      <GridNews
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {newsDataFem.slice(0, 3).map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            excerpt={news.excerpt}
            date={news.date}
            category={news.category}
            isBocha={true}
          />
        ))}
      </GridNews>

      <div style={{ height: '80px' }} />

      {/* --- RESULTADOS BOCHA --- */}
      <Header>
        <Subtitle
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          ÚLTIMOS RESULTADOS
        </Subtitle>
      </Header>

      <GridFixtures
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {fixturesDataFem.map((fixture) => (
          <FixtureCard key={fixture.id} data={fixture} isBocha={true} />
        ))}
      </GridFixtures>
    </Section>
  );
}
