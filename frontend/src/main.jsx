import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 🧼 Estilos
import './styles';


// 🧩 App principal
import App from './App.jsx';

// 🎨 Bootstrap (después de los tuyos para poder sobreescribirlo)
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
