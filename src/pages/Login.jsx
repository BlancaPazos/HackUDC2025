import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();

  const handleAccess = () => {
    if (!employeeId.trim()) {
      alert('Por favor, introduce un ID válido');
      return;
    }

    // Llamar a tu backend en el puerto 3001
    fetch(`http://localhost:3001/api/users/check?employeeId=${employeeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Usuario no encontrado');
        }
        return response.json();
      })
      .then((data) => {
        // data.success === true
        alert(`¡Bienvenid@, ${data.user.name}!`);
        
        localStorage.setItem('userName', data.user.name);
        
        navigate('/menu');
      })
      .catch(() => {
        alert('No se encontró un usuario con ese ID');
      });
  };

  return (
    <div>
      <div className="container">
        <h1>Bienvenid@</h1>
        <p>Introduce tu ID de empleado:</p>
        <input
          type="text"
          placeholder="Ej: 123"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button onClick={handleAccess}>Acceder</button>
      </div>

      <div className="footer-banner">
        <h3>"El mejor programador no es el que lo sabe todo, sino el que nunca deja de aprender"</h3>
      </div>
    </div>
  );
}

export default Login;
