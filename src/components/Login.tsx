import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

function Login() {
  const [{ email, password }, setAccount] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  function handleSignin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  }

  function createAccount(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <Container>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
        alt="Amazon Logo"
      />
      <FormWrapper>
        <h1>Create account</h1>
        <form>
          <div>
            <label>Email</label>
            <input
              type="text"
              onChange={(e) =>
                setAccount({ email: e.target.value, password })
              }
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setAccount({ email, password: e.target.value })}
            />
          </div>
          <button onClick={handleSignin}>Sign In</button>
          <button className="create-account" onClick={createAccount}>Create Your Amazon Account</button>
        </form>
      </FormWrapper>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  img {
    margin: 20px 0;
    width: 110px;
  }
`;

const FormWrapper = styled.div`
  width: 350px;
  margin: 0 auto;
  padding: 10px 19px;
  border: 1px solid lightgray;
  border-radius: 4px;

  button {
    margin: 10px 0;
    height: 29px;
    background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
    border-width: 1px;
    border-radius: 3px;
    border-color: #a88734 #9c7e31 #846a29;
    cursor: pointer;

    &:hover {
      background: linear-gradient(to bottom, #f3d796, #f0bf43);
      border-color: #a88734 #9c7e31 #846a29;
    }
  }

  .create-account {
    margin: 10px 0;
    height: 29px;
    background: linear-gradient(to bottom, #eff1f5, #e7e9ec);
    border-width: 1px;
    border-radius: 3px;
    border-color: #adb1b8 #a2a6ac #8d9096;
    cursor: pointer;

    &:hover {
      background: linear-gradient(to bottom, #e2e3e7, #e3e5e9);
      border-color: #adb1b8 #a2a6ac #8d9096;
    }
  }

  div {
    margin: 10px 0;
  }

  input {
    height: 31px;
    padding-left: 5px;
  }

  input,
  div,
  button {
    width: 312px;
  }

  label {
    display: block;
    font-weight: 600;
    padding-bottom: 2px;
    font-size: 14px;
  }

  h1 {
    font-weight: 500;
  }

  h1,
  label {
    text-align: left;
  }
`;
