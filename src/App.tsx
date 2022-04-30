import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      {/* <Header />
      <Home /> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
