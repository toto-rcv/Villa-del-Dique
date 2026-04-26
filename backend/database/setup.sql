-- Setup MySQL para Club Deportivo y Biblioteca Villa del Dique
-- Ejecutar como usuario root de MySQL:
--   mysql -u root -p < setup.sql

-- Crea la base de datos con charset utf8mb4 (soporta emojis y acentos)
CREATE DATABASE IF NOT EXISTS cvdd
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Usuario dedicado para el backend (mas seguro que usar root)
-- IMPORTANTE: cambiar la clave si vas a poner esto en produccion.
CREATE USER IF NOT EXISTS 'cvdd_user'@'localhost'
  IDENTIFIED BY 'root123';

-- Permisos totales sobre la base cvdd (y nada mas)
GRANT ALL PRIVILEGES ON cvdd.* TO 'cvdd_user'@'localhost';

FLUSH PRIVILEGES;

-- Verificacion
SELECT 'Base de datos cvdd creada' AS status;
SELECT User, Host FROM mysql.user WHERE User = 'cvdd_user';
