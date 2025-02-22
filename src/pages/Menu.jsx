import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>HackUDC 2025</h1>
      <h2>¿Qué deseas realizar?</h2>
      <div className="button-group">
        <button onClick={() => navigate('/consulta')}>Consulta</button>
        <button onClick={() => navigate('/registro')}>Registro</button>
      </div>
    </div>
  );
}

export default Menu;
