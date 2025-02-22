import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Consulta() {
  const [users, setUsers] = useState([]);
  const [skill, setSkill] = useState('');
  const navigate = useNavigate();

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
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/menu')}>
          ←
        </button>
      </div>
      <div className="container">
        <h1>Consulta</h1>
        <h2>Escribe a continuación la consulta que deseas realizar:</h2>
        <input
          type="text"
          placeholder="Escribe aquí tu consulta"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>

  );
}

export default Consulta;
