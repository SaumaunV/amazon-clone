import React from 'react'
import styled from 'styled-components'
import Product from './Product';

function Home() {
  return (
    <Container>
      <img
        className="homeImage"
        src="https://m.media-amazon.com/images/I/716kWBue3fL._SX3000_.jpg"
        alt="Home page"
      />

      <ProductWrapper>
        <Product
          title="All-new Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal"
          price={29.99}
          image="https://images-na.ssl-images-amazon.com/images/I/714Rq4k05UL._AC_SL1000_.jpg"
          rating={5}
        />
        <Product
          title="LG 27GL83A-B 27 Inch Ultragear QHD IPS 1ms NVIDIA G-SYNC Compatible Gaming Monitor, Black"
          price={379.99}
          image="https://images-na.ssl-images-amazon.com/images/I/91lS5yEDH-L._AC_SL1500_.jpg"
          rating={5}
        />
        <Product
          title="Bose QuietComfort 35 II Wireless Bluetooth Headphones, Noise-Cancelling, with Alexa Voice Control -Silver"
          price={269.0}
          image="https://images-na.ssl-images-amazon.com/images/I/71%2BiQZU-dVL._AC_SL1500_.jpg"
          rating={5}
        />
        <Product
          title="TP-Link AC1750 Smart WiFi Router (Archer A7) - Dual Band Gigabit Wireless Internet Router for Home, Works with Alexa, VPN Server, Parental Control and QoS"
          price={56.99}
          image="https://images-na.ssl-images-amazon.com/images/I/51R2a9p-vNL._AC_SL1000_.jpg"
          rating={5}
        />
        <Product
          title="eufy by Anker, BoostIQ RoboVac 11S (Slim), Robot Vacuum Cleaner, Super-Thin, 1300Pa Strong Suction, Quiet, Self-Charging Robotic Vacuum Cleaner, Cleans Hard Floors to Medium-Pile Carpets"
          price={149.99}
          image="https://m.media-amazon.com/images/I/71TmTj7HjNL._AC_SY450_.jpg"
          rating={5}
        />
        <Product
          title="Sabrent 4-Port USB 2.0 Hub with Individual LED lit Power Switches (HB-UMLS)"
          price={7.99}
          image="https://images-na.ssl-images-amazon.com/images/I/71igbmDJwDL._AC_SL1500_.jpg"
          rating={5}
        />
      </ProductWrapper>
    </Container>
  );
}

export default Home

const Container = styled.div`
  height: 100%;
  background-color: #eaeded;

  .homeImage {
    height: 600px;
    z-index: -1;
    margin-bottom: -150px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  column-gap: 40px;
  row-gap: 40px;
  padding-bottom: 40px;
`