// === FILENAME: src/pages/NewsPage.jsx ===
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import NewsCard from '../components/NewsCard';
import { getNewsById, getNews, formatDateAR } from '../services/api';

// ── Styled Components ──────────────────────────────────────────────────────────

const PageContainer = styled(motion.main)`
  min-height: 100vh;
  padding-top: 70px;
  background: var(--gradient-2);
`;

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background: ${(props) => 
    props.$isFem 
      ? 'linear-gradient(135deg, #7e22ce, #000)' 
      : 'linear-gradient(135deg, var(--dark-blue), #000)'};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, var(--card-bg) 0%, transparent 100%);
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
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.$isFem ? 'var(--fem-accent)' : 'var(--blue)'};
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
  border-top: 4px solid ${(props) => props.$isFem ? 'var(--fem-accent)' : 'var(--blue)'};

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
`;

const Category = styled.span`
  font-weight: 800;
  color: ${(props) => props.$isFem ? 'var(--fem-accent)' : 'var(--blue)'};
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
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 30px;
  letter-spacing: 1px;
`;

const BodyContent = styled.div`
  font-size: 1.15rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.85);

  p {
    margin-bottom: 24px;
  }
`;

const RelatedSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 5%;
`;

const RelatedTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 2.5rem;
  letter-spacing: 2px;
  color: #fff;
  margin-bottom: 40px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NotFound = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 3rem;
  color: #fff;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function NewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setArticle(null);
    setRelatedNews([]);

    getNewsById(id)
      .then((n) => {
        if (cancelled || !n) return;
        setArticle({
          id: n.id,
          title: n.title,
          excerpt: n.excerpt,
          body: n.body,
          date: formatDateAR(n.date),
          category: n.category,
          variant: n.variant,
          cover: n.cover,
        });
        // Relacionadas: últimas noticias de la misma variante
        return getNews({ variant: n.variant || 'main', limit: 4 }).then((list) => {
          if (cancelled) return;
          setRelatedNews(
            (list || [])
              .filter((it) => String(it.id) !== String(n.id))
              .slice(0, 3)
              .map((it) => ({
                id: it.id,
                title: it.title,
                excerpt: it.excerpt,
                date: formatDateAR(it.date),
                category: it.category,
                _variant: it.variant === 'bochas' ? 'bocha' : 'main',
              }))
          );
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => { cancelled = true; };
  }, [id]);

  const isFemItem = article ? article.variant === 'bochas' : false;

  // Mientras carga la primera respuesta, no decidir "no encontrada"
  if (!article && !loaded) {
    return <PageContainer />;
  }

  if (!article) {
    return (
      <PageContainer>
        <NotFound>Noticia no encontrada</NotFound>
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
      <HeroImage $isFem={isFemItem}>
        <BackButton onClick={() => navigate(-1)} $isFem={isFemItem}>
          <FaArrowLeft /> Volver
        </BackButton>
      </HeroImage>

      <ContentContainer $isFem={isFemItem}>
        <MetaRow>
          <Category $isFem={isFemItem}>{article.category}</Category>
          <DateText>{article.date}</DateText>
        </MetaRow>

        <Title>{article.title}</Title>

        <BodyContent>
          {article.body ? (
            <p>{article.body}</p>
          ) : (
            <p>{article.excerpt}</p>
          )}
        </BodyContent>
      </ContentContainer>

      {relatedNews.length > 0 && (
        <RelatedSection>
          <RelatedTitle>Otras Noticias</RelatedTitle>
          <Grid>
            {relatedNews.map((news) => (
              <NewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                date={news.date}
                category={news.category}
                isFem={isFemItem}
              />
            ))}
          </Grid>
        </RelatedSection>
      )}
    </PageContainer>
  );
}
