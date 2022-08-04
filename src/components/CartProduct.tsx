import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../context/StateProvider';
import {Button} from './Product';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Props {
  id: string,
  title: string,
  price: number,
  image: string,
  quantity: number,
  hideButton?: boolean
  hideBorder?: boolean
  hideStock?: boolean
  disableQuantity?: boolean
}

interface ContainerProps {
  hideBorder?: boolean
}


function CartProduct({id, title, price, image, quantity, hideButton, hideBorder, hideStock, disableQuantity}: Props) {
  const [ { cart } , dispatch] = useStateValue();

  function removeItem() {
    dispatch({type: "REMOVE_FROM_CART", id})
  }

  function handleQuantityChange(e: SelectChangeEvent<number>){
    dispatch({type: "UPDATE_QUANTITY", quantity: +e.target.value, id });
  }

  return (
    <Container hideBorder={hideBorder}>
      <img src={image} alt={title} />
      <Info>
        <InfoText>
          <span className="title">{title}</span>
          <p>
            <span className="dollar-sign">$</span>
            <span className="price">{price.toFixed(2)}</span>
          </p>
          {!hideStock && <span className="stock">In Stock</span>}
        </InfoText>
        <ButtonWrapper>
          {disableQuantity ? (
            <span>Quantity: {quantity}</span>
          ) : (
            <>
              <InputLabel id="quantity-select" />
              <Select
                className='quantity'
                labelId="quantity-select"
                id="quantity"
                defaultValue={quantity}
                onChange={handleQuantityChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </>
          )}
          {!hideButton && (
            <RemoveButton>
              <button onClick={removeItem}>Remove from Cart</button>
            </RemoveButton>
          )}
        </ButtonWrapper>
      </Info>
    </Container>
  );
}

export default CartProduct

const Container = styled.div<ContainerProps>`
  display: flex;
  width: auto;
  height: 240px;
  padding: 12px;
  margin: 20px;
  border: ${(props) => props.hideBorder ? "none" : "1px solid rgb(231, 231, 231)"} ;

  img {
    max-width: 250px;
    width: 28vw;
    object-fit: contain;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 20px;

  .price {
    font-size: min(calc(1em + 1vw), 28px);
    font-weight: 700;
  }

  .dollar-sign {
    vertical-align: 40%;
    font-weight: 700;
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  .title {
    display: inline-block;
    font-size: min(calc(0.4em + 1vw), 16px);
    font-weight: 500;
    max-height: 100px;
    overflow: clip;
  }

  .stock {
    color: #007600;
    font-size: min(calc(0.5em + 1vw), 14px);
    font-weight: 500;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  .quantity {
    height: 40px;
    max-width: 70px;
    margin-right: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;

    .quantity {
      margin-right: 10px;
    }
  }
`;

const RemoveButton = styled(Button)`
  text-align: left;
  margin-bottom: 20px;

  button {
    font-size: min(calc(0.4em + 1vw), 16px);
  }

  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;