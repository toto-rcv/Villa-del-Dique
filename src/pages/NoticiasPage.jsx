// === FILENAME: src/pages/NoticiasPage.jsx ===
import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import NewsCard from '../components/NewsCard';
import EventsSection from '../components/EventsSection';
import { getNews, formatDateAR } from '../services/api';

// ── Styled Components ──────────────────────────────────────────────────────────

const PageContainer = styled(motion.main)`
  min-height: 100vh;
  padding: 120px 5% 80px;
  background: var(--gradient-2);
`;

const Header = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto 50px;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  color: #fff;
  letter-spacing: 6px;
  margin-bottom: 14px;
  text-shadow: 0 0 40px rgba(59, 163, 239, 0.35);

  span {
    color: var(--blue);
  }
`;

const Lead = styled(motion.p)`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
`;

const FiltersBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 900px;
  margin: 0 auto 50px;
`;

const FilterChip = styled(motion.button)`
  padding: 9px 20px;
  border-radius: 22px;
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255,255,255,0.65)')};
  background: ${({ $active }) =>
    $active ? 'linear-gradient(135deg, var(--blue), var(--dark-blue))' : 'rgba(255,255,255,0.04)'};
  border: 1px solid
    ${({ $active }) => ($active ? 'transparent' : 'rgba(59, 163, 239, 0.2)')};
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    color: #fff;
    border-color: rgba(59, 163, 239, 0.6);
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

const Empty = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.55);
  padding: 80px 20px;
  font-size: 1.1rem;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function parseDateForSort(str) {
  // Formato esperado: "DD Mmm YYYY" — fallback a 0 si falla
  try {
    const months = {
      ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
      jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
    };
    const parts = str.toLowerCase().split(' ');
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

export default function NoticiasPage() {
  const [filter, setFilter] = useState('todas');
  const [news, setNews] = useState([]);

  useEffect(() => {
    let cancelled = false;

    getNews({ limit: 200 })
      .then((data) => {
        if (cancelled || data === null) return;
        setNews(
          data.map((n) => ({
            id: n.documentId || n.id,
            title: n.title,
            excerpt: n.excerpt,
            date: formatDateAR(n.date),
            category: n.category || 'General',
            _variant: n.variant === 'bochas' ? 'bocha' : 'main',
          }))
        );
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  const allNews = useMemo(() => {
    return [...news].sort(
      (a, b) => parseDateForSort(b.date) - parseDateForSort(a.date)
    );
  }, [news]);

  const categories = useMemo(() => {
    const set = new Set(allNews.map((n) => n.category));
    return ['todas', ...Array.from(set)];
  }, [allNews]);

  const filtered = useMemo(() => {
    if (filter === 'todas') return allNews;
    return allNews.filter((n) => n.category === filter);
  }, [allNews, filter]);

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header>
        <Title variants={headerVariants} initial="hidden" animate="visible">
          ÚLTIMAS <span>NOTICIAS</span>
        </Title>
        <Lead
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          Enterate de todo lo que pasa en el Club Deportivo y Biblioteca Villa del Dique:
          resultados, actividades institucionales, vida comunitaria y más.
        </Lead>
      </Header>

      <FiltersBar>
        {categories.map((cat) => (
          <FilterChip
            key={cat}
            $active={filter === cat}
            onClick={() => setFilter(cat)}
            whileTap={{ scale: 0.95 }}
          >
            {cat === 'todas' ? 'Todas' : cat}
          </FilterChip>
        ))}
      </FiltersBar>

      <AnimatePresence mode="wait">
        <Grid
          key={filter}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.length > 0 ? (
            filtered.map((news) => (
              <NewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                date={news.date}
                category={news.category}
                isBocha={news._variant === 'bocha'}
              />
            ))
          ) : (
            <Empty>No hay noticias en esta categoría.</Empty>
          )}
        </Grid>
      </AnimatePresence>

      {/* Sección de eventos: separada, con su hero destacado y grid */}
      <EventsSection />
    </PageContainer>
  );
}
