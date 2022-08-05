import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useStateValue } from "../context/StateProvider";
import { Popup } from "./Home";

interface Props {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  setPopups: Dispatch<SetStateAction<Popup[]>>;
}

function Product({ id, title, price, image, rating, setPopups }: Props) {
  const [ cart , dispatch] = useStateValue();
  const i = cart.cart.findIndex(
    (cartItem) => cartItem[0].id === id
  );
  let quantity = 0;
  if(i>=0){
    quantity = cart.cart[i][1];
  }
  

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: [{
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      }, 1 + quantity
    ],
    index: i
    });
    setPopups(prevState => [...prevState, {title, image, price}]);
    setTimeout(() => setPopups(prevState => prevState.slice(1)), 3000)
  };

  return (
    <Container>
      <ProductInfo>
        <h3>{title}</h3>

        <ProductRating>
          {Array(rating)
            .fill(null)
            .map((_, index) => (
              <p key={index}>★</p>
            ))}
        </ProductRating>

        <p>
          <small>$</small>
          <span>{price}</span>
        </p>
      </ProductInfo>

      <div className="productImage">
        <img src={image} alt={title} />
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
