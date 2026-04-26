// === FILENAME: src/components/PlayerDrawer.jsx ===
import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaRulerVertical, FaBirthdayCake, FaFlag, FaCalendarAlt } from 'react-icons/fa';

// ── Styled Components ──────────────────────────────────────────────────────────

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1500;
`;

const Drawer = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(460px, 100vw);
  background: linear-gradient(180deg, #0D1B2A 0%, #061121 100%);
  z-index: 1600;
  box-shadow: -12px 0 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-left: 1px solid rgba(59, 163, 239, 0.25);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;

  &:hover {
    background: var(--blue);
    transform: rotate(90deg);
  }
`;

const PhotoWrapper = styled.div`
  position: relative;
  height: 320px;
  background:
    radial-gradient(circle at 50% 120%, ${({ $accent }) => $accent || 'var(--blue)'} 0%, transparent 60%),
    linear-gradient(135deg, var(--dark-blue), #000);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.02) 0 2px,
      transparent 2px 18px
    );
  }
`;

const PlayerAvatar = styled.div`
  width: 220px;
  height: 260px;
  border-radius: 8px 8px 0 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  overflow: hidden;

  svg {
    font-size: 120px;
    color: rgba(255, 255, 255, 0.15);
  }
`;

const PlayerPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const JerseyNumber = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
  font-family: var(--font-display);
  font-size: 6rem;
  font-weight: 800;
  color: ${({ $accent }) => $accent || 'var(--blue)'};
  line-height: 1;
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
  letter-spacing: -4px;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 30px 32px 40px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(59, 163, 239, 0.4);
    border-radius: 3px;
  }
`;

const Position = styled.div`
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: ${({ $accent }) => $accent || 'var(--blue)'};
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 6px;
`;

const Name = styled.h2`
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: #fff;
  line-height: 1;
  margin-bottom: 4px;
  letter-spacing: 1px;

  small {
    display: block;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 2px;
    font-weight: 400;
    margin-bottom: 4px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 28px 0 24px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  svg {
    color: ${({ $accent }) => $accent || 'var(--blue)'};
    font-size: 1rem;
    flex-shrink: 0;
  }
`;

const InfoLabel = styled.div`
  font-size: 0.65rem;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
`;

const InfoValue = styled.div`
  font-size: 0.85rem;
  color: #fff;
  font-weight: 600;
`;

const SectionTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  margin: 16px 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Bio = styled.p`
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 12px;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

const StatBox = styled.div`
  background: rgba(59, 163, 239, 0.08);
  border: 1px solid rgba(59, 163, 239, 0.2);
  border-radius: 8px;
  padding: 14px 8px;
  text-align: center;
`;

const StatValue = styled.div`
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 800;
  color: ${({ $accent }) => $accent || 'var(--blue)'};
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.65rem;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
  margin-top: 6px;
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { x: '100%', transition: { duration: 0.3, ease: [0.55, 0.05, 0.67, 0.19] } },
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatStatLabel(key) {
  const map = {
    partidos: 'Partidos',
    goles: 'Goles',
    asistencias: 'Asist.',
    vallasInvictas: 'V. Inv.',
    atajadas: 'Atajadas',
    despejes: 'Despejes',
    torneos: 'Torneos',
    titulos: 'Títulos',
    promedio: 'Efec.',
  };
  return map[key] || key;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function PlayerDrawer({ player, open, onClose, accentColor }) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && player && (
        <>
          <Backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <Drawer
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-label="Información del jugador"
          >
            <CloseButton onClick={onClose} aria-label="Cerrar panel">
              <FaTimes />
            </CloseButton>

            <PhotoWrapper $accent={accentColor}>
              {player.number != null && (
                <JerseyNumber $accent={accentColor}>{player.number}</JerseyNumber>
              )}
              <PlayerAvatar>
                {player.photo ? (
                  <PlayerPhoto src={player.photo} alt={`${player.firstName} ${player.lastName}`} />
                ) : (
                  <FaUser />
                )}
              </PlayerAvatar>
            </PhotoWrapper>

            <Body>
              <Position $accent={accentColor}>
                {player.position || player.role}
              </Position>
              <Name>
                {player.firstName}
                <small>{player.lastName.toUpperCase()}</small>
              </Name>

              <InfoGrid>
                {player.age != null && (
                  <InfoRow $accent={accentColor}>
                    <FaBirthdayCake />
                    <div>
                      <InfoLabel>Edad</InfoLabel>
                      <InfoValue>{player.age} años</InfoValue>
                    </div>
                  </InfoRow>
                )}
                {player.height && (
                  <InfoRow $accent={accentColor}>
                    <FaRulerVertical />
                    <div>
                      <InfoLabel>Altura</InfoLabel>
                      <InfoValue>{player.height}</InfoValue>
                    </div>
                  </InfoRow>
                )}
                {player.nationality && (
                  <InfoRow $accent={accentColor}>
                    <FaFlag />
                    <div>
                      <InfoLabel>Nacionalidad</InfoLabel>
                      <InfoValue>{player.nationality}</InfoValue>
                    </div>
                  </InfoRow>
                )}
                {player.since && (
                  <InfoRow $accent={accentColor}>
                    <FaCalendarAlt />
                    <div>
                      <InfoLabel>En el club</InfoLabel>
                      <InfoValue>Desde {player.since}</InfoValue>
                    </div>
                  </InfoRow>
                )}
              </InfoGrid>

              {player.bio && (
                <>
                  <SectionTitle>Biografía</SectionTitle>
                  <Bio>{player.bio}</Bio>
                </>
              )}

              {player.stats && Object.keys(player.stats).length > 0 && (
                <>
                  <SectionTitle>Estadísticas</SectionTitle>
                  <StatsRow>
                    {Object.entries(player.stats).map(([key, value]) => (
                      <StatBox key={key}>
                        <StatValue $accent={accentColor}>{value}</StatValue>
                        <StatLabel>{formatStatLabel(key)}</StatLabel>
                      </StatBox>
                    ))}
                  </StatsRow>
                </>
              )}
            </Body>
          </Drawer>
        </>
      )}
    </AnimatePresence>
  );
}
