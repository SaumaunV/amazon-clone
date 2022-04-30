import React from 'react'
import styled from 'styled-components'

interface Props {
    title: string,
    price: number,
    image: string,
    rating: number  
}

function Product(props: Props) {
  return (
    <Container>
      <h3>{props.title}</h3>

      <ProductRating>
        {Array(props.rating)
          .fill(null)
          .map((_, index) => (
            <p key={index}>★</p>
          ))}
      </ProductRating>

      <p>
        <small>$</small>
        <span>{props.price}</span>
      </p>

      <div className="productImage">
        <img src={props.image} alt={props.title} />
      </div>

      <Button>
        <button>Add to Cart</button>
      </Button>
    </Container>
  );
}

export default Product

const Container = styled.div`
  height: 450px;
  width: 700px;
  background-color: white;
  padding: 20px;
  text-align: left;
  z-index: 1;

  .productImage {
    text-align: center;
  }

  img {
    height: 200px;
  }

  p {
    font-size: 20px;
  }

  small {
    vertical-align: text-top;
  }
`;

const ProductRating = styled.div`
  display: flex;

  p {
    color: gold;
  }
`

export const Button = styled.div`
  margin-top: 30px;
  text-align: center;

  button {
    height: 30px;
    width: 200px;
    border-radius: 20px;
    border: none;
    background-color: rgb(255, 216, 20);
    border: 1px solid rgb(252, 210, 0);
    cursor: pointer;

    &:hover {
      background-color: #f7ca00;
      border-color: #f2c200;
    }
  }
`