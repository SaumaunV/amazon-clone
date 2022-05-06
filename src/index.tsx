import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StateProvider from './context/StateProvider';
import reducer, { initialState } from './context/reducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
