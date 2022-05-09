import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useStateValue } from './context/StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders';

const promise = loadStripe(
  "pk_test_51KwF2aI4Cy6aDqWFFHrMoS7rZqaasC9lNC2ibfCQ0YuOOAog6XSHBkkL71hYYnSNv2kDcPlmZycMiAAnuyf5mQWH00FoYzgAYL"
);

function App() {
  const [_, dispatch] = useStateValue();

 useEffect(() => {
   onAuthStateChanged(auth, (authUser) => {
     if(authUser) {
       dispatch({type: "SET_USER", user: authUser})
     }
     else {
       dispatch({ type: "SET_USER", user: null });
     }
   })
 }, [])

  return (
    <div className="App">
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
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
