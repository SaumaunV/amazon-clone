import React from "react";
import styled from "styled-components";
import { useStateValue } from "../context/StateProvider";

interface Props {
  title: string;
  price: number;
  image: string;
  rating: number;
}

function Product(props: Props) {
  const [ _ , dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        title: props.title,
        price: props.price,
        image: props.image,
        rating: props.rating,
      },
    });
  };

  return (
    <Container>
      <ProductInfo>
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
      </ProductInfo>

      <div className="productImage">
        <img src={props.image} alt={props.title} />
      </div>

      <Button>
        <button onClick={addToCart}>Add to Cart</button>
      </Button>
    </Container>
  );
}

export default Product;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 600px;
  width: 40vw;
  background-color: white;
  padding: 20px;
  text-align: left;
  z-index: 1;

  h3 {
    font-size: min(calc(0.5em + 1vw), 20px);
  }

  .productImage {
    text-align: center;
  }

  img {
    max-height: 200px;
    width: 30vw;
    max-width: 300px;
    object-fit: contain;
  }

  p {
    font-size: min(calc(0.5em + 1vw), 20px);
  }

  small {
    vertical-align: text-top;
  }
`;

const ProductInfo = styled.div`
`

const ProductRating = styled.div`
  display: flex;

  p {
    color: gold;
  }
`;

export const Button = styled.div`
  margin-top: 30px;
  text-align: center;

  button {
    height: clamp(20px, 5vw, 30px);
    width: clamp(100px, 30vw, 200px);
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
`;
