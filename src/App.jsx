import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from './pages/Login';
import Menu from './pages/Menu';
import Consulta from './pages/Consulta';
import Resultados from './pages/Resultados';
import Registro from './pages/Registro';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
