import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
        alt="Amazon Logo"
      />
      <FormWrapper>
        <h1>Create account</h1>
        <form action="">
          <div>
            <label>Your name</label>
            <input type="text" />
          </div>
          <div>
            <label>Mobile number or email</label>
            <input type="text" />
          </div>
          <div>
            <label>Password</label>
            <input type="text" />
          </div>
          <button>Sign Up</button>
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
