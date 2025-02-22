import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Consulta() {
  const [users, setUsers] = useState([]);
  const [skill, setSkill] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para hacer la consulta a la API
  const fetchData = (filtro) => {
    setError(''); // Limpiar el mensaje de error

    // Si no hay filtro, mostramos todos los usuarios
    const url = filtro
      ? `http://localhost:3001/api/users/search?skill=${filtro}`
      : 'http://localhost:3001/api/users';

    fetch(url)
      .then(res => {
        if (!res.ok) {
          // Si no fue OK, lanzamos un error
          throw new Error('No se encontraron usuarios con esa habilidad.');
        }
        return res.json();
      })
      .then(data => {
        setUsers(data); // Actualizamos los usuarios con los resultados
      })
      .catch(err => {
        setError(err.message); // Si hay error, lo mostramos
        setUsers([]); // Asegurarnos de que no quede nada en la lista de usuarios
      });
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (skill.trim() !== '') {
      fetchData(skill); // Solo buscamos si el campo no está vacío
    } else {
      // Si el campo está vacío, mostramos todos los usuarios
      fetchData('');
    }
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
          onChange={(e) => setSkill(e.target.value)}  // Actualizamos el estado 'skill' con el valor del input
        />
        <button onClick={handleSearch}>Buscar</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostramos el mensaje de error si hay alguno */}
        
        <div>
          <h2>Resultados:</h2>
          {users.length === 0 ? (
            <p>No se encontraron usuarios con esa habilidad.</p>
          ) : (
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.name} - {user.skills.join(', ')}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Consulta;