# Frontend — Club Villa del Dique

SPA en React 19 generada con [Create React App](https://create-react-app.dev/) (`react-scripts`).

## Cómo correr

```bash
npm install
npm start
```

Abre `http://localhost:3000`.

## Build de producción

```bash
npm run build
```

Genera la carpeta `build/` con archivos estáticos minificados listos para subir a cualquier hosting (Netlify, Vercel, Hostinger, S3, etc.).

## Variables de entorno

Configurables en `.env.local` (no se sube al repo):

- `REACT_APP_STRAPI_URL` — URL del backend Strapi. Por defecto `http://localhost:1337`.
- `REACT_APP_STRAPI_TOKEN` — opcional. Token Read-only de Strapi si protegés las rutas.

> Importante: en CRA las variables de entorno **deben empezar con `REACT_APP_`** para ser expuestas al cliente.

## Estructura

```
src/
├── components/    # Componentes reutilizables (NewsCard, FootballField, etc.)
├── pages/         # Páginas con su routing (Home, NoticiasPage, CalendarPage, etc.)
├── data/          # Datos estáticos de fallback (legacy, ya no se usan)
├── services/      # Cliente HTTP de Strapi (api.js)
├── styles/        # Estilos globales
├── assets/        # Imágenes y otros assets importados desde código
├── App.jsx        # Componente raíz + router
├── index.js       # Entry point (montaje del root de React)
└── index.css      # Reset y estilos base
```
