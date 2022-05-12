import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Metamask from "./metamask.svg";
import WalletConnect from "./walletconnect.svg";
import { useWallet } from "@binance-chain/bsc-use-wallet";

const Container = styled.div`
  height: 400px;
  width: 500px;
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 12px;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  opacity: 1;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 998;
  opacity: 0.6;
  overflow: hidden;
`;

const ProviderContainer = styled.div`
  height: 48%;
  width: 98%;
  border-radius: 12px;
  &:hover {
    background-color: #eeeeee;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProviderIcon = styled.img`
  width: 45px;
  padding: 10px 0px 10px 0px;
`;

const ProviderBrand = styled.span`
  color: black;
  font-weight: 600;
  font-size: 24px;
`;

const ProviderBrandDesc = styled.span`
  color: gray;
  font-weight: 400;
  font-size: 18px;
`;

const ConnectionModal = (props) => {
  const { showModal, toggleModal } = props;
  const wallet = useWallet();

  const connectProvider = async (provider) => {
    if (provider === "metamask") {
      wallet.connect();
      toggleModal()
    } else if (provider === "walletconnect") {
      wallet.connect("walletconnect");
      toggleModal()
    }
  };
  return (
    <>
      <Background
        style={showModal ? { display: "flex" } : { display: "none" }}
        onClick={toggleModal}
      />

      <Container style={showModal ? { display: "flex" } : { display: "none" }}>
        <ProviderContainer
          onClick={async () => await connectProvider("metamask")}
        >
          <ProviderIcon src={Metamask} />
          <ProviderBrand>MetaMask</ProviderBrand>
          <ProviderBrandDesc>Connect to your MetaMask wallet</ProviderBrandDesc>
        </ProviderContainer>
        <ProviderContainer onClick={() => connectProvider("walletconnect")}>
          <ProviderIcon src={WalletConnect} />
          <ProviderBrand>WalletConnect</ProviderBrand>
          <ProviderBrandDesc>
            Scan with WalletConnect to connect
          </ProviderBrandDesc>
        </ProviderContainer>
      </Container>
    </>
  );
};

export default ConnectionModal;
