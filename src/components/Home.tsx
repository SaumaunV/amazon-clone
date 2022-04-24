import React from 'react'
import styled from 'styled-components'

function Home() {
  return (
    <Container>
      <img
        src="https://m.media-amazon.com/images/I/716kWBue3fL._SX3000_.jpg"
        alt="Home page"
      />
    </Container>
  );
}

export default Home

const Container = styled.div`
  height: 100vh;
  background-color: #eaeded;

  img {
    height: 600px;
    margin-bottom: -150px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
`;