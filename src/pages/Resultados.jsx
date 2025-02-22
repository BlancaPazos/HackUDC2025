import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Resultados() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ejemplo de "resultados" en duro. En la práctica, los obtendrías de la API
  const fakeResults = [
    {
      empleado: 'Pepe',
      realizo: 'Implementación con Oracle',
      recursos: ['Documentación Oracle', 'Manual interno']
    },
    {
      empleado: 'Cristina',
      realizo: 'Optimización de queries SQL',
      recursos: ['Tutorial SQL Avanzado', 'Foro StackOverflow']
    }
  ];

  return (
    <div className="container-resultados">
      <h1>Consulta realizada: </h1>
      <h2>{location.state?.query || 'Consulta no definida'}</h2>
      
      <h3>Resultados relacionados:</h3>
      {fakeResults.map((r, idx) => (
        <div key={idx} className="resultado">
          <p><strong>Empleado/a:</strong> {r.empleado}</p>
          <p><strong>Realizó:</strong> {r.realizo}</p>
          <p><strong>Recursos utilizados:</strong></p>
          <ul>
            {r.recursos.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
          <hr />
        </div>
      ))}

      <button onClick={() => navigate('/menu')}>Volver al Menú</button>
    </div>
  );
}

export default Resultados;
