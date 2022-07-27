import React from "react";
import styled from "styled-components";
import { CartItem } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import CartProduct from "./CartProduct";
import Subtotal from "./Subtotal";

function Cart() {
  const [{cart}, dispatch] = useStateValue();

  return (
    <Container>
      <ShoppingCart>
        <h1>Shopping Cart</h1>
        <hr />
        {/* <CartProduct
          title="All-new Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal"
          price={29.99}
          image="https://images-na.ssl-images-amazon.com/images/I/714Rq4k05UL._AC_SL1000_.jpg"
        /> */}
        {cart.map((item: CartItem) => (
          <CartProduct key={item.title} title={item.title} image={item.image} price={item.price} />
        ))}
      </ShoppingCart>
      {(cart.length > 0) && <Subtotal />}
    </Container>
  );
}

export default Cart;

const Container = styled.div`
  display: flex;
  min-height: 90vh;
  background-color: #eaeded;
  padding: 14px 18px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ShoppingCart = styled.div`
    flex: 1;
    height: 100%;
    max-width: 1500px;
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
