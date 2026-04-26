// === FILENAME: src/components/SubstitutesBench.jsx ===
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

// ── Styled Components ──────────────────────────────────────────────────────────

const Wrapper = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 5%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2rem);
  letter-spacing: 3px;
  color: #fff;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Line = styled.span`
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, var(--blue), transparent);
  border-radius: 1px;
`;

const ScrollRow = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 14px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(59, 163, 239, 0.5);
    border-radius: 3px;
  }
`;

const Card = styled(motion.button)`
  flex: 0 0 170px;
  scroll-snap-align: start;
  background: linear-gradient(180deg, rgba(26, 107, 181, 0.1), rgba(0, 0, 0, 0.3));
  border: 1px solid rgba(59, 163, 239, 0.25);
  border-radius: 12px;
  padding: 20px 14px 18px;
  color: #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--blue);
    transform: scaleX(0.4);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: var(--blue);
    transform: translateY(-4px);

    &::before {
      transform: scaleX(1);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(59, 163, 239, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;

  svg {
    font-size: 32px;
    color: rgba(255, 255, 255, 0.3);
  }
`;

const AvatarPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Number = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0D1B2A;
`;

const Name = styled.div`
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

const Role = styled.div`
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4 },
  }),
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function SubstitutesBench({ players, onPlayerClick, title = 'Banco de Suplentes' }) {
  if (!players || players.length === 0) return null;

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <Line />
      </Header>

      <ScrollRow>
        {players.map((p, i) => (
          <Card
            key={p.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            onClick={() => onPlayerClick?.(p)}
            aria-label={`${p.firstName} ${p.lastName} — ${p.position}`}
          >
            <Avatar>
              {p.photo ? (
                <AvatarPhoto src={p.photo} alt={`${p.firstName} ${p.lastName}`} />
              ) : (
                <FaUser />
              )}
              {p.number != null && <Number>{p.number}</Number>}
            </Avatar>
            <Name>{p.lastName}</Name>
            <Role>{p.positionShort || p.position}</Role>
          </Card>
        ))}
      </ScrollRow>
    </Wrapper>
  );
}
