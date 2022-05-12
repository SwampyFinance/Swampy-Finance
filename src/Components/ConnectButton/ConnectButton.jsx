import React, { useState } from "react";
import styled from "styled-components";
import { useWallet } from "@binance-chain/bsc-use-wallet";

const Btn = styled.div`
  background-color: rgb(244, 181, 45);
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: rgb(23, 33, 94);
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 59%) 6px 6px 20px 6px;
  padding: 10px 20px 10px 20px;
  &:hover {
    background-color: #ebc489;
    border-color: #ebc489;
  }

  &:active {
    background-color: #ebc489;
    border-color: #ebc489;
  }

  @media (min-width: 768px) {
    position: absolute;
    top: 75px;
    right: 50px;
    margin: 0px 0px 0px 0px;
  }
`;

const ConnectButton = (props) => {
  const account = useWallet();

  const showButton = () => {
    props.toggleModal();
  };
  return (
    <Btn onClick={showButton}>
      {account.status === "connected" ? "Disconnect" : "Connect"}
    </Btn>
  );
};

export default ConnectButton;
