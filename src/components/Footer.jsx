// === FILENAME: src/components/Footer.jsx ===
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';

// ── Styled Components ──────────────────────────────────────────────────────────

const FooterWrapper = styled.footer`
  background: linear-gradient(180deg, #000000, #040D1A);
  padding: 80px 5% 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59, 163, 239, 0.3), transparent);
  }
`;

const LogoArea = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const LogoBadge = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 20px rgba(59, 163, 239, 0.5));
  }
`;

const ClubName = styled.h2`
  font-family: var(--font-display);
  font-size: 2.5rem;
  letter-spacing: 4px;
  color: #fff;
  text-align: center;
`;

const HR = styled(motion.div)`
  width: 50%;
  max-width: 400px;
  height: 1px;
  background: var(--blue);
  opacity: 0.5;
  margin: 0 auto 40px;
`;

const NavLinks = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  list-style: none;
  margin-bottom: 40px;
`;

const NavLinkStyled = styled(Link)`
  font-family: var(--font-display);
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: var(--blue);
    text-shadow: 0 0 10px var(--blue-transparent);
  }
`;

const SocialRow = styled(motion.div)`
  display: flex;
  gap: 24px;
  margin-bottom: 50px;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 28px;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--blue);
  }
`;

const CopyrightLine = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin-top: 20px;
  letter-spacing: 1px;
`;

const DeveloperCredit = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-top: 10px;

  a {
    color: var(--blue);
    text-decoration: none;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--blue);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <FooterWrapper>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <LogoArea variants={fadeUp}>
          <LogoBadge>
            <img src="/LogoClub.png" alt="Club Deportivo Villa del Dique Logo" />
          </LogoBadge>
          <ClubName>CLUB DEPORTIVO VILLA DEL DIQUE</ClubName>
        </LogoArea>

        <HR variants={fadeUp} />

        <NavLinks variants={fadeUp}>
          <li><NavLinkStyled to="/">Home</NavLinkStyled></li>
          <li><NavLinkStyled to="/noticias/1">Noticias</NavLinkStyled></li>
          <li><NavLinkStyled to="/calendario">Calendario</NavLinkStyled></li>
          <li><NavLinkStyled to="/equipos">Equipos</NavLinkStyled></li>
          <li><NavLinkStyled to="/quienes-somos">Quiénes Somos</NavLinkStyled></li>
        </NavLinks>

        <SocialRow variants={fadeUp}>
          <motion.div whileHover={{ scale: 1.2, filter: 'drop-shadow(0 0 8px rgba(59,163,239,0.6))' }}>
            <SocialIcon href="#" aria-label="Facebook"><FaFacebook /></SocialIcon>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, filter: 'drop-shadow(0 0 8px rgba(59,163,239,0.6))' }}>
            <SocialIcon href="#" aria-label="Instagram"><FaInstagram /></SocialIcon>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, filter: 'drop-shadow(0 0 8px rgba(59,163,239,0.6))' }}>
            <SocialIcon href="#" aria-label="Twitter/X"><FaXTwitter /></SocialIcon>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, filter: 'drop-shadow(0 0 8px rgba(59,163,239,0.6))' }}>
            <SocialIcon href="#" aria-label="YouTube"><FaYoutube /></SocialIcon>
          </motion.div>
        </SocialRow>

        <HR variants={fadeUp} style={{ width: '100%', maxWidth: '1200px', opacity: 0.1, margin: '0 0 30px' }} />

        <motion.div variants={fadeUp} style={{ width: '100%' }}>
          <CopyrightLine>
            © {new Date().getFullYear()} Club Deportivo Villa del Dique — Todos los derechos reservados
          </CopyrightLine>
          <DeveloperCredit>
            Desarrollado con ❤️ por <a href="https://surcodes.com" target="_blank" rel="noreferrer">surcodes.com</a>
          </DeveloperCredit>
        </motion.div>
      </motion.div>
    </FooterWrapper>
  );
}
