import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>¡ERROR!</h1>
      <h2>Es necesario cubrir los dos campos del registro</h2>
      <span style={{ height: '15px', display: 'inline-block' }}></span>
      <button onClick={() => navigate('/registro')}>Volver</button>
    </div>
  );
}

export default ErrorPage;
