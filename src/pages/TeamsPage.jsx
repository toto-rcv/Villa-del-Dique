// === FILENAME: src/pages/TeamsPage.jsx ===
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFutbol, FaBullseye } from 'react-icons/fa';

import FootballField from '../components/FootballField';
import SubstitutesBench from '../components/SubstitutesBench';
import BochasTeam from '../components/BochasTeam';
import PlayerDrawer from '../components/PlayerDrawer';

import { bochasTeam as staticBochasTeam, formation } from '../data/teamData';
import { getJugadores } from '../services/api';

// Adapta un jugador de Strapi al shape que espera FootballField/SubstitutesBench/BochasTeam
function adaptFutbolJugador(j) {
  return {
    id: j.id,
    number: j.number,
    firstName: j.firstName,
    lastName: j.lastName,
    position: j.position,
    positionShort: (j.position || '').split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 3),
    age: j.age,
    nationality: j.nationality,
    height: j.height,
    since: j.since,
    x: j.x,
    y: j.y,
    stats: j.stats || {},
    bio: j.bio,
    photo: j.photo,
    capitan: j.capitan,
  };
}

function adaptBochasJugador(j) {
  return {
    id: j.id,
    firstName: j.firstName,
    lastName: j.lastName,
    role: j.position, // En bochas usamos "position" como rol
    age: j.age,
    since: j.since,
    bio: j.bio,
    stats: j.stats || {},
    photo: j.photo,
  };
}

// Styled Components

const PageContainer = styled(motion.main)`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: var(--gradient-2);
  overflow-x: hidden;
`;

const Header = styled.div`
  text-align: center;
  padding: 0 5%;
  margin-bottom: 50px;
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
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TabsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin: 40px 0 50px;
  padding: 0 5%;
  flex-wrap: wrap;
`;

const Tab = styled(motion.button)`
  padding: 14px 28px;
  border-radius: 30px;
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255,255,255,0.65)')};
  background: ${({ $active, $accent }) =>
    $active
      ? $accent === 'bochas'
        ? 'linear-gradient(135deg, #10B981, #059669)'
        : 'linear-gradient(135deg, var(--blue), var(--dark-blue))'
      : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid
    ${({ $active, $accent }) =>
      $active
        ? 'transparent'
        : $accent === 'bochas'
        ? 'rgba(16, 185, 129, 0.3)'
        : 'rgba(59, 163, 239, 0.3)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    color: #fff;
  }

  svg {
    font-size: 1rem;
  }
`;

const FieldSection = styled.section`
  padding: 0 5%;
  position: relative;
`;

const Instruction = styled.p`
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 28px;
`;

// Animation Variants

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const tabContent = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

// Component

export default function TeamsPage() {
  const [activeTab, setActiveTab] = useState('futbol');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [starters, setStarters] = useState([]);
  const [substitutes, setSubstitutes] = useState([]);
  const [bochasPlayers, setBochasPlayers] = useState([]);

  useEffect(() => {
    let cancelled = false;

    // Fútbol — titulares
    getJugadores({ tipo: 'futbol', estado: 'titular', limit: 30 })
      .then((data) => {
        if (cancelled) return;
        if (data === null) return; // Strapi caído -> dejar estáticos
        setStarters(data.map(adaptFutbolJugador));
      })
      .catch(() => {});

    // Fútbol — suplentes
    getJugadores({ tipo: 'futbol', estado: 'suplente', limit: 30 })
      .then((data) => {
        if (cancelled) return;
        if (data === null) return;
        setSubstitutes(data.map(adaptFutbolJugador));
      })
      .catch(() => {});

    // Bochas (todos los jugadores activos)
    getJugadores({ tipo: 'bochas', limit: 30 })
      .then((data) => {
        if (cancelled) return;
        if (data === null) return;
        setBochasPlayers(data.map(adaptBochasJugador));
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  const bochasTeamData = useMemo(
    () => ({ ...staticBochasTeam, players: bochasPlayers }),
    [bochasPlayers]
  );

  const handlePlayerClick = (player) => setSelectedPlayer(player);
  const handleClose = () => setSelectedPlayer(null);

  const isBochasPlayer =
    selectedPlayer && bochasPlayers.some((p) => p.id === selectedPlayer.id);
  const drawerAccent = isBochasPlayer ? 'var(--bocha-accent)' : 'var(--blue)';

  return (
    <>
      <PageContainer
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Header>
          <Title variants={headerVariants} initial="hidden" animate="visible">
            NUESTROS <span>EQUIPOS</span>
          </Title>
          <Lead
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
          >
            Conoce al plantel que representa los colores del club. Hace click en cualquier
            jugador para ver su informacion completa.
          </Lead>
        </Header>

        <TabsBar>
          <Tab
            $active={activeTab === 'futbol'}
            onClick={() => setActiveTab('futbol')}
            whileTap={{ scale: 0.96 }}
          >
            <FaFutbol /> Primera de Futbol
          </Tab>
          <Tab
            $active={activeTab === 'bochas'}
            $accent="bochas"
            onClick={() => setActiveTab('bochas')}
            whileTap={{ scale: 0.96 }}
          >
            <FaBullseye /> Equipo de Bochas
          </Tab>
        </TabsBar>

        <AnimatePresence mode="wait">
          {activeTab === 'futbol' ? (
            <motion.div
              key="futbol"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FieldSection>
                <Instruction>Toca a un jugador para ver su ficha</Instruction>
                <FootballField
                  players={starters}
                  formation={formation}
                  onPlayerClick={handlePlayerClick}
                />
              </FieldSection>

              <SubstitutesBench
                players={substitutes}
                onPlayerClick={handlePlayerClick}
                title="Banco de Suplentes"
              />
            </motion.div>
          ) : (
            <motion.div
              key="bochas"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <BochasTeam team={bochasTeamData} onPlayerClick={handlePlayerClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </PageContainer>

      <PlayerDrawer
        player={selectedPlayer}
        open={!!selectedPlayer}
        onClose={handleClose}
        accentColor={drawerAccent}
      />
    </>
  );
}
