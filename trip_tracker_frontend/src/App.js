import React from 'react';
import './App.css';
import AppProviders from './providers/AppProviders';
import AppRouter from './routes';

/**
 * PUBLIC_INTERFACE
 * App root component. Wires providers and the router.
 */
function App() {
  return (
    <div className="App">
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </div>
  );
}

export default App;
