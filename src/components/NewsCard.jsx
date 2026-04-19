// === FILENAME: src/components/NewsCard.jsx ===
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaFutbol, FaArrowRight } from 'react-icons/fa';

// ── Styled Components ──────────────────────────────────────────────────────────

const CardContainer = styled(motion.article)`
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  border-top: 3px solid var(--blue);
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: border-top-width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.fem-accent {
    border-top-color: var(--fem-accent);
  }
  &.bocha-accent {
    border-top-color: var(--bocha-accent);
  }
`;

const ImageArea = styled.div`
  height: 180px;
  background: linear-gradient(135deg, var(--dark-blue), #000);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: filter 0.35s ease;

  .fem-accent & {
    background: linear-gradient(135deg, #7e22ce, #000);
  }
  .bocha-accent & {
    background: linear-gradient(135deg, #059669, #000);
  }

  svg {
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.15);
  }
`;

const DateBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--blue);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 1px;

  .fem-accent & {
    background: var(--fem-accent);
  }
  .bocha-accent & {
    background: var(--bocha-accent);
  }
`;

const ContentArea = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CategoryTag = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--blue);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;

  .fem-accent & {
    color: var(--fem-accent);
  }
  .bocha-accent & {
    color: var(--bocha-accent);
  }
`;

const Title = styled.h3`
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const Excerpt = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin-bottom: 20px;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`;

const CTA = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
  margin-top: auto;

  svg {
    transition: transform 0.3s ease;
  }
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function NewsCard({ id, title, excerpt, date, category, isFem, isBocha }) {
  const navigate = useNavigate();

  return (
    <CardContainer
      className={isFem ? 'fem-accent' : isBocha ? 'bocha-accent' : ''}
      variants={cardVariants}
      whileHover="hover"
      onClick={() => navigate(`/noticias/${id}`)}
      onHoverStart={(e) => {
        const el = e.target.closest('article');
        if(el) {
          el.style.borderTopWidth = '5px';
          el.style.boxShadow = isFem 
            ? '0 20px 60px rgba(192, 132, 252, 0.3)' 
            : isBocha
            ? '0 20px 60px rgba(16, 185, 129, 0.3)'
            : '0 20px 60px rgba(59, 163, 239, 0.3)';
          const img = el.querySelector('.img-area');
          if(img) img.style.filter = 'brightness(1.1)';
          const arrow = el.querySelector('.cta-arrow');
          if(arrow) arrow.style.transform = 'translateX(4px)';
        }
      }}
      onHoverEnd={(e) => {
        const el = e.target.closest('article');
        if(el) {
          el.style.borderTopWidth = '3px';
          el.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
          const img = el.querySelector('.img-area');
          if(img) img.style.filter = 'brightness(1)';
          const arrow = el.querySelector('.cta-arrow');
          if(arrow) arrow.style.transform = 'translateX(0)';
        }
      }}
    >
      <ImageArea className="img-area">
        <FaFutbol />
        <DateBadge>{date}</DateBadge>
      </ImageArea>

      <ContentArea>
        <CategoryTag>{category}</CategoryTag>
        <Title>{title}</Title>
        <Excerpt>{excerpt}</Excerpt>
        <CTA>
          Leer más <FaArrowRight className="cta-arrow" />
        </CTA>
      </ContentArea>
    </CardContainer>
  );
}
