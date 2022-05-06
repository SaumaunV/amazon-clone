import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCartTotal } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { Button } from "./Product";

function Subtotal() {
  const [{ cart }, _ ] = useStateValue();

  return (
    <Container>
      <div>
        <span>
          Subtotal (
          {cart.length > 1 ? `${cart.length} items` : `${cart.length} item`}):
        </span>
        <span className="price"> ${getCartTotal(cart)}</span>
      </div>
      <div className="checkboxGift">
        <input type="checkbox" id="gift" />
        <label htmlFor="gift">This order contains a gift</label>
      </div>

      <Link to="../payment">
        <CheckoutButton>
          <button>Proceed to checkout</button>
        </CheckoutButton>
      </Link>
    </Container>
  );
}

export default Subtotal;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
    height: 250px;
    min-width: 300px;
    background-color: white;
    margin-left: 25px;
    padding: 20px;
    text-align: left;

    span {
        font-size: 20px;
    }

    .price {
        font-weight: 700;
    }

    label {
        padding-left: 5px;
    }

    .checkboxGift {
        padding-top: 5px;
    }
`;

const CheckoutButton = styled(Button)`
    text-align: left;
    button {
        margin-top: -10px;
        width: 260px;
        border-radius: 8px;
    }
`;
