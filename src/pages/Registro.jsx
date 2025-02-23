import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [texto, setTexto] = useState('');
  const [recursos, setRecursos] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    const employeeId = localStorage.getItem('employeeId');
  
    if (!employeeId) {
      alert('No se encontró el ID del usuario logueado. Redirigiendo a login.');
      navigate('/login');
      return;
    }
  
    if (!texto.trim() || !recursos.trim()) {
      alert('Los campos no pueden estar vacíos.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/users/add-skill', {  // URL completa al servidor
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: Number(employeeId),
          campoRegistro: texto.trim(),
          campoRecursos: recursos.trim(),
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Error desconocido');
      }
  
      alert('¡Registro guardado!');
      navigate('/menu');
    } catch (error) {
      console.error('Error al guardar el registro:', error);
      alert(`Registro guardado`);
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
