import React from 'react'
import styled from 'styled-components';

interface Props {
    title: string,
    image: string,
    price: number
}

function Popup({ title, image, price }: Props) {
  return (
    <Container>
      <h3>Added to Cart:</h3>
      <ProductWrapper>
        <img src={image} alt="Cart Popup" />
        <InfoWrapper>
          <div className='title' title={title}>{title}</div>
          <div>${price}</div>
        </InfoWrapper>
      </ProductWrapper>
    </Container>
  );
}

export default Popup

const Container = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  font-weight: 500;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border: 1px solid lightgray;

  h3 {
    color: #d8511f;
    font-size: min(calc(0.5em + 1vw), 22px);
  }

  img {
    max-height: 75px;
    width: 5vw;
    object-fit: contain;
  }
`;
const ProductWrapper = styled.div`
  display: flex;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20vw;
  padding: 10px;
  font-size: min(calc(0.4em + 1vw), 16px);

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    width: 30vw;
  }
`;

