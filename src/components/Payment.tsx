import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartItem, getCartTotal, getQuantityTotal } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { db } from "../firebase";
import CartProduct from "./CartProduct";

const baseURL = "https://us-central1-clone-e06ca.cloudfunctions.net/api";
//const baseURL = "http://localhost:5001/clone-e06ca/us-central1/api";

function Payment() {
  const [{ cart, user }, dispatch] = useStateValue();
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const quantity = getQuantityTotal(cart);

  useEffect(() => {
    if(cart.length === 0) setDisabled(true);
    async function getClientSecret() {
      const response = await fetch(
        `${baseURL}/payments/create?total=${Math.round(getCartTotal(cart) * 100)}`,
        {
          mode: "cors",
          method: "POST",
        }
      );
      const respData = await response.json();
      setClientSecret(respData.clientSecret)
    }
    if (cart.length > 0) {
      getClientSecret();
    }
  }, [cart]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProcessing(true);

    await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!,
      },
    }).then(({paymentIntent}) => {

        setDoc(doc(db, "users", `${user?.uid}`, 'orders', `${paymentIntent!.id}`), {
            cart: cart.map((item) => { return {...item[0], quantity: item[1]}}),
            amount: paymentIntent!.amount,
            created: paymentIntent!.created
          }
        );

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({ type: "EMPTY_CART" });

        navigate("/orders", { replace: true });
      
    })
  }

  function handleChange(e: StripeCardElementChangeEvent) {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  }

  return (
    <Container>
      <PaymentWrapper>
        <h1>
          Checkout (
          <Link to="/checkout">
            {quantity !== 1
              ? `${quantity} items`
              : `${quantity} item`}
          </Link>
          ){" "}
        </h1>
        <PaymentSection>
          <h3>Delivery address</h3>
          <div className="user-info">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </PaymentSection>
        <PaymentSection>
          <h3>Review items and delivery</h3>
          <div>
            {cart.map((item: [CartItem, number]) => (
              <CartProduct
                key={item[0].id}
                id={item[0].id}
                title={item[0].title}
                image={item[0].image}
                price={item[0].price * item[1]}
                quantity={item[1]}
                hideBorder
              />
            ))}
          </div>
        </PaymentSection>
        <PaymentSection>
          <h3>Payment method</h3>
          <div>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div>
                <span>Order total: ${getCartTotal(cart).toFixed(2)}</span>
              </div>
              
              <button className="pay-button" disabled={disabled || succeeded || processing}>
                {processing ? "Processing..." : "Buy Now"}
              </button>
              {error && <div>{error}</div>}
            </form>
          </div>
        </PaymentSection>
      </PaymentWrapper>
    </Container>
  );
}

export default Payment;

const Container = styled.div`
  text-align: left;
  background-color: white;

  h1 {
    text-align: center;
    padding: 10px;
    font-weight: 400;
    background-color: rgb(234, 237, 237);
    border-bottom: 1px solid lightgray;

    a {
      text-decoration: none;
      color: black;
    }
  }
`;

const PaymentWrapper = styled.div``;

const PaymentSection = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid lightgray;

  h3 {
    flex: 0.2;
    font-size: min(calc(0.5em + 1vw), 20px);
  }

  div {
    flex: 0.8;
  }

  .user-info {
    font-size: min(calc(0.5em + 1vw), 16px);
  }

  span {
    font-size: min(calc(0.5em + 1vw), 20px);
    font-weight: 500;
  }

  .pay-button {
    min-width: 150px;
    max-width: 300px;
    margin: 10px 0;
    height: 30px;
    background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
    border-width: 1px;
    border-radius: 3px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: linear-gradient(to bottom, #f3d796, #f0bf43);
      border-color: #a88734 #9c7e31 #846a29;
    }

    &:disabled {
      opacity: 50%;
      cursor: not-allowed;
      background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
    }
  }
`;
