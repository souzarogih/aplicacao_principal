// src/App.js
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const App = () => {
  const [activeMicrofrontend, setActiveMicrofrontend] = useState(null);

  const loadMicrofrontend = async (microfrontend) => {
    try {
      const module = await import(`http://localhost:3001/${microfrontend}/build/index.js`);  // Substitua 3001 pela porta correta
      const microfrontendComponent = module.default;
      setActiveMicrofrontend(() => microfrontendComponent);
    } catch (error) {
      console.error('Erro ao carregar o microfrontend:', error);
    }
  };
  

  useEffect(() => {
    loadMicrofrontend('MicrofrontendA');
  }, []); // Carregar um microfrontend por padrão

  return (
    <div>
      <h1>Aplicação Principal</h1>
      <nav>
        <button onClick={() => loadMicrofrontend('MicrofrontendA')}>Microfrontend A</button>
        <button onClick={() => loadMicrofrontend('MicrofrontendB')}>Microfrontend B</button>
      </nav>
      {activeMicrofrontend &&
        createPortal(<activeMicrofrontend />, document.getElementById(activeMicrofrontend.name.toLowerCase()))
      }
    </div>
  );
};

export default App;
