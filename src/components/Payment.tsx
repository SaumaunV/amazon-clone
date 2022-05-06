import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartItem, getCartTotal } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import CartProduct from "./CartProduct";

function Payment() {
  const [{ cart, user }, _] = useStateValue();
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  useEffect(() => {
    async function getClientSecret() {
      const response = await fetch(
        `/payments/create?total=${getCartTotal(cart) * 100}`,
        {
          method: "POST",
        }
      );
      const respData = await response.json();
      setClientSecret(respData.clientSecret)
    }

    getClientSecret();
  }, [cart]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!,
      },
    }).then(({paymentIntent}) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate("/orders", {replace: true});
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
            {cart?.length !== 1
              ? `${cart.length} items`
              : `${cart.length} item`}
          </Link>
          ){" "}
        </h1>
        <PaymentSection>
          <h3>Delivery address</h3>
          <div>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </PaymentSection>
        <PaymentSection>
          <h3>Review items and delivery</h3>
          <div>
            {cart.map((item: CartItem) => (
              <CartProduct
                key={item.title}
                title={item.title}
                image={item.image}
                price={item.price}
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
                <span>Order total: ${getCartTotal(cart)}</span>
              </div>
              <button disabled={disabled || succeeded || processing}>
                {processing ? "Processing" : "Buy Now"}
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
  margin: 0 20px;
  border-bottom: 1px solid lightgray;

  h3 {
    flex: 0.2;
  }

  div {
    flex: 0.8;
  }

  span {
    font-size: 20px;
    font-weight: 500;
  }
`;
