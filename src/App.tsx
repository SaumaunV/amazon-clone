import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Header />
      <Home />
    </div>
  );
}

export default App;
