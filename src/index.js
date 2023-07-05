import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/Authcontext';
import { Chatprovider } from './context/Chatcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
  <Chatprovider>
    <App />
    </Chatprovider>
    </AuthProvider>
  </React.StrictMode>
);
