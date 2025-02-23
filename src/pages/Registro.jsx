import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [texto, setTexto] = useState('');
  const [recursos, setRecursos] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (texto.trim() === '' || recursos.trim() === '') {
      // Navegamos a la pantalla de error
      navigate('/error');
    } else {
      // Guardamos en la BD (ficticio). 
      // Podrías hacer fetch a tu API, y luego volver al menú o a otra pantalla.
      alert('¡Registro guardado!');
      navigate('/menu');
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
