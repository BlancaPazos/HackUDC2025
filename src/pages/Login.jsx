import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();

  const handleAccess = () => {
    if (employeeId.trim() !== '') {
      // Aquí podrías validar o llamar a la API
      navigate('/menu');
    } else {
      // Podrías mostrar un mensaje de error
      alert('Por favor, introduce un ID válido');
    }
  };

  return (
    <div className="container">
      <h1>HackUDC 2025</h1>
      <p>Introduce tu ID de empleado</p>
      <input
        type="text"
        placeholder="Ej: 123"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <button onClick={handleAccess}>Acceder</button>
    </div>
  );
}

export default Login;
