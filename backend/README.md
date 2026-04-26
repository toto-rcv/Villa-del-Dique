# Backend — Club Deportivo y Biblioteca Villa del Dique

Strapi v5 + MySQL. Administra noticias, partidos, eventos del calendario, jugadores y sponsors.

## Requisitos

- Node.js 18 a 22 (recomendado 20 LTS)
- npm 9+
- MySQL 8.x (o MariaDB 10.6+) corriendo en tu máquina o accesible por red

## 1 · Crear la base de datos MySQL

Entrá al cliente MySQL (Workbench, DBeaver, phpMyAdmin, CLI…) y ejecutá:

```sql
CREATE DATABASE cvdd
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'cvdd_user'@'localhost' IDENTIFIED BY 'una_clave_fuerte';
GRANT ALL PRIVILEGES ON cvdd.* TO 'cvdd_user'@'localhost';
FLUSH PRIVILEGES;
```

Podés usar `root` si preferís, pero un usuario dedicado es más seguro.

## 2 · Configurar `.env`

```bash
cd backend
cp .env.example .env
```

Editá `backend/.env` con los datos de tu MySQL:

```env
HOST=0.0.0.0
PORT=1337

APP_KEYS=clave1,clave2
API_TOKEN_SALT=cualquier-string-largo-aleatorio
ADMIN_JWT_SECRET=otro-string-largo-aleatorio
TRANSFER_TOKEN_SALT=otro-string-largo-aleatorio
ENCRYPTION_KEY=otro-string-largo-aleatorio
JWT_SECRET=otro-string-largo-aleatorio

DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=cvdd
DATABASE_USERNAME=cvdd_user
DATABASE_PASSWORD=una_clave_fuerte
DATABASE_SSL=false

FRONTEND_URL=http://localhost:5173
```

Para generar claves aleatorias rápido:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Ejecutá ese comando varias veces y pegá un valor distinto en cada `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` y `JWT_SECRET`.

## 3 · Instalar dependencias

```bash
npm install
```

Si aparece un warning sobre el adaptador de base, instalá manualmente:

```bash
npm install mysql2
```

## 4 · Arrancar en modo desarrollo

```bash
npm run develop
```

Strapi levanta el admin en `http://localhost:1337/admin`. La primera vez te pide crear el usuario administrador (nombre, mail, contraseña). Guardalo.

Una vez dentro del admin, los content types ya van a estar creados:

- Noticia
- Partido
- Evento
- Jugador
- Sponsor

El archivo `src/index.js` además concede automáticamente los permisos públicos de lectura a estas cinco colecciones la primera vez que se inicia, así el frontend puede consumir las APIs sin configurar roles a mano.

## 5 · Cargar datos de ejemplo (opcional)

Con Strapi corriendo en otra terminal:

1. En el admin, andá a **Settings → API Tokens → Create new API Token**.
2. Nombre: `seed`. Token type: `Full access`. Duration: `Unlimited` (o 7 días).
3. Copiá el token y agregalo a `backend/.env`:

```env
SEED_TOKEN=pegá_el_token_completo_acá
STRAPI_URL=http://localhost:1337
```

4. Ejecutá:

```bash
npm run seed
```

Esto va a crear 8 noticias, 8 partidos, 6 eventos, 23 jugadores y 8 sponsors de ejemplo. Si querés vaciar todo antes de volver a sembrar:

```bash
npm run seed -- --purge
```

## 6 · Conectar el frontend

En la carpeta del frontend (raíz del repo) creá `.env`:

```env
VITE_STRAPI_URL=http://localhost:1337
```

Reiniciá `npm run dev` y el frontend ya va a consumir los datos del backend a través de `src/services/api.js`.

## Endpoints disponibles

Todos son REST y responden en `/api/<colección>`:

| Colección   | Listado             | Por id               |
|-------------|---------------------|----------------------|
| Noticias    | `GET /api/noticias` | `GET /api/noticias/:id` |
| Partidos    | `GET /api/partidos` | `GET /api/partidos/:id` |
| Eventos     | `GET /api/eventos`  | `GET /api/eventos/:id`  |
| Jugadores   | `GET /api/jugadores`| `GET /api/jugadores/:id`|
| Sponsors    | `GET /api/sponsors` | `GET /api/sponsors/:id` |

Filtros habituales:

- `?filters[variante][$eq]=femenino` (noticias)
- `?filters[categoria][$eq]=Primera Masculino&filters[estado][$eq]=programado` (partidos)
- `?filters[tipo][$eq]=futbol&filters[estado][$eq]=titular` (jugadores)
- `?sort[0]=fecha:desc`
- `?populate=portada,foto,logo,cartel` (para traer las imágenes)

## Scripts

```bash
npm run develop   # modo dev con autoreload
npm run start     # producción (después de build)
npm run build     # compila el admin
npm run seed      # sembrar datos
npm run strapi    # CLI de Strapi
```

## Deploy

Strapi v5 soporta:
- **Strapi Cloud** (lo más simple, free tier)
- **Railway / Render / Heroku** (hay guías oficiales en docs.strapi.io)
- **VPS propio** (PM2 + nginx reverse proxy)

Para cualquiera de esas opciones vas a necesitar:
- MySQL accesible (RDS, PlanetScale, DigitalOcean Managed DB, etc.)
- Variables de entorno configuradas igual que en tu `.env`
- `NODE_ENV=production`
- Correr `npm run build` antes de `npm run start`
