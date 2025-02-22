import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Usuario';

  return (
    <div>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ←
        </button>
      </div>
      <div className="container">
        <h1>Hola, {userName}</h1>
        <h2>¿Qué deseas realizar?</h2>
        <div className="button-group">
          <button onClick={() => navigate('/consulta')}>Consulta</button>
          <span style={{ width: '40px', display: 'inline-block' }}></span>
          <button onClick={() => navigate('/registro')}>Registro</button>
        </div>
      </div>

      <div className="footer-banner">
        <h3>"Cada error que corriges te acerca a ser un mejor programador"</h3>
      </div>

    </div>
  );
}

export default Menu;
