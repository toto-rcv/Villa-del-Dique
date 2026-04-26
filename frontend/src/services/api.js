// === FILENAME: src/services/api.js ===
// Cliente HTTP para Strapi v5.
// Expone funciones que ya devuelven los datos "planos" (normalizados)
// listos para usar en la UI. Si Strapi no está disponible o las credenciales
// fallan, cada función devuelve un array/objeto vacío para que la UI no se rompa.

const API_URL =
  process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

const API_TOKEN = process.env.REACT_APP_STRAPI_TOKEN || null;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`;
  return headers;
}

async function fetchJSON(path, { fallback = null } = {}) {
  try {
    const res = await fetch(`${API_URL}/api${path}`, { headers: buildHeaders() });
    if (!res.ok) {
      console.warn(`[api] ${path} -> ${res.status}`);
      return fallback;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[api] ${path} fallo:`, err.message);
    return fallback;
  }
}

/**
 * Strapi v5 ya devuelve los atributos en el nivel raíz del objeto (sin "attributes"),
 * pero mantenemos compatibilidad con v4 por las dudas.
 */
function flatten(item) {
  if (!item) return null;
  if (item.attributes) return { id: item.id, documentId: item.documentId, ...item.attributes };
  return item;
}

function getMediaUrl(media) {
  if (!media) return null;
  // Strapi v5: { url: '...' } o { data: { attributes: { url: '...' } } }
  const data = media.data || media;
  const attrs = data?.attributes || data;
  const url = attrs?.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

// ─── Helpers de presentación ─────────────────────────────────────────────────

const MONTHS_AR_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

/** Convierte una fecha ISO ("2025-03-15T20:00:00.000Z") a "15 Mar 2025". */
export function formatDateAR(value) {
  if (!value) return '';
  // Si ya viene en formato corto ("15 Mar 2025"), devolverlo tal cual
  if (typeof value === 'string' && /^\d{1,2}\s\w{3}\s\d{4}$/.test(value)) return value;
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS_AR_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

/** Iniciales a partir del nombre del rival/equipo: "Dep. Mina Clavero" -> "DMC" */
export function teamInitials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3) || '?';
}

/**
 * Adapta un partido de Strapi al shape que espera FixtureCard.
 * Determina win/draw/loss desde la perspectiva del club.
 */
export function partidoToFixture(p) {
  if (!p) return null;
  const club = 'Villa del Dique';
  const homeIsClub = p.local;
  const homeColor = homeIsClub ? '#3BA3EF' : '#e74c3c';
  const awayColor = homeIsClub ? '#e74c3c' : '#3BA3EF';
  const myGoals = homeIsClub ? p.golesLocal : p.golesVisitante;
  const otherGoals = homeIsClub ? p.golesVisitante : p.golesLocal;
  let result = 'draw';
  if (myGoals > otherGoals) result = 'win';
  else if (myGoals < otherGoals) result = 'loss';

  return {
    id: p.id,
    competition: p.torneo || 'Liga Regional',
    homeTeam: p.homeTeam,
    homeInitials: homeIsClub ? 'VDQ' : teamInitials(p.homeTeam),
    homeColor,
    homeGoals: p.homeGoals ?? '-',
    awayTeam: p.awayTeam,
    awayInitials: homeIsClub ? teamInitials(p.awayTeam) : 'VDQ',
    awayColor,
    awayGoals: p.awayGoals ?? '-',
    date: formatDateAR(p.date),
    result,
  };
}

// ─── Mapeos ──────────────────────────────────────────────────────────────────

function mapNoticia(raw) {
  const n = flatten(raw);
  if (!n) return null;
  return {
    id: n.id,
    documentId: n.documentId,
    slug: n.slug,
    title: n.titulo,
    category: n.categoria,
    date: n.fecha,
    excerpt: n.bajada,
    body: n.contenido,
    variant: n.variante,
    featured: !!n.destacada,
    author: n.autor,
    cover: getMediaUrl(n.portada),
  };
}

function mapPartido(raw) {
  const p = flatten(raw);
  if (!p) return null;
  const isLocal = !!p.local;
  const club = 'Villa del Dique';
  return {
    id: p.id,
    documentId: p.documentId,
    rival: p.rival,
    date: p.fecha,
    local: isLocal,
    estadio: p.estadio,
    torneo: p.torneo,
    categoria: p.categoria,
    estado: p.estado,
    golesLocal: p.goles_local,
    golesVisitante: p.goles_visitante,
    homeTeam: isLocal ? club : p.rival,
    awayTeam: isLocal ? p.rival : club,
    homeGoals: isLocal ? p.goles_local : p.goles_visitante,
    awayGoals: isLocal ? p.goles_visitante : p.goles_local,
    observaciones: p.observaciones,
    destacado: !!p.destacado,
  };
}

function mapEvento(raw) {
  const e = flatten(raw);
  if (!e) return null;
  return {
    id: e.id,
    documentId: e.documentId,
    title: e.titulo,
    description: e.descripcion,
    date: e.fecha,
    dateEnd: e.fecha_fin,
    location: e.ubicacion,
    category: e.categoria,
    featured: !!e.destacado,
    link: e.link_inscripcion,
    cover: getMediaUrl(e.cartel),
  };
}

function mapJugador(raw) {
  const j = flatten(raw);
  if (!j) return null;
  return {
    id: j.id,
    documentId: j.documentId,
    firstName: j.nombre,
    lastName: j.apellido,
    number: j.numero,
    position: j.posicion,
    age: j.edad,
    nationality: j.nacionalidad,
    height: j.altura,
    since: j.desde,
    bio: j.bio,
    photo: getMediaUrl(j.foto),
    tipo: j.tipo,
    categoria: j.categoria,
    estado: j.estado,
    x: j.formacion_x,
    y: j.formacion_y,
    orden: j.orden,
    capitan: !!j.capitan,
    stats: j.stats || {},
    activo: j.activo !== false,
  };
}

function mapSponsor(raw) {
  const s = flatten(raw);
  if (!s) return null;
  return {
    id: s.id,
    documentId: s.documentId,
    name: s.nombre,
    url: s.web,
    tier: s.categoria,
    order: s.orden,
    activo: s.activo !== false,
    description: s.descripcion,
    logo: getMediaUrl(s.logo),
  };
}

function mapDirectivo(raw) {
  const d = flatten(raw);
  if (!d) return null;
  return {
    id: d.id,
    documentId: d.documentId,
    firstName: d.nombre,
    lastName: d.apellido,
    role: d.cargo,
    photo: getMediaUrl(d.foto),
    order: d.orden,
    activo: d.activo !== false,
    bio: d.bio,
    email: d.email,
  };
}

// ─── API pública ─────────────────────────────────────────────────────────────

// Convención:
//   - Devuelve un array si Strapi respondió OK (puede estar vacío)
//   - Devuelve null SOLO si la request falló (Strapi caído / 4xx / 5xx).
//   Esto permite a los componentes distinguir "Strapi sin datos" de
//   "Strapi no disponible" y elegir si mostrar fallback estático.

export async function getNews({ variant, categoria, categoriaNot, featured, limit = 100 } = {}) {
  const params = new URLSearchParams();
  params.set('sort[0]', 'fecha:desc');
  params.set('pagination[pageSize]', String(limit));
  params.set('populate', 'portada');
  if (variant) params.set('filters[variante][$eq]', variant);
  if (categoria) params.set('filters[categoria][$eq]', categoria);
  if (categoriaNot) params.set('filters[categoria][$ne]', categoriaNot);
  if (featured !== undefined) params.set('filters[destacada][$eq]', String(featured));
  const json = await fetchJSON(`/noticias?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapNoticia).filter(Boolean);
}

export async function getNewsBySlug(slug) {
  const params = new URLSearchParams();
  params.set('filters[slug][$eq]', slug);
  params.set('populate', 'portada');
  const json = await fetchJSON(`/noticias?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapNoticia)[0] || null;
}

export async function getNewsById(idOrDocId) {
  if (idOrDocId == null) return null;
  // En Strapi v5, /noticias/:id usa documentId (no id numérico).
  // Hacemos un find filtrando por id O documentId para soportar ambos.
  const params = new URLSearchParams();
  params.set('filters[$or][0][id][$eq]', String(idOrDocId));
  params.set('filters[$or][1][documentId][$eq]', String(idOrDocId));
  params.set('populate', 'portada');
  const json = await fetchJSON(`/noticias?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapNoticia)[0] || null;
}

export async function getEventoById(idOrDocId) {
  if (idOrDocId == null) return null;
  const params = new URLSearchParams();
  params.set('filters[$or][0][id][$eq]', String(idOrDocId));
  params.set('filters[$or][1][documentId][$eq]', String(idOrDocId));
  params.set('populate', 'cartel');
  const json = await fetchJSON(`/eventos?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapEvento)[0] || null;
}

export async function getPartidos({ categoria, estado, from, to, limit = 100 } = {}) {
  const params = new URLSearchParams();
  params.set('sort[0]', 'fecha:asc');
  params.set('pagination[pageSize]', String(limit));
  if (categoria) params.set('filters[categoria][$eq]', categoria);
  if (estado) params.set('filters[estado][$eq]', estado);
  if (from) params.set('filters[fecha][$gte]', from);
  if (to) params.set('filters[fecha][$lte]', to);
  const json = await fetchJSON(`/partidos?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapPartido).filter(Boolean);
}

export async function getEventos({ categoria, from, to, limit = 100 } = {}) {
  const params = new URLSearchParams();
  params.set('sort[0]', 'fecha:asc');
  params.set('pagination[pageSize]', String(limit));
  params.set('populate', 'cartel');
  if (categoria) params.set('filters[categoria][$eq]', categoria);
  if (from) params.set('filters[fecha][$gte]', from);
  if (to) params.set('filters[fecha][$lte]', to);
  const json = await fetchJSON(`/eventos?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapEvento).filter(Boolean);
}

export async function getJugadores({ tipo, categoria, estado, limit = 200 } = {}) {
  const params = new URLSearchParams();
  params.set('sort[0]', 'orden:asc');
  params.set('pagination[pageSize]', String(limit));
  params.set('populate', 'foto');
  if (tipo) params.set('filters[tipo][$eq]', tipo);
  if (categoria) params.set('filters[categoria][$eq]', categoria);
  if (estado) params.set('filters[estado][$eq]', estado);
  const json = await fetchJSON(`/jugadores?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapJugador).filter(Boolean);
}

export async function getSponsors({ categoria, limit = 100 } = {}) {
  const params = new URLSearchParams();
  params.set('sort[0]', 'orden:asc');
  params.set('pagination[pageSize]', String(limit));
  params.set('populate', 'logo');
  params.set('filters[activo][$eq]', 'true');
  if (categoria) params.set('filters[categoria][$eq]', categoria);
  const json = await fetchJSON(`/sponsors?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapSponsor).filter(Boolean);
}

export async function getDirectivos({ limit = 50 } = {}) {
  const params = new URLSearchParams();
  params.set('sort[0]', 'orden:asc');
  params.set('pagination[pageSize]', String(limit));
  params.set('populate', 'foto');
  params.set('filters[activo][$eq]', 'true');
  const json = await fetchJSON(`/directivos?${params}`, { fallback: null });
  if (json === null) return null;
  return (json.data || []).map(mapDirectivo).filter(Boolean);
}

export const api = {
  getNews,
  getNewsBySlug,
  getNewsById,
  getPartidos,
  getEventos,
  getEventoById,
  getJugadores,
  getSponsors,
  getDirectivos,
};

export default api;
