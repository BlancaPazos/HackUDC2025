import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Consulta() {
  const [skill, setSkill] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (skill.trim() === '') {
      alert('Por favor, introduce una consulta válida.');
      return;
    }

    // Navegar a la pantalla de Resultados pasando el texto de la consulta
    navigate('/resultados', { state: { query: skill } });
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
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
}

export default Consulta;
