import React, { useState, useEffect } from 'react';

function Consulta() {
  const [users, setUsers] = useState([]);
  const [skill, setSkill] = useState('');

  const fetchData = (filtro) => {
    // Ajusta la URL en base a si se pasa skill o no
    const url = filtro
      ? `http://localhost:3001/api/users/search?skill=${filtro}`
      : 'http://localhost:3001/api/users';

    fetch(url)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // Obtener la lista completa al montar
    fetchData('');
  }, []);

  const handleSearch = () => {
    fetchData(skill);
  };

  return (
    <div>
      <h1>Búsqueda de usuarios</h1>
      <input
        type="text"
        placeholder="Filtrar por skill"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} - Skills: {u.skills?.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Consulta;
