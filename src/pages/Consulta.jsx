import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Consulta() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Aquí podrías llamar a tu backend para buscar
    // Por simplicidad, navegamos directamente a la pantalla de resultados
    if (query.trim() !== '') {
      navigate('/resultados', { state: { query } });
    } else {
      alert('Por favor, introduce una consulta');
    }
  };

  return (
    <div className="container">
      <h1>HackUDC 2025</h1>
      <h2>Buscar</h2>
      <input
        type="text"
        placeholder="Escribe aquí tu consulta"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default Consulta;
