// === FILENAME: src/App.jsx ===
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import NoticiasPage from './pages/NoticiasPage';
import EventoPage from './pages/EventoPage';
import CalendarPage from './pages/CalendarPage';
import TeamsPage from './pages/TeamsPage';
import AboutPage from './pages/AboutPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// AnimatePresence requires access to location - extracted here
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<NoticiasPage />} />
        <Route path="/noticias/:id" element={<NewsPage />} />
        <Route path="/eventos/:id" element={<EventoPage />} />
        <Route path="/calendario" element={<CalendarPage />} />
        <Route path="/equipos" element={<TeamsPage />} />
        <Route path="/quienes-somos" element={<AboutPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
