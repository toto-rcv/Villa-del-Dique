// === FILENAME: src/components/Navbar.jsx ===
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

// ── Styled Components ──────────────────────────────────────────────────────────

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  height: 70px;
  transition: background 0.4s ease, box-shadow 0.4s ease;

  ${({ $scrolled }) =>
    $scrolled
      ? css`
          background: rgba(0, 5, 15, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
        `
      : css`
          background: transparent;
        `}
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
`;

const LogoBadge = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(59, 163, 239, 0.4));
  }
`;

const LogoText = styled.span`
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 3px;
  color: #fff;
  line-height: 1.1;

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li``;

const NavLinkStyled = styled(NavLink)`
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--blue);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--blue);
    &::after {
      transform: scaleX(1);
    }
  }

  &.active {
    color: var(--blue);
    text-shadow: 0 0 10px var(--blue-transparent);
    &::after {
      transform: scaleX(1);
    }
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1100;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  background: rgba(0, 5, 20, 0.97);
  backdrop-filter: blur(16px);
  padding: 24px 5% 40px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 999;
  border-bottom: 1px solid rgba(59, 163, 239, 0.2);
`;

const MobileNavItem = styled(motion.div)`
  a {
    font-family: var(--font-display);
    font-size: 1.8rem;
    letter-spacing: 4px;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    display: block;
    padding: 10px 0;
    transition: color 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    &:hover, &.active {
      color: var(--blue);
    }
  }
`;

// ── Animation Variants ─────────────────────────────────────────────────────────

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// ── Links config ───────────────────────────────────────────────────────────────

const links = [
  { to: '/', label: 'Home' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/calendario', label: 'Calendario' },
  { to: '/equipos', label: 'Equipos' },
  { to: '/quienes-somos', label: 'Quiénes Somos' },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Nav
        $scrolled={scrolled}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <Logo to="/">
          <LogoBadge>
            <img src="/LogoClub.png" alt="Club Deportivo Villa del Dique Logo" />
          </LogoBadge>
          <LogoText>VILLA DEL<br />DIQUE</LogoText>
        </Logo>

        <NavLinks>
          {links.map((link) => (
            <NavItem key={link.to}>
              <NavLinkStyled
                to={link.to}
                end={link.to === '/'}
              >
                {link.label}
              </NavLinkStyled>
            </NavItem>
          ))}
        </NavLinks>

        <Hamburger onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle menu">
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </Hamburger>
      </Nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {links.map((link) => (
              <MobileNavItem key={link.to} variants={mobileItemVariants}>
                <NavLink to={link.to} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </NavLink>
              </MobileNavItem>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
