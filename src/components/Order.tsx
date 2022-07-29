import React from "react";
import moment from "moment";
import { CartItem } from "../context/reducer";
import CartProduct from "./CartProduct";
import { DocumentType } from "./Orders";
import styled from 'styled-components'

interface Props {
  order: DocumentType;
}

function Order({ order }: Props) {
  return (
    <Container>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="id">
        <small>{order.id}</small>
      </p>
      {order.data.cart?.map((item: [CartItem, number]) => (
        <CartProduct
          id={item[0].id}
          title={item[0].title}
          image={item[0].image}
          price={item[0].price}
          quantity={item[1]}
          hideButton
          hideBorder
        />
      ))}
      <span className="order-total">
        Order Total: ${order.data.amount / 100}
      </span>
    </Container>
  );
}

export default Order;

const Container = styled.div`
  padding: clamp(20px, 5vw, 40px);
  margin: 20px 0;
  border: 1px solid lightgray;
  background-color: white;
  position: relative;

  .id {
    position: absolute;
    top: 40px;
    right: 20px;

    @media (max-width: 600px) {
      top: 5px;
    }
  }

  p {
    font-size: min(calc(0.5em + 1vw), 16px);
  }

  .order-total {
    font-size: min(calc(0.5em + 1vw), 20px);
    font-weight: 500;
  }
`;