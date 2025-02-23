import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [texto, setTexto] = useState('');
  const [recursos, setRecursos] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    const employeeId = localStorage.getItem('employeeId'); // Recupera el employeeId desde localStorage

    if (!employeeId) {
      alert('No se encontró el ID del usuario logueado.');
      navigate('/Login'); // Redirige al usuario a la página de login si no está logueado
      return;
    }

    if (texto.trim() === '' || recursos.trim() === '') {
      // Navegamos a la pantalla de error
      navigate('/error');
    } else {
      try {
        const response = await fetch('/api/users/add-skill', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeId: employeeId, // Usa el ID del usuario logueado
            campoRegistro: texto,
            campoRecursos: recursos,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('¡Registro guardado!');
          navigate('/menu');
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error al guardar el registro:', error);
        alert('Hubo un error al guardar el registro.');
      }
    }
  };

  return (
    <div className="container-registro">
      <h1>Registro</h1>
      <h2>¿Qué deseas registrar?</h2>
      <textarea
        placeholder="Ej: He aprendido a usar la biblioteca OpenNN"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <span style={{ height: '15px', display: 'inline-block' }}></span>
      <h2>¿Qué recursos has utilizado?</h2>
      <textarea
        placeholder="Recursos que has utilizado: (URLs, webs...)"
        value={recursos}
        onChange={(e) => setRecursos(e.target.value)}
      />
      <span style={{ height: '15px', display: 'inline-block' }}></span>
      <button onClick={handleSave}>Guardar</button>
      <span style={{ height: '15px', display: 'inline-block' }}></span>
      <button onClick={() => navigate('/menu')}>Cancelar</button>
    </div>
  );
}

export default Registro;
