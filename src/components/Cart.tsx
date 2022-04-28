import React from "react";
import styled from "styled-components";
import Subtotal from "./Subtotal";

function Cart() {
  return (
    <Container>
      <ShoppingCart>
        <h1>Shopping Cart</h1>
        <hr />
      </ShoppingCart>
      <Subtotal />
    </Container>
  );
}

export default Cart;

const Container = styled.div`
    display: flex;
    height: 90vh;
    background-color: #eaeded;
    padding: 14px 18px;
`;

const ShoppingCart = styled.div`
    height: 100%;
    width: 1500px;
    background-color: white;
    margin-bottom: 20px;

    h1 {
        margin-bottom: 20px;
        padding-left: 20px;
        padding-top: 20px;
        font-weight: 400;
        text-align: left;
    }

    hr {
        margin: 0 20px;
    }
`
