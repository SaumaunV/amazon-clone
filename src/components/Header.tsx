import React, { useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { getQuantityTotal } from "../context/reducer";

function Header() {
  const [{cart, user}, dispatch] = useStateValue();

  function handleAuthentication() {
    if(user){
      signOut(auth);
    }
  }

  useEffect(() => {
    localStorage.setItem(`cart-${user?.email}`, JSON.stringify(cart));
  }, [cart]);

  return (
    <Container>
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </Link>

      <Input>
        <form>
          <input id="search" type="text" />
          <button type="submit">
            <SearchIcon className="searchIcon" />
          </button>
        </form>
      </Input>

      <RightMenu>
        <Link to={user ? "/" : "../login"} style={{ textDecoration: "none" }}>
          <div className="main" onClick={handleAuthentication}>
            <span className="first">
              Hello, {user ? user.email!.split("@")[0]! : "Sign in"}{" "}
            </span>
            <span className="second">Account & Lists</span>
          </div>
        </Link>
        <Link to="../orders" style={{ textDecoration: "none" }}>
          <div className="main orders">
            <span className="first">Returns</span>
            <span className="second">& Orders</span>
          </div>
        </Link>

        <Link to="../cart" style={{ textDecoration: "none" }}>
          <div className="main cart">
            <ShoppingCartIcon className="cart-icon" />
            <div className="cart-text">
              <span className="cart-number">{getQuantityTotal(cart)}</span>
              <span className="second">Cart</span>
            </div>
          </div>
        </Link>
      </RightMenu>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #131921;
  height: 60px;

  img {
    width: clamp(60px, 10vw, 100px);
    height: 36px;
    object-fit: contain;
    margin: 0 20px;
    margin-top: 12px;
  }
`;

const Input = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;

  form {
    display: flex;
    flex: 1;
  }

  &:focus-within {
    box-shadow: 0 0 0 2px #f90, 0 0 0 3px rgb(255 153 0 / 50%);
  }

  input,
  button {
    height: 40px;
    height: clamp(30px, 5vw, 40px);
    border: none;
    vertical-align: bottom;
  }

  input {
    flex: 1;
    outline: none;
    text-indent: 8px;
    font-size: 15px;
    padding-bottom: 3px;
    @media (max-width: 550px) {
      width: 20vw;
    }
    @media (max-width: 400px) {
      width: 10vw;
    }
  }

  button {
    flex: 1;
    max-width: min(45px, 5vw);
    background-color: #febd69;
    cursor: pointer;
  }

  .searchIcon {
    @media (max-width: 400px) {
      width: 5vw;
    }
  }
`;

const RightMenu = styled.div`
  display: flex;
  color: white;
  text-align: left;
  margin: 0 10px;

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;

    padding: 0 min(13px, 0.5vw);
    margin: 0 2px;
    height: 50px;
    margin-bottom: 3px;

    border-radius: 1px;
  }

  .main:hover {
    box-shadow: 0 0 0 1px white;
    cursor: pointer;
  }

  span {
    font-size: 12px;
  }

  /* .orders {
    display: none;
  } */

  .cart {
    flex-direction: row;
    text-align: center;
    display: flex;
    align-items: end;
    padding-left: 10px;
    @media (max-width: 800px) {
      align-items: center;
    }
  }

  .cart > div {
    display: flex;
    flex-direction: column;
  }

  .first {
    font-size: min(calc(0.3em + 1vw), 12px);
    line-height: 12px;
    padding-left: 1px;
  }

  .second {
    line-height: 15px;
    font-size: min(calc(0.3em + 1vw), 14px);
    font-weight: bold;
  }

  .cart-number {
    font-size: min(calc(0.5em + 1vw), 16px);
    font-weight: bold;
    color: #f08804;
  }

  .cart-text > .second {
    padding-bottom: 9px;
  }

  .cart-icon {
    padding-bottom: 7px;
    height: clamp(30px, 5vw, 40px);
    width: clamp(30px, 5vw, 40px);
  }
`;
