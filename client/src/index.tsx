import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from 'react-toastify';

import App from './App';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <React.StrictMode>
      <ToastContainer />
      <App />
    </React.StrictMode>
  </AuthProvider>
);

