// === FILENAME: src/App.jsx ===
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import CalendarPage from './pages/CalendarPage';
import TeamsPage from './pages/TeamsPage';
import AboutPage from './pages/AboutPage';

// AnimatePresence requires access to location — extracted here
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/noticias/:id" element={<NewsPage />} />
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
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
