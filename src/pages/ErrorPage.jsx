import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>HackUDC 2025</h1>
      <h2>ERROR!</h2>
      <p>Es necesario cubrir los dos campos del registro</p>
      <button onClick={() => navigate('/registro')}>Volver</button>
    </div>
  );
}

export default ErrorPage;
