import React from "react";
import styled from "styled-components";
import { Button } from "./Product";

function Subtotal() {
  return (
    <Container>
      <div>
        <span>Subtotal (0 items):</span>
        <span className="price"> $0</span>
      </div>
      <div className="checkboxGift">
        <input type="checkbox" id="gift" />
        <label htmlFor="gift">This order contains a gift</label>
      </div>

      <CheckoutButton>
        <button>Proceed to checkout</button>
      </CheckoutButton>
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
