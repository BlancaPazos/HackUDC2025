-- Creamos la base de datos (puedes ponerle el nombre que quieras)
CREATE DATABASE IF NOT EXISTS mi_empresa;
USE mi_empresa;

-- Creamos la tabla users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  skills TEXT -- Guardaremos las habilidades en un texto (ej. JSON o coma-separado)
);
