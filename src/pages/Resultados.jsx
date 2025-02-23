import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Resultados() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || 'Consulta no definida';

  // Estado para almacenar los resultados obtenidos de la API
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    if (!query || query.trim() === '') {
      setError('No se ha definido una consulta válida.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3001/api/users/search?skill=${query}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se encontraron usuarios con esa habilidad.');
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setError('');
      })
      .catch((err) => {
        setError(err.message);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container-resultados">
      <h1>Consulta realizada:</h1>
      <h2>{query}</h2>
      <h3>Resultados obtenidos:</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {loading ? (
        <p>Cargando resultados...</p>
      ) : (
        <div className="results-grid">
          {users.length === 0 ? (
            <p>No se encontraron usuarios con esa habilidad.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p><strong>Habilidades:</strong></p>
                <ul>
                  {user.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}

      <span style={{ height: '40px', display: 'inline-block' }}></span>
      <button onClick={() => navigate('/menu')}>Volver al Menú</button>
    </div>
  );
}

export default Resultados;
