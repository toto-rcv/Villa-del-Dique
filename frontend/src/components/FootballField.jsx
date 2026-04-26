// === FILENAME: src/components/FootballField.jsx ===
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// ── Hooks ──────────────────────────────────────────────────────────────────────

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

// ── Styled Components ──────────────────────────────────────────────────────────

const FieldOuter = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  @media (min-width: 1024px) {
    max-width: 1188px;
  }
`;

const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $horizontal }) => ($horizontal ? '112.8 / 68' : '68 / 94')};
  background: repeating-linear-gradient(
    ${({ $horizontal }) => ($horizontal ? '90deg' : '0deg')},
    #0f6b3a 0px,
    #0f6b3a 36px,
    #12783f 36px,
    #12783f 72px
  );
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    inset 0 0 80px rgba(0, 0, 0, 0.35),
    0 20px 60px rgba(0, 0, 0, 0.45);
`;

const Lines = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const PlayerMarker = styled(motion.button)`
  position: absolute;
  left: ${({ $x }) => `${$x}%`};
  top: ${({ $y }) => `${$y}%`};
  transform: translate(-50%, -50%);
  width: clamp(42px, 9vw, 62px);
  height: clamp(42px, 9vw, 62px);
  border-radius: 50%;
  background: linear-gradient(145deg, var(--blue) 0%, var(--dark-blue) 100%);
  border: 3px solid #fff;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1rem, 2vw, 1.3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  padding: 0;
  box-shadow:
    0 4px 14px rgba(0, 0, 0, 0.55),
    0 0 0 0 rgba(59, 163, 239, 0.6);
  transition: box-shadow 0.3s ease, transform 0.15s ease;

  &:hover {
    box-shadow:
      0 6px 18px rgba(0, 0, 0, 0.65),
      0 0 0 10px rgba(59, 163, 239, 0.25);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 4px;
  }
`;

const MarkerPhoto = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const MarkerNumber = styled.span`
  position: relative;
  z-index: 1;
  ${({ $hasPhoto }) => $hasPhoto && `
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    position: absolute;
    bottom: -4px;
    right: -4px;
    border: 2px solid #fff;
  `}
`;

const PlayerLabel = styled.span`
  position: absolute;
  bottom: -26px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  padding: 3px 8px;
  border-radius: 10px;
  white-space: nowrap;
  pointer-events: none;
  text-transform: uppercase;

  @media (max-width: 540px) {
    font-size: 0.6rem;
    padding: 2px 6px;
    bottom: -22px;
  }
`;

const FormationBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 20px;
  letter-spacing: 3px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 3;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const markerVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  }),
  hover: { scale: 1.12, transition: { duration: 0.18 } },
  tap: { scale: 0.94 },
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function FootballField({ players, formation = '4-3-3', onPlayerClick }) {
  const isHorizontal = useMediaQuery('(min-width: 1024px)');

  return (
    <FieldOuter>
      <FieldWrapper $horizontal={isHorizontal}>
        <FormationBadge>{formation}</FormationBadge>

        {/* Pitch lines — SVG drawn on a 100x100 viewBox.
            En desktop rotamos el contenido 90° (CCW) para orientación horizontal. */}
        <Lines viewBox="0 0 100 100" preserveAspectRatio="none">
          <g transform={isHorizontal ? 'rotate(-90 50 50)' : undefined}>
            {/* Outer line */}
            <rect x="2" y="2" width="96" height="96" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            {/* Halfway line */}
            <line x1="2" y1="50" x2="98" y2="50" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            {/* Center circle */}
            <circle cx="50" cy="50" r="9" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            <circle cx="50" cy="50" r="0.6" fill="#fff" fillOpacity="0.8" />
            {/* Top penalty box (opponent side) */}
            <rect x="26" y="2" width="48" height="15" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            <rect x="38" y="2" width="24" height="6" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            <circle cx="50" cy="12" r="0.6" fill="#fff" fillOpacity="0.8" />
            <path d="M 42 17 A 9 9 0 0 0 58 17" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            {/* Bottom penalty box (our side) */}
            <rect x="26" y="83" width="48" height="15" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            <rect x="38" y="92" width="24" height="6" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            <circle cx="50" cy="88" r="0.6" fill="#fff" fillOpacity="0.8" />
            <path d="M 42 83 A 9 9 0 0 1 58 83" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            {/* Corner arcs */}
            <path d="M 2 4 A 2 2 0 0 0 4 2" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            <path d="M 96 2 A 2 2 0 0 0 98 4" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            <path d="M 2 96 A 2 2 0 0 1 4 98" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
            <path d="M 96 98 A 2 2 0 0 1 98 96" fill="none" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.8" />
          </g>
        </Lines>

        {players.map((p, i) => {
          // En horizontal aplicamos la misma rotación -90° (CCW) que al SVG:
          // (x, y) → (y, 100 - x). Así los jugadores quedan alineados con las
          // líneas y nuestro arco queda a la derecha.
          const $x = isHorizontal ? p.y : p.x;
          const $y = isHorizontal ? 100 - p.x : p.y;
          return (
            <PlayerMarker
              key={p.id}
              $x={$x}
              $y={$y}
              custom={i}
              variants={markerVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onPlayerClick?.(p)}
              aria-label={`${p.firstName} ${p.lastName} — ${p.position}`}
            >
              {p.photo && <MarkerPhoto src={p.photo} alt={`${p.firstName} ${p.lastName}`} />}
              <MarkerNumber $hasPhoto={!!p.photo}>{p.number}</MarkerNumber>
              <PlayerLabel>{p.lastName}</PlayerLabel>
            </PlayerMarker>
          );
        })}
      </FieldWrapper>
    </FieldOuter>
  );
}
