import React from "react";
//import Moment from "react-moment";
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
      {/* <Moment unix format="MMMM Do YYYY, h:mma"></Moment> */}
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="id">
        <small>{order.id}</small>
      </p>
      {order.data.cart?.map((item: CartItem) => (
        <CartProduct title={item.title} image={item.image} price={item.price} hideButton hideBorder/>
      ))}
      <span>Order Total: ${order.data.amount/100}</span>
    </Container>
  );
}

export default Order;

const Container = styled.div`
  padding: 40px;
  margin: 20px 0;
  border: 1px solid lightgray;
  background-color: white;
  position: relative;

  .id {
    position: absolute;
    top: 40px;
    right: 20px;
  }

  span {
    font-size: 20px;
    font-weight: 500;
    text-align: right;
  }
`