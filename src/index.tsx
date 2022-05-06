import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StateProvider from './context/StateProvider';
import reducer, { initialState } from './context/reducer';

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>, root
);
