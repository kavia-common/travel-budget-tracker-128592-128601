import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Entry point rendering App which includes providers and router.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
