// === FILENAME: src/components/Hero.jsx ===
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

// ── Styled Components ──────────────────────────────────────────────────────────

const HeroWrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 100%, rgba(59, 163, 239, 0.22) 0%, transparent 62%),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.025) 0px,
      rgba(255,255,255,0.025) 1px,
      transparent 1px,
      transparent 80px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.025) 0px,
      rgba(255,255,255,0.025) 1px,
      transparent 1px,
      transparent 80px
    ),
    linear-gradient(180deg, #000000 0%, #0D2A45 40%, #1A4D2E 80%, #000000 100%);
  transform-origin: center top;
  will-change: transform;
`;

const CenterCircle = styled.div`
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
  width: min(260px, 38vw);
  height: min(260px, 38vw);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.06);
  pointer-events: none;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled(motion.p)`
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3.5vw, 3rem);
  color: var(--blue);
  letter-spacing: 8px;
  margin-bottom: 4px;
`;

const MainTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 9vw, 9rem);
  color: #fff;
  letter-spacing: 12px;
  line-height: 1;
  text-shadow:
    0 0 40px rgba(59, 163, 239, 0.6),
    0 0 80px rgba(59, 163, 239, 0.3);
`;

const Divider = styled(motion.div)`
  width: 120px;
  height: 2px;
  background: var(--blue);
  margin: 24px auto;
  border-radius: 2px;
`;

const Tagline = styled(motion.p)`
  font-family: var(--font-body);
  font-size: clamp(0.75rem, 1.5vw, 1.1rem);
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 4px;
  text-transform: uppercase;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  color: var(--blue);
  font-size: 1.5rem;
  cursor: pointer;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const itemVariant = (delay) => ({
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
});

const bounceVariant = {
  animate: {
    y: [0, 10, 0],
    transition: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
  },
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <HeroWrapper>
      <Background ref={bgRef} />
      <CenterCircle />
      <Overlay />

      <Content>
        <SubTitle {...itemVariant(0.3)}>
          CLUB DEPORTIVO
        </SubTitle>

        <MainTitle {...itemVariant(0.6)}>
          VILLA DEL DIQUE
        </MainTitle>

        <Divider {...itemVariant(0.9)} />

        <Tagline {...itemVariant(1.1)}>
          Pasión, esfuerzo y comunidad
        </Tagline>
      </Content>

      <ScrollIndicator
        variants={bounceVariant}
        animate="animate"
        onClick={handleScrollDown}
      >
        <FaChevronDown />
      </ScrollIndicator>
    </HeroWrapper>
  );
}
