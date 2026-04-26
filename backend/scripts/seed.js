/**
 * Seed script — Club Deportivo Villa del Dique
 *
 * Poblado inicial de Strapi con datos de ejemplo.
 *
 * USO:
 *   1. Iniciar Strapi:  npm run develop  (y crear admin)
 *   2. En el admin, crear un API Token "Full access" y copiarlo
 *   3. Guardarlo en backend/.env como:
 *        SEED_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *        STRAPI_URL=http://localhost:1337
 *   4. Ejecutar:  npm run seed
 */

require('dotenv').config();

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const TOKEN = process.env.SEED_TOKEN;

if (!TOKEN) {
  console.error('\n[seed] ERROR: falta SEED_TOKEN en .env');
  console.error('       Creá un API Token "Full access" en el admin de Strapi y guardalo en .env como SEED_TOKEN.');
  process.exit(1);
}

// ──────────────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────────────

const MESES = {
  ene: '01', enero: '01',
  feb: '02', febrero: '02',
  mar: '03', marzo: '03',
  abr: '04', abril: '04',
  may: '05', mayo: '05',
  jun: '06', junio: '06',
  jul: '07', julio: '07',
  ago: '08', agosto: '08',
  sep: '09', septiembre: '09',
  oct: '10', octubre: '10',
  nov: '11', noviembre: '11',
  dic: '12', diciembre: '12',
};

// "15 Mar 2025" → "2025-03-15"
function parseSpanishDate(str, hour = '19:00') {
  if (!str) return null;
  const parts = str.trim().toLowerCase().split(/\s+/);
  if (parts.length < 3) return null;
  const day = parts[0].padStart(2, '0');
  const monthKey = parts[1].replace('.', '').slice(0, 3);
  const month = MESES[monthKey] || '01';
  const year = parts[2];
  return { dateOnly: `${year}-${month}-${day}`, dateTime: `${year}-${month}-${day}T${hour}:00.000Z` };
}

const noticias = [
  {
    titulo: 'Gran victoria ante Deportivo Mina Clavero',
    slug: 'gran-victoria-ante-deportivo-mina-clavero',
    categoria: 'Primera',
    fecha: '15 Mar 2025',
    bajada: 'El equipo se impuso por 3 a 1 en un partido muy emocionante jugado en casa ante la mirada de más de 500 hinchas que alentaron sin parar.',
    contenido: 'En un encuentro que mantuvo en vilo a toda la hinchada, el Club Deportivo Villa del Dique logró una contundente victoria ante Deportivo Mina Clavero por 3 a 1. Los goles llegaron en los minutos 18, 45 y 67, sellando una actuación dominante del equipo local. El director técnico destacó el trabajo en equipo y la presión alta como claves del triunfo. "Fue un partido muy intenso, pero los chicos supieron mantener la compostura en los momentos decisivos", afirmó tras el partido. Este resultado coloca al equipo en una posición privilegiada en la tabla de la Liga Regional.',
    variante: 'masculino',
    destacada: true,
    autor: 'Prensa CVDD',
  },
  {
    titulo: 'Incorporación de nuevos juveniles a la primera',
    slug: 'incorporacion-juveniles-primera',
    categoria: 'Institucional',
    fecha: '10 Mar 2025',
    bajada: 'La dirigencia confirmó el ascenso de tres jugadores de las divisiones inferiores al plantel principal para la segunda mitad de la temporada.',
    contenido: 'El Club Deportivo Villa del Dique anunció con orgullo la incorporación de tres jóvenes valores al plantel de la primera división. Se trata de jugadores que llevan años formándose en las divisiones inferiores del club y que han demostrado un nivel excepcional en los entrenamientos y torneos juveniles.',
    variante: 'general',
    destacada: false,
    autor: 'Prensa CVDD',
  },
  {
    titulo: 'Jornada solidaria en el estadio del club',
    slug: 'jornada-solidaria-estadio',
    categoria: 'Comunidad',
    fecha: '05 Mar 2025',
    bajada: 'El club organizó una jornada comunitaria con talleres para niños de la región, recaudando fondos y fortaleciendo los lazos con la comunidad.',
    contenido: 'El estadio del Club Deportivo Villa del Dique se convirtió en un centro de encuentro comunitario durante la jornada solidaria organizada por la institución. Más de 300 niños participaron en talleres de fútbol, arte y educación ambiental.',
    variante: 'general',
    destacada: false,
    autor: 'Prensa CVDD',
  },
  {
    titulo: 'Pretemporada: los objetivos del cuerpo técnico',
    slug: 'pretemporada-objetivos',
    categoria: 'Institucional',
    fecha: '28 Feb 2025',
    bajada: 'El DT presentó los planes para la pretemporada y los ambiciosos objetivos de la temporada.',
    contenido: 'El director técnico del Club Deportivo Villa del Dique brindó una conferencia de prensa en la que detalló los objetivos para la nueva temporada. La pretemporada se desarrollará durante tres semanas con doble turno de entrenamiento.',
    variante: 'masculino',
    destacada: false,
    autor: 'Prensa CVDD',
  },
  {
    titulo: 'Nuevo sponsor se suma al club',
    slug: 'nuevo-sponsor-se-suma',
    categoria: 'Institucional',
    fecha: '20 Feb 2025',
    bajada: 'Una empresa local se convirtió en sponsor oficial del club para toda la temporada.',
    contenido: 'En un acto realizado en la sede del club, se formalizó el acuerdo de sponsoreo entre el Club Deportivo Villa del Dique y una destacada empresa local.',
    variante: 'general',
    destacada: false,
    autor: 'Prensa CVDD',
  },
  {
    titulo: 'El club cumple 45 años de historia',
    slug: 'cumple-45-anios',
    categoria: 'Institucional',
    fecha: '12 Feb 2025',
    bajada: 'Villa del Dique celebra un nuevo aniversario con actividades para toda la familia.',
    contenido: 'El Club Deportivo Villa del Dique cumple 45 años de vida institucional. Exjugadores, socios históricos y aficionados se dieron cita en el estadio.',
    variante: 'general',
    destacada: false,
    autor: 'Prensa CVDD',
  },
  {
    titulo: 'Femenino: victoria histórica ante Las Vertientes',
    slug: 'femenino-victoria-vertientes',
    categoria: 'Femenino',
    fecha: '18 Mar 2025',
    bajada: 'El plantel femenino se impuso 2 a 0 y sigue puntero en el torneo.',
    contenido: 'Las chicas volvieron a demostrar su nivel con una actuación sólida que las mantiene en la cima de la tabla.',
    variante: 'femenino',
    destacada: true,
    autor: 'Prensa CVDD',
  },
  {
    titulo: 'Inauguración de la renovada biblioteca',
    slug: 'inauguracion-biblioteca',
    categoria: 'Biblioteca',
    fecha: '25 Feb 2025',
    bajada: 'Con más de 500 títulos nuevos y un espacio renovado, la biblioteca abrió sus puertas.',
    contenido: 'La Biblioteca del club renovó sus instalaciones y amplió su catálogo. Abierta al público todos los días de 16 a 22 hs.',
    variante: 'general',
    destacada: false,
    autor: 'Comisión Cultural',
  },
];

const partidos = [
  { rival: 'Dep. Mina Clavero', fecha: '15 Mar 2025', local: true, estadio: 'Estadio CVDD', torneo: 'Liga Regional', categoria: 'Primera Masculino', estado: 'finalizado', goles_local: 3, goles_visitante: 1 },
  { rival: 'Achiras FC', fecha: '08 Mar 2025', local: false, estadio: 'Estadio Achiras', torneo: 'Liga Regional', categoria: 'Primera Masculino', estado: 'finalizado', goles_local: 2, goles_visitante: 2 },
  { rival: 'Río Cuarto AC', fecha: '01 Mar 2025', local: true, estadio: 'Estadio CVDD', torneo: 'Copa Córdoba', categoria: 'Primera Masculino', estado: 'finalizado', goles_local: 0, goles_visitante: 1 },
  { rival: 'Las Vertientes', fecha: '22 Mar 2025', local: true, estadio: 'Estadio CVDD', torneo: 'Liga Regional', categoria: 'Primera Masculino', estado: 'programado' },
  { rival: 'San Pedro FC', fecha: '29 Mar 2025', local: false, estadio: 'Predio San Pedro', torneo: 'Liga Regional', categoria: 'Primera Masculino', estado: 'programado' },
  { rival: 'Las Vertientes (F)', fecha: '18 Mar 2025', local: true, estadio: 'Estadio CVDD', torneo: 'Liga Femenina', categoria: 'Primera Femenino', estado: 'finalizado', goles_local: 2, goles_visitante: 0 },
  { rival: 'Berrotarán (F)', fecha: '25 Mar 2025', local: false, estadio: 'Cancha Berrotarán', torneo: 'Liga Femenina', categoria: 'Primera Femenino', estado: 'programado' },
  { rival: 'Club Bochas Anisacate', fecha: '20 Mar 2025', local: true, estadio: 'Pista Bochas CVDD', torneo: 'Torneo Sierras', categoria: 'Bochas', estado: 'programado' },
];

const eventos = [
  { titulo: 'Taller de ajedrez en la biblioteca', descripcion: 'Taller abierto a la comunidad los días sábados. Niños y adolescentes bienvenidos.', fecha: '05 Abr 2025', ubicacion: 'Biblioteca CVDD', categoria: 'biblioteca', destacado: true },
  { titulo: 'Colecta solidaria de alimentos', descripcion: 'Campaña anual de recolección de alimentos no perecederos para comedores locales.', fecha: '12 Abr 2025', ubicacion: 'Sede del club', categoria: 'solidario', destacado: true },
  { titulo: 'Asamblea anual de socios', descripcion: 'Asamblea ordinaria para tratar el balance del año y nuevas inversiones.', fecha: '30 Abr 2025', ubicacion: 'Salón principal', categoria: 'institucional', destacado: false },
  { titulo: 'Ciclo de cine comunitario', descripcion: 'Proyecciones gratuitas los viernes a la noche. Clásicos del cine argentino.', fecha: '18 Abr 2025', ubicacion: 'Biblioteca CVDD', categoria: 'cultural', destacado: false },
  { titulo: 'Torneo relámpago infantil', descripcion: 'Encuentro deportivo entre clubes de la región para categorías formativas.', fecha: '26 Abr 2025', ubicacion: 'Estadio CVDD', categoria: 'deportivo', destacado: false },
  { titulo: 'Peña folclórica aniversario', descripcion: 'Noche de peña con artistas locales para celebrar el aniversario del club.', fecha: '10 May 2025', ubicacion: 'Sede del club', categoria: 'cultural', destacado: true },
];

const jugadores = [
  // Titulares fútbol (4-3-3)
  { nombre: 'Matías', apellido: 'Villarreal', numero: 1, posicion: 'Arquero', edad: 29, nacionalidad: 'Argentino', altura: '1.88 m', desde: '2021', bio: 'Capitán del equipo y líder en el arco. Surgido de las inferiores, es el referente de la defensa.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 50, formacion_y: 90, orden: 1, capitan: true, stats: { partidos: 18, vallasInvictas: 7, atajadas: 62 } },
  { nombre: 'Lucas', apellido: 'Pereyra', numero: 4, posicion: 'Lateral Derecho', edad: 24, nacionalidad: 'Argentino', altura: '1.78 m', desde: '2023', bio: 'Veloz por la banda, aporta mucho en ataque.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 82, formacion_y: 72, orden: 2, stats: { partidos: 16, goles: 1, asistencias: 3 } },
  { nombre: 'Federico', apellido: 'Roldán', numero: 2, posicion: 'Defensor Central', edad: 28, nacionalidad: 'Argentino', altura: '1.86 m', desde: '2020', bio: 'Pilar defensivo, fuerte en el juego aéreo.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 62, formacion_y: 75, orden: 3, stats: { partidos: 17, goles: 2, despejes: 95 } },
  { nombre: 'Santiago', apellido: 'Ibáñez', numero: 6, posicion: 'Defensor Central', edad: 26, nacionalidad: 'Argentino', altura: '1.84 m', desde: '2022', bio: 'Zaguero aguerrido, líder en el fondo.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 38, formacion_y: 75, orden: 4, stats: { partidos: 18, goles: 1, despejes: 88 } },
  { nombre: 'Emiliano', apellido: 'Cabrera', numero: 3, posicion: 'Lateral Izquierdo', edad: 25, nacionalidad: 'Argentino', altura: '1.76 m', desde: '2022', bio: 'Lateral ofensivo con buena pegada.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 18, formacion_y: 72, orden: 5, stats: { partidos: 17, goles: 0, asistencias: 4 } },
  { nombre: 'Julián', apellido: 'Sosa', numero: 5, posicion: 'Mediocampista', edad: 27, nacionalidad: 'Argentino', altura: '1.80 m', desde: '2019', bio: 'Volante central, motor del equipo.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 50, formacion_y: 55, orden: 6, stats: { partidos: 18, goles: 3, asistencias: 5 } },
  { nombre: 'Nicolás', apellido: 'Gómez', numero: 8, posicion: 'Mediocampista', edad: 23, nacionalidad: 'Argentino', altura: '1.75 m', desde: '2023', bio: 'Interior box-to-box con mucha llegada.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 28, formacion_y: 50, orden: 7, stats: { partidos: 16, goles: 4, asistencias: 2 } },
  { nombre: 'Gonzalo', apellido: 'Molina', numero: 10, posicion: 'Enganche', edad: 30, nacionalidad: 'Argentino', altura: '1.72 m', desde: '2018', bio: 'El 10, el cerebro del equipo.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 72, formacion_y: 50, orden: 8, stats: { partidos: 18, goles: 6, asistencias: 9 } },
  { nombre: 'Tomás', apellido: 'Herrera', numero: 7, posicion: 'Extremo Derecho', edad: 22, nacionalidad: 'Argentino', altura: '1.70 m', desde: '2024', bio: 'Velocidad pura por la derecha.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 78, formacion_y: 28, orden: 9, stats: { partidos: 14, goles: 5, asistencias: 3 } },
  { nombre: 'Ramiro', apellido: 'Díaz', numero: 11, posicion: 'Extremo Izquierdo', edad: 24, nacionalidad: 'Argentino', altura: '1.74 m', desde: '2022', bio: 'Gambeteador, puede jugar por cualquier banda.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 22, formacion_y: 28, orden: 10, stats: { partidos: 17, goles: 7, asistencias: 4 } },
  { nombre: 'Maximiliano', apellido: 'Paz', numero: 9, posicion: 'Delantero Centro', edad: 28, nacionalidad: 'Argentino', altura: '1.82 m', desde: '2020', bio: 'Goleador histórico del club.', tipo: 'futbol', categoria: 'primera', estado: 'titular', formacion_x: 50, formacion_y: 22, orden: 11, stats: { partidos: 18, goles: 14, asistencias: 3 } },

  // Suplentes fútbol
  { nombre: 'Agustín', apellido: 'Moreno', numero: 12, posicion: 'Arquero', edad: 22, nacionalidad: 'Argentino', altura: '1.85 m', desde: '2024', bio: 'Arquero suplente con proyección.', tipo: 'futbol', categoria: 'primera', estado: 'suplente', orden: 12, stats: { partidos: 2, vallasInvictas: 1 } },
  { nombre: 'Bruno', apellido: 'Ferrer', numero: 13, posicion: 'Defensor', edad: 21, nacionalidad: 'Argentino', altura: '1.83 m', desde: '2024', bio: 'Central zurdo surgido de inferiores.', tipo: 'futbol', categoria: 'primera', estado: 'suplente', orden: 13, stats: { partidos: 6, goles: 0 } },
  { nombre: 'Iván', apellido: 'Quiroga', numero: 14, posicion: 'Mediocampista', edad: 25, nacionalidad: 'Argentino', altura: '1.77 m', desde: '2022', bio: 'Volante recuperador.', tipo: 'futbol', categoria: 'primera', estado: 'suplente', orden: 14, stats: { partidos: 10, goles: 1 } },
  { nombre: 'Diego', apellido: 'Torres', numero: 15, posicion: 'Mediocampista', edad: 20, nacionalidad: 'Argentino', altura: '1.78 m', desde: '2024', bio: 'Joven promesa del mediocampo.', tipo: 'futbol', categoria: 'primera', estado: 'suplente', orden: 15, stats: { partidos: 7, goles: 0 } },
  { nombre: 'Pablo', apellido: 'Acosta', numero: 16, posicion: 'Delantero', edad: 23, nacionalidad: 'Argentino', altura: '1.76 m', desde: '2023', bio: 'Delantero de área con buen remate.', tipo: 'futbol', categoria: 'primera', estado: 'suplente', orden: 16, stats: { partidos: 12, goles: 4 } },
  { nombre: 'Hernán', apellido: 'Vega', numero: 17, posicion: 'Extremo', edad: 26, nacionalidad: 'Argentino', altura: '1.75 m', desde: '2021', bio: 'Revulsivo por las bandas.', tipo: 'futbol', categoria: 'primera', estado: 'suplente', orden: 17, stats: { partidos: 11, goles: 3 } },
  { nombre: 'Franco', apellido: 'Luna', numero: 18, posicion: 'Lateral', edad: 29, nacionalidad: 'Argentino', altura: '1.79 m', desde: '2019', bio: 'Histórico del plantel, versátil en defensa.', tipo: 'futbol', categoria: 'primera', estado: 'suplente', orden: 18, stats: { partidos: 14, goles: 0, asistencias: 2 } },

  // Bochas
  { nombre: 'Carlos', apellido: 'Rodríguez', posicion: 'Conductor', edad: 58, nacionalidad: 'Argentino', desde: '2010', bio: 'Capitán del equipo. Campeón provincial en 2018.', tipo: 'bochas', categoria: 'bochas', estado: 'titular', orden: 1, capitan: true, stats: { torneos: 45, titulos: 8, promedio: '82%' } },
  { nombre: 'Roberto', apellido: 'Álvarez', posicion: 'Arrimador', edad: 62, nacionalidad: 'Argentino', desde: '2008', bio: 'Socio fundador del equipo de bochas.', tipo: 'bochas', categoria: 'bochas', estado: 'titular', orden: 2, stats: { torneos: 52, titulos: 6, promedio: '78%' } },
  { nombre: 'Héctor', apellido: 'Suárez', posicion: 'Bochero', edad: 54, nacionalidad: 'Argentino', desde: '2012', bio: 'Precisión quirúrgica en el remate.', tipo: 'bochas', categoria: 'bochas', estado: 'titular', orden: 3, stats: { torneos: 38, titulos: 5, promedio: '80%' } },
  { nombre: 'Miguel', apellido: 'Benítez', posicion: 'Lanzador', edad: 49, nacionalidad: 'Argentino', desde: '2015', bio: 'Joven valor del equipo, gran futuro.', tipo: 'bochas', categoria: 'bochas', estado: 'titular', orden: 4, stats: { torneos: 22, titulos: 2, promedio: '75%' } },
  { nombre: 'Jorge', apellido: 'Martínez', posicion: 'Suplente', edad: 60, nacionalidad: 'Argentino', desde: '2014', bio: 'Reserva del equipo, siempre listo.', tipo: 'bochas', categoria: 'bochas', estado: 'suplente', orden: 5, stats: { torneos: 28, titulos: 3, promedio: '72%' } },
];

const sponsors = [
  { nombre: 'Constructora Regional', web: '#', categoria: 'principal', orden: 1, descripcion: 'Sponsor principal desde 2020' },
  { nombre: 'Ferretería El Dique', web: '#', categoria: 'principal', orden: 2 },
  { nombre: 'Turismo Sierra Norte', web: '#', categoria: 'secundario', orden: 3 },
  { nombre: 'Banco Córdoba', web: '#', categoria: 'secundario', orden: 4 },
  { nombre: 'Supermercados Valle', web: '#', categoria: 'secundario', orden: 5 },
  { nombre: 'Clínica del Lago', web: '#', categoria: 'apoyo', orden: 6 },
  { nombre: 'Agro Serrano', web: '#', categoria: 'apoyo', orden: 7 },
  { nombre: 'Transporte Andino', web: '#', categoria: 'apoyo', orden: 8 },
];

// ──────────────────────────────────────────────────────────────────────────────
// HTTP helper (native fetch, Node >= 18)
// ──────────────────────────────────────────────────────────────────────────────

async function post(endpoint, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`POST /${endpoint} -> ${res.status}: ${body}`);
  }
  return res.json();
}

async function purge(endpoint) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=100`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) return;
  const json = await res.json();
  for (const item of json.data || []) {
    const id = item.documentId || item.id;
    await fetch(`${STRAPI_URL}/api/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`[seed] apuntando a ${STRAPI_URL}`);

  const args = process.argv.slice(2);
  const shouldPurge = args.includes('--purge');

  if (shouldPurge) {
    console.log('[seed] purgando colecciones previas…');
    for (const col of ['noticias', 'partidos', 'eventos', 'jugadores', 'sponsors']) {
      try { await purge(col); } catch (e) { console.warn(`  purge ${col}: ${e.message}`); }
    }
  }

  console.log('[seed] Noticias…');
  for (const n of noticias) {
    const parsed = parseSpanishDate(n.fecha);
    await post('noticias', {
      titulo: n.titulo,
      slug: n.slug,
      categoria: n.categoria,
      fecha: parsed ? parsed.dateOnly : null,
      bajada: n.bajada,
      contenido: n.contenido,
      variante: n.variante,
      destacada: n.destacada,
      autor: n.autor,
      publishedAt: new Date().toISOString(),
    });
  }
  console.log(`  ✓ ${noticias.length} noticias`);

  console.log('[seed] Partidos…');
  for (const p of partidos) {
    const parsed = parseSpanishDate(p.fecha, '20:00');
    await post('partidos', {
      rival: p.rival,
      fecha: parsed ? parsed.dateTime : null,
      local: p.local,
      estadio: p.estadio,
      torneo: p.torneo,
      categoria: p.categoria,
      estado: p.estado,
      goles_local: p.goles_local ?? null,
      goles_visitante: p.goles_visitante ?? null,
      publishedAt: new Date().toISOString(),
    });
  }
  console.log(`  ✓ ${partidos.length} partidos`);

  console.log('[seed] Eventos…');
  for (const e of eventos) {
    const parsed = parseSpanishDate(e.fecha, '19:00');
    await post('eventos', {
      titulo: e.titulo,
      descripcion: e.descripcion,
      fecha: parsed ? parsed.dateTime : null,
      ubicacion: e.ubicacion,
      categoria: e.categoria,
      destacado: e.destacado,
      publishedAt: new Date().toISOString(),
    });
  }
  console.log(`  ✓ ${eventos.length} eventos`);

  console.log('[seed] Jugadores…');
  for (const j of jugadores) {
    await post('jugadores', {
      ...j,
      publishedAt: new Date().toISOString(),
    });
  }
  console.log(`  ✓ ${jugadores.length} jugadores`);

  console.log('[seed] Sponsors…');
  for (const s of sponsors) {
    await post('sponsors', {
      ...s,
      activo: true,
      publishedAt: new Date().toISOString(),
    });
  }
  console.log(`  ✓ ${sponsors.length} sponsors`);

  console.log('\n[seed] Listo ✓');
}

seed().catch((err) => {
  console.error('[seed] fallo:', err.message);
  process.exit(1);
});
