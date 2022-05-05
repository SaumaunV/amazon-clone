import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../context/StateProvider';
import {Button} from './Product'

interface Props {
  title: string,
  price: number,
  image: string,
}

function CartProduct({title, price, image}: Props) {
  const [_, dispatch] = useStateValue();

  function removeItem() {
    dispatch({type: "REMOVE_FROM_CART", title})
  }

  return (
    <Container>
      <img src={image} alt={title} />
      <Info>
        <InfoText>
          <span className='title'>{title}</span>
          <p>
            <span className='dollar-sign'>$</span>
            <span className='price'>{price}</span>
          </p>
          <span className='stock'>In Stock</span>
        </InfoText>
        <RemoveButton>
          <button onClick={removeItem}>Remove from Cart</button>
        </RemoveButton>
      </Info>
    </Container>
  );
}

export default CartProduct

const Container = styled.div`
  display: flex;
  width: 1460px;
  height: 240px;
  padding: 12px;
  margin: 20px;
  border: 1px solid rgb(231, 231, 231);

  img {
    min-width: 250px;
    max-width: 250px;
    object-fit: contain;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 20px;

  .price {
    font-size: 28px;
    font-weight: 700;
  }

  .dollar-sign {
    vertical-align: 40%;
    font-weight: 700;
  }

`

const InfoText = styled.div`
  flex: 1;

  .title {
    font-size: 16px;
    font-weight: 500;
  }

  .stock {
    color: #007600;
    font-size: 14px;
  }
`;

const RemoveButton = styled(Button)`
  text-align: left;
  margin-bottom: 20px;
`