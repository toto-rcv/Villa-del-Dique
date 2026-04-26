// === FILENAME: src/components/BochasTeam.jsx ===
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaTrophy, FaUserTie, FaStar } from 'react-icons/fa';

// ── Styled Components ──────────────────────────────────────────────────────────

const Wrapper = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5%;
`;

const TeamCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(0, 0, 0, 0.35));
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 16px;
  padding: 40px 32px;
  margin-bottom: 50px;

  @media (max-width: 640px) {
    padding: 30px 20px;
  }
`;

const TeamHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.18);
`;

const TeamName = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  letter-spacing: 3px;
  color: #fff;
  line-height: 1;
  margin-bottom: 6px;
  text-transform: uppercase;

  span {
    display: block;
    font-size: 0.9rem;
    letter-spacing: 2px;
    color: var(--bocha-accent);
    margin-top: 10px;
    font-weight: 600;
  }
`;

const InfoStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(16, 185, 129, 0.15);

  svg {
    color: var(--bocha-accent);
    font-size: 1.1rem;
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;

  small {
    font-size: 0.65rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
  }
  strong {
    font-size: 0.9rem;
    color: #fff;
    font-weight: 600;
  }
`;

const TitulosRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
`;

const TitleChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #d1fae5;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;

  svg {
    color: var(--bocha-accent);
    font-size: 0.8rem;
  }
`;

const SectionTitle = styled.h4`
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 4px;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 14px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(16, 185, 129, 0.4), transparent);
  }
`;

const PlayerGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
`;

const PlayerCard = styled(motion.button)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  padding: 24px 18px;
  color: #fff;
  cursor: pointer;
  text-align: left;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--bocha-accent);
    transform: scaleY(0.4);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: var(--bocha-accent);
    transform: translateY(-4px);

    &::before {
      transform: scaleY(1);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--bocha-accent);
    outline-offset: 2px;
  }
`;

const PlayerTop = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
`;

const Avatar = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.12);
  border: 2px solid rgba(16, 185, 129, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  svg {
    font-size: 22px;
    color: rgba(255, 255, 255, 0.55);
  }
`;

const AvatarPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const NameCol = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;

  strong {
    font-family: var(--font-display);
    font-size: 1.05rem;
    letter-spacing: 1px;
    color: #fff;
    font-weight: 600;
  }
  small {
    font-size: 0.7rem;
    letter-spacing: 1.5px;
    color: var(--bocha-accent);
    text-transform: uppercase;
    margin-top: 4px;
    font-weight: 700;
  }
`;

const MiniStats = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const MiniStat = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;

  strong {
    font-family: var(--font-display);
    font-size: 1rem;
    color: #fff;
    line-height: 1;
  }
  small {
    font-size: 0.55rem;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    margin-top: 3px;
  }
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const wrapperVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function BochasTeam({ team, onPlayerClick }) {
  if (!team) return null;

  return (
    <Wrapper>
      <TeamCard
        variants={wrapperVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <TeamHeader>
          <TeamName>
            {team.name}
            <span>{team.categoria}</span>
          </TeamName>

          <InfoStack>
            <InfoItem>
              <FaUserTie />
              <InfoText>
                <small>Entrenador</small>
                <strong>{team.entrenador}</strong>
              </InfoText>
            </InfoItem>
            <InfoItem>
              <FaStar />
              <InfoText>
                <small>Capitán</small>
                <strong>{team.capitan}</strong>
              </InfoText>
            </InfoItem>
          </InfoStack>
        </TeamHeader>

        {team.titulos && team.titulos.length > 0 && (
          <>
            <SectionTitle>Títulos recientes</SectionTitle>
            <TitulosRow>
              {team.titulos.map((t, i) => (
                <TitleChip key={i}>
                  <FaTrophy />
                  {t}
                </TitleChip>
              ))}
            </TitulosRow>
          </>
        )}

        <SectionTitle>Plantel</SectionTitle>
        <PlayerGrid
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {team.players.map((p) => (
            <PlayerCard
              key={p.id}
              variants={cardVariants}
              onClick={() => onPlayerClick?.(p)}
              aria-label={`${p.firstName} ${p.lastName} — ${p.role}`}
            >
              <PlayerTop>
                <Avatar>
                  {p.photo ? (
                    <AvatarPhoto src={p.photo} alt={`${p.firstName} ${p.lastName}`} />
                  ) : (
                    <FaUser />
                  )}
                </Avatar>
                <NameCol>
                  <strong>{p.firstName} {p.lastName}</strong>
                  <small>{p.role}</small>
                </NameCol>
              </PlayerTop>

              {p.stats && (
                <MiniStats>
                  {Object.entries(p.stats).slice(0, 3).map(([key, val]) => (
                    <MiniStat key={key}>
                      <strong>{val}</strong>
                      <small>{key === 'torneos' ? 'Torneos' : key === 'titulos' ? 'Títulos' : key === 'promedio' ? 'Efec.' : key}</small>
                    </MiniStat>
                  ))}
                </MiniStats>
              )}
            </PlayerCard>
          ))}
        </PlayerGrid>
      </TeamCard>
    </Wrapper>
  );
}
