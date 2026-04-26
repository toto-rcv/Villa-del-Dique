// === FILENAME: src/pages/CalendarPage.jsx ===
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaFutbol,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaBullseye,
  FaBookOpen,
} from 'react-icons/fa';

import { getPartidos, getEventos } from '../services/api';

const PageContainer = styled(motion.main)`
  min-height: 100vh;
  background: var(--gradient-2);
  width: 100%;
`;

const PageInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 5% 80px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 5rem);
  color: #fff;
  letter-spacing: 5px;
  margin-bottom: 14px;
  text-shadow: 0 0 40px rgba(59, 163, 239, 0.35);
`;

const Lead = styled(motion.p)`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.65);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FiltersBar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
`;

const FilterChip = styled(motion.button)`
  padding: 10px 20px;
  border-radius: 24px;
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255,255,255,0.65)')};
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, var(--blue), var(--dark-blue))'
      : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : 'rgba(59,163,239,0.25)')};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s ease;

  &:hover { transform: translateY(-2px); color: #fff; }
  svg { font-size: 0.9rem; }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 32px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const CalendarWrapper = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(59, 163, 239, 0.2);
  border-radius: 16px;
  padding: 24px;
`;

const MonthBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2 {
    font-family: var(--font-display);
    font-size: 1.4rem;
    letter-spacing: 3px;
    color: #fff;
    text-transform: uppercase;
  }

  button {
    background: rgba(59, 163, 239, 0.12);
    border: 1px solid rgba(59, 163, 239, 0.3);
    color: var(--blue);
    width: 38px;
    height: 38px;
    border-radius: 10px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: var(--blue);
      color: #fff;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

const DayLabel = styled.div`
  text-align: center;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  padding: 8px 0;
`;

const eventGlow = keyframes`
  0%, 100% {
    box-shadow:
      0 0 8px rgba(59, 163, 239, 0.45),
      inset 0 0 6px rgba(59, 163, 239, 0.12);
  }
  50% {
    box-shadow:
      0 0 18px rgba(59, 163, 239, 0.75),
      inset 0 0 10px rgba(59, 163, 239, 0.22);
  }
`;

const DayCell = styled(motion.button)`
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  border: ${({ $hasEvents, $isToday, $selected, $isOtherMonth }) => {
    if ($selected) return '1px solid var(--blue)';
    if ($isToday) return '1px solid rgba(59,163,239,0.5)';
    if ($hasEvents && !$isOtherMonth) return '2px solid rgba(59, 163, 239, 0.85)';
    return '1px solid rgba(255,255,255,0.05)';
  }};
  background: ${({ $selected, $isToday, $isOtherMonth }) => {
    if ($selected) return 'linear-gradient(135deg, var(--blue), var(--dark-blue))';
    if ($isToday) return 'rgba(59, 163, 239, 0.15)';
    if ($isOtherMonth) return 'transparent';
    return 'rgba(255, 255, 255, 0.02)';
  }};
  color: ${({ $isOtherMonth, $selected }) =>
    $selected ? '#fff' : $isOtherMonth ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.85)'};
  padding: 8px 6px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  transition: border-color 0.15s ease, transform 0.15s ease, background 0.15s ease;
  font-family: var(--font-display);
  font-size: 0.9rem;

  ${({ $hasEvents, $selected, $isOtherMonth }) =>
    $hasEvents && !$selected && !$isOtherMonth && css`
      animation: ${eventGlow} 2.4s ease-in-out infinite;
    `}

  &:hover {
    border-color: var(--blue);
    transform: translateY(-1px);
  }

  .num { font-weight: 700; }
`;

const Dots = styled.div`
  display: flex;
  gap: 3px;
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);

  span { width: 5px; height: 5px; border-radius: 50%; }
`;

const Dot = styled.span`
  background: ${({ $type }) => {
    if ($type === 'partido') return '#fff';
    if ($type === 'bochas') return 'var(--bocha-accent, #10B981)';
    return 'var(--blue)';
  }};
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(59, 163, 239, 0.2);
  border-radius: 16px;
  padding: 24px;
  min-height: 400px;
`;

const PanelTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.15rem;
  letter-spacing: 3px;
  color: var(--blue);
  text-transform: uppercase;
  margin-bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  svg { font-size: 1rem; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 30px 10px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EventCard = styled(motion.article)`
  background: linear-gradient(180deg, rgba(59, 163, 239, 0.08), rgba(0, 0, 0, 0.3));
  border: 1px solid rgba(59, 163, 239, 0.22);
  border-left: 4px solid ${({ $kind }) =>
    $kind === 'partido' ? 'var(--blue)' :
    $kind === 'bochas' ? 'var(--bocha-accent, #10B981)' :
    '#f59e0b'};
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  ${({ $clickable, $kind }) =>
    $clickable &&
    `&:hover {
      transform: translateX(4px);
      border-color: ${
        $kind === 'evento' ? '#f59e0b' :
        $kind === 'bochas' ? 'var(--bocha-accent, #10B981)' :
        'var(--blue)'
      };
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
    }`}
`;

const EventKind = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: ${({ $kind }) =>
    $kind === 'partido' ? 'var(--blue)' :
    $kind === 'bochas' ? 'var(--bocha-accent, #10B981)' :
    '#f59e0b'};
  text-transform: uppercase;
  font-weight: 700;
`;

const EventTitle = styled.h4`
  font-size: 1rem;
  color: #fff;
  line-height: 1.35;
  font-weight: 600;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.6);

  span { display: inline-flex; align-items: center; gap: 5px; }
  svg { color: var(--blue); font-size: 0.72rem; }
`;

const Score = styled.span`
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: #fff;
  letter-spacing: 2px;
  background: rgba(255,255,255,0.08);
  padding: 2px 10px;
  border-radius: 6px;
  margin-left: auto;
`;

const LoadingBanner = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  padding: 30px;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const MESES_LARGOS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_ABREV = ['Lun','Mar','Mie','Jue','Vie','Sab','Dom'];

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function toDayKey(date) {
  const d = new Date(date);
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function buildMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayIdx = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstDayIdx - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, prevMonthDays - i), isOtherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), isOtherMonth: false });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), isOtherMonth: true });
  }
  return cells;
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CalendarPage() {
  const navigate = useNavigate();
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today);
  const [filter, setFilter] = useState('all');
  const [partidos, setPartidos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleItemClick = (item) => {
    if (item._kind === 'evento') {
      const targetId = item.documentId || item.id;
      if (targetId != null) navigate(`/eventos/${targetId}`);
    }
    // Los partidos por ahora no tienen detalle propio
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getPartidos({ limit: 200 }), getEventos({ limit: 200 })])
      .then(([p, e]) => {
        if (cancelled) return;
        setPartidos(p || []);
        setEventos(e || []);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  const itemsByDay = useMemo(() => {
    const map = {};
    for (const p of partidos) {
      if (!p.date) continue;
      const key = toDayKey(p.date);
      const kind = p.categoria === 'Bochas' ? 'bochas' : 'partido';
      (map[key] = map[key] || []).push({ ...p, _kind: kind });
    }
    for (const e of eventos) {
      if (!e.date) continue;
      const key = toDayKey(e.date);
      (map[key] = map[key] || []).push({ ...e, _kind: 'evento' });
    }
    return map;
  }, [partidos, eventos]);

  const filteredItemsByDay = useMemo(() => {
    if (filter === 'all') return itemsByDay;
    const out = {};
    for (const [key, arr] of Object.entries(itemsByDay)) {
      const f = arr.filter((i) => {
        if (filter === 'partidos') return i._kind === 'partido';
        if (filter === 'bochas') return i._kind === 'bochas';
        if (filter === 'eventos') return i._kind === 'evento';
        return true;
      });
      if (f.length) out[key] = f;
    }
    return out;
  }, [itemsByDay, filter]);

  const cells = useMemo(
    () => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  );

  const selectedItems = filteredItemsByDay[toDayKey(selected)] || [];

  const goPrev = () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
  const goNext = () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));

  return (
    <PageContainer variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <PageInner>
      <Header>
        <Title variants={fadeUp} initial="hidden" animate="visible">CALENDARIO</Title>
        <Lead variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.12 }}>
          Todos los partidos y actividades del club en un solo lugar. Toca un dia para ver que pasa.
        </Lead>
      </Header>

      <FiltersBar>
        <FilterChip $active={filter === 'all'} onClick={() => setFilter('all')} whileTap={{ scale: 0.96 }}>
          <FaCalendarAlt /> Todos
        </FilterChip>
        <FilterChip $active={filter === 'partidos'} onClick={() => setFilter('partidos')} whileTap={{ scale: 0.96 }}>
          <FaFutbol /> Partidos
        </FilterChip>
        <FilterChip $active={filter === 'bochas'} onClick={() => setFilter('bochas')} whileTap={{ scale: 0.96 }}>
          <FaBullseye /> Bochas
        </FilterChip>
        <FilterChip $active={filter === 'eventos'} onClick={() => setFilter('eventos')} whileTap={{ scale: 0.96 }}>
          <FaBookOpen /> Eventos
        </FilterChip>
      </FiltersBar>

      {loading ? (
        <LoadingBanner>Cargando calendario...</LoadingBanner>
      ) : (
        <Layout>
          <CalendarWrapper>
            <MonthBar>
              <button onClick={goPrev} aria-label="Mes anterior"><FaChevronLeft /></button>
              <h2>{MESES_LARGOS[cursor.getMonth()]} {cursor.getFullYear()}</h2>
              <button onClick={goNext} aria-label="Mes siguiente"><FaChevronRight /></button>
            </MonthBar>

            <Grid>
              {DIAS_ABREV.map((d) => <DayLabel key={d}>{d}</DayLabel>)}
              {cells.map(({ date, isOtherMonth }, i) => {
                const key = toDayKey(date);
                const items = filteredItemsByDay[key] || [];
                const hasEvents = items.length > 0;
                const isToday = sameDay(date, today);
                const isSelected = sameDay(date, selected);
                const kinds = Array.from(new Set(items.map((x) => x._kind))).slice(0, 3);
                return (
                  <DayCell
                    key={key + '-' + i}
                    $hasEvents={hasEvents}
                    $isToday={isToday}
                    $selected={isSelected}
                    $isOtherMonth={isOtherMonth}
                    onClick={() => setSelected(date)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="num">{date.getDate()}</span>
                    {hasEvents && (
                      <Dots>
                        {kinds.map((k) => <Dot key={k} $type={k} />)}
                      </Dots>
                    )}
                  </DayCell>
                );
              })}
            </Grid>
          </CalendarWrapper>

          <Panel>
            <PanelTitle>
              <FaCalendarAlt />
              {selected.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </PanelTitle>

            {selectedItems.length === 0 ? (
              <EmptyState>
                No hay partidos ni eventos programados para este dia.<br />
                Toca otro dia con indicador en el calendario.
              </EmptyState>
            ) : (
              <EventList>
                <AnimatePresence mode="popLayout">
                  {selectedItems.map((item) => (
                    <EventCard
                      key={item._kind + '-' + item.id}
                      $kind={item._kind}
                      $clickable={item._kind === 'evento'}
                      onClick={() => handleItemClick(item)}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <EventKind $kind={item._kind}>
                        {item._kind === 'partido' && <><FaFutbol /> {item.categoria || 'Partido'}</>}
                        {item._kind === 'bochas' && <><FaBullseye /> Bochas</>}
                        {item._kind === 'evento' && <><FaBookOpen /> {item.category || 'Evento'}</>}
                        {item.estado === 'finalizado' && <Score>{item.golesLocal}-{item.golesVisitante}</Score>}
                      </EventKind>
                      <EventTitle>
                        {item._kind === 'evento' ? item.title : (
                          <>vs {item.rival} <span style={{ opacity: 0.55, fontSize: '0.75rem', fontWeight: 500 }}>
                            {item.local ? '(Local)' : '(Visitante)'}
                          </span></>
                        )}
                      </EventTitle>
                      <EventMeta>
                        <span><FaClock /> {formatTime(item.date)} hs</span>
                        {(item.estadio || item.location) && (
                          <span><FaMapMarkerAlt /> {item.estadio || item.location}</span>
                        )}
                        {item.torneo && <span>{item.torneo}</span>}
                      </EventMeta>
                    </EventCard>
                  ))}
                </AnimatePresence>
              </EventList>
            )}
          </Panel>
        </Layout>
      )}
      </PageInner>
    </PageContainer>
  );
}
