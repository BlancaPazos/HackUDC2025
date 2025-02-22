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

    // Llamada al backend para comprobar si existe el usuario
    fetch(`http://localhost:3001/api/users/check?employeeId=${employeeId}`)
      .then((response) => {
        if (!response.ok) {
          // Si la respuesta no es 2xx, lanzamos un error para ir al catch
          throw new Error('Usuario no encontrado');
        }
        return response.json();
      })
      .then((data) => {
        // data.success === true => usuario existe
        alert(`¡Bienvenido/a, ${data.user.name}!`);
        navigate('/menu');
      })
      .catch((err) => {
        // Error de fetch o usuario no encontrado
        alert('No se encontró un usuario con ese ID');
      });
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
