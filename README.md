# Club Deportivo y Biblioteca Villa del Dique

Sitio web institucional del Club Deportivo y Biblioteca Villa del Dique. El proyecto está dividido en dos partes independientes: **frontend** (React + Vite) y **backend** (Strapi v5 + MySQL).

## Estructura del repo

```
ClubVilladelDique/
├── frontend/        # SPA React + Vite (sitio público)
└── backend/         # CMS Strapi v5 con MySQL
```

Cada carpeta tiene su propio `package.json`, `node_modules` y se corre por separado.

## Cómo correr el proyecto en local

### 1. Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

Va a estar disponible en `http://localhost:1337`. Antes de la primera vez, configurar la base de datos MySQL en `backend/.env` (ver `backend/README.md` para los detalles).

Apenas arranca por primera vez te pide crear el usuario admin del panel. Después podés cargar contenido en `http://localhost:1337/admin`.

### 2. Frontend (React + Vite)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Va a estar disponible en `http://localhost:5173`. Lee la URL del backend desde `frontend/.env.local` (`VITE_STRAPI_URL=http://localhost:1337` por defecto).

## Stack

**Frontend**: React 19, Vite, React Router, Styled Components, Framer Motion, React Icons.

**Backend**: Strapi v5, MySQL 8+. Los content-types definidos son: Noticia, Partido, Evento, Jugador, Sponsor, Directivo.

## Comunicación entre front y back

El frontend consume el API REST público de Strapi (`/api/...`) sin autenticación, ya que los permisos `find`/`findOne` para los content-types públicos se otorgan automáticamente al rol Public en el bootstrap del backend (`backend/src/index.js`).

Si en el futuro se quiere proteger algún endpoint, agregar un API Token en Strapi y guardarlo en `frontend/.env.local` como `VITE_STRAPI_TOKEN=...`.
