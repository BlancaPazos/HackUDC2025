// server/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta absoluta a tu database.json (ajusta si está en otra ruta)
const dbPath = path.join(__dirname, '..', 'database', 'database.json');

// GET /api/users/check?employeeId=123
app.get('/api/users/check', (req, res) => {
  const { employeeId } = req.query;
  // Leer base de datos JSON (o tu fuente de datos)
  // Buscar si existe algún usuario con ese ID
  const userFound = data.find((user) => user.id === Number(employeeId));

  if (userFound) {
    return res.json({ success: true, user: userFound });
  } else {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
});

// 1) Endpoint para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  // Leer el archivo JSON
  const rawData = fs.readFileSync(dbPath, 'utf-8');
  const data = JSON.parse(rawData);
  // Retornar la lista completa (o la parte que quieras)
  res.json(data);
});

// 2) Endpoint de búsqueda filtrada (por ejemplo, buscar por skill)
app.get('/api/users/search', (req, res) => {
  const { skill } = req.query; // http://localhost:3001/api/users/search?skill=Oracle

  const rawData = fs.readFileSync(dbPath, 'utf-8');
  const data = JSON.parse(rawData);

  // Filtrar
  if (!skill) {
    return res.json(data); // si no hay 'skill' en query, manda todo
  }

  const filtered = data.filter(u =>
    u.skills && u.skills.some(s => s.toLowerCase() === skill.toLowerCase())
  );
  res.json(filtered);
});

// 3) Arrancar el servidor
const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
