// === FILENAME: src/components/FixtureCard.jsx ===
import styled from 'styled-components';
import { motion } from 'framer-motion';

// ── Styled Components ──────────────────────────────────────────────────────────

const CardContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.4));
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  cursor: default;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(800px circle at top center, rgba(59, 163, 239, 0.04), transparent 40%);
    pointer-events: none;
  }

  &.fem-accent::before {
    background: radial-gradient(800px circle at top center, rgba(192, 132, 252, 0.04), transparent 40%);
  }

  &.bocha-accent::before {
    background: radial-gradient(800px circle at top center, rgba(16, 185, 129, 0.04), transparent 40%);
  }
`;

const BadgeHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const Competition = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
`;

const MatchContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Shield = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: #fff;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.3);
  }
`;

const TeamName = styled.span`
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-align: center;
  color: #fff;
`;

const ScoreLabel = styled.div`
  font-family: var(--font-display);
  font-size: 3rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
`;

const NumberScore = styled(motion.span)`
  display: inline-block;
`;

const Hyphen = styled.span`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.3);
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const MatchDate = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
`;

const ResultIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => 
    props.$status === 'win' ? '#2ecc71' : 
    props.$status === 'loss' ? '#e74c3c' : '#f1c40f'};
  box-shadow: 0 0 10px ${(props) => 
    props.$status === 'win' ? 'rgba(46,204,113,0.5)' : 
    props.$status === 'loss' ? 'rgba(231,76,60,0.5)' : 'rgba(241,196,15,0.5)'};
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function FixtureCard({ data, isFem, isBocha }) {
  const accentColor = isFem ? 'var(--fem-accent)' : isBocha ? 'var(--bocha-accent)' : 'var(--blue)';

  return (
    <CardContainer
      className={isFem ? 'fem-accent' : isBocha ? 'bocha-accent' : ''}
      variants={cardVariants}
      whileHover={{ 
        scale: 1.03, 
        borderColor: accentColor,
        boxShadow: `0 10px 30px ${isFem ? 'rgba(192,132,252,0.15)' : isBocha ? 'rgba(16,185,129,0.15)' : 'rgba(59,163,239,0.15)'}`
      }}
    >
      <BadgeHeader>
        <Competition>{data.competition}</Competition>
      </BadgeHeader>
      
      <MatchContainer>
        <Team>
          <Shield 
            style={{ background: data.homeColor }}
            whileHover={{ rotateY: 15, scale: 1.1 }}
          >
            {data.homeInitials}
          </Shield>
          <TeamName>{data.homeTeam}</TeamName>
        </Team>

        <ScoreLabel>
          <NumberScore
            whileHover={{ scale: 1.2, color: accentColor }}
          >
            {data.homeGoals}
          </NumberScore>
          <Hyphen>-</Hyphen>
          <NumberScore
            whileHover={{ scale: 1.2, color: accentColor }}
          >
            {data.awayGoals}
          </NumberScore>
        </ScoreLabel>

        <Team>
          <Shield 
            style={{ background: data.awayColor }}
            whileHover={{ rotateY: -15, scale: 1.1 }}
          >
            {data.awayInitials}
          </Shield>
          <TeamName>{data.awayTeam}</TeamName>
        </Team>
      </MatchContainer>

      <FooterInfo>
        <MatchDate>{data.date}</MatchDate>
        <ResultIndicator $status={data.result} title={`Resultado: ${data.result}`} />
      </FooterInfo>
    </CardContainer>
  );
}
