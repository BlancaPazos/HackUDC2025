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
// Ejemplo completo
app.get('/api/users/check', (req, res) => {
  const { employeeId } = req.query;

  // Leer y parsear el JSON en cada petición (simple pero funciona)
  const rawData = fs.readFileSync(dbPath, 'utf-8');
  const data = JSON.parse(rawData);

  // Buscar el usuario
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
  const { skill } = req.query;  // Extraemos la habilidad de la consulta

  const rawData = fs.readFileSync(dbPath, 'utf-8');
  const data = JSON.parse(rawData);

  // Filtrar por habilidad si la habilidad está definida
  if (!skill) {
    return res.json(data);  // Si no hay skill, devuelve todos los usuarios
  }

  const filtered = data.filter(user =>
    user.skills && user.skills.some(s => s.toLowerCase() === skill.toLowerCase())
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: "No se encontraron usuarios con esa habilidad." });  // Si no hay coincidencias
  }

  res.json(filtered);  // Devolver los usuarios filtrados
});

// 4) Endpoint para agregar una nueva skill al usuario logueado
app.post('/api/users/add-skill', (req, res) => {
  const { employeeId, campoRegistro, campoRecursos } = req.body;

  if (!employeeId || !campoRegistro || !campoRecursos) {
    return res.status(400).json({ success: false, message: 'Datos incompletos' });
  }

  const rawData = fs.readFileSync(dbPath, 'utf-8');
  const data = JSON.parse(rawData);

  // Buscar el usuario en la base de datos
  const userIndex = data.findIndex((user) => user.id === Number(employeeId));

  if (userIndex === -1) {
    return res.status(403).json({ success: false, message: 'Acceso denegado' });
  }

  // Crear la nueva skill en formato "registro-recursos utilizados"
  const newSkill = `${campoRegistro}-${campoRecursos}`;

  // Agregar la nueva skill solo si no está ya en el array
  if (!data[userIndex].skills.includes(newSkill)) {
    data[userIndex].skills.push(newSkill);
  } else {
    return res.status(400).json({ success: false, message: 'Skill ya existe en el usuario' });
  }

  // Guardar los cambios en database.json
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  res.json({ success: true, message: 'Skill añadida correctamente', user: data[userIndex] });
});

// 3) Arrancar el servidor
const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
