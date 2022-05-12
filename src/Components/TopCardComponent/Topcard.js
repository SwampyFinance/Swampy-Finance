import styled from "styled-components";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useState, useEffect } from "react";
import Topcardcontent from "./Topcardcontent";
import Reward from "./Reward";
import { getContract, getWeb3, getContractW3 } from "../../utils/getContract";
import BigNumber from "bignumber.js";

const CardContainer = styled.div`
  background: white;
  box-shadow: rgb(0 0 0 / 59%) 6px 6px 20px 6px;
  border-radius: 20px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fbf1e1;
  flex-direction: column;
  margin-bottom: 25px;

  @media (max-width: 600px) {
    width: 100%;
    padding: 5% 5%;
  }
`;

const FormInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const FormInputItem = styled.div`
  width: 360px;
  height: 53px;
  align-items: center;
  display: flex;
  text-align: right;
  background-color: rgb(255, 255, 255);
  justify-content: center;
  border: 1px solid rgb(85, 85, 85);
  border-radius: 10px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

const FormInputElement = styled.input`
  width: 250px;
  height: 50px;
  border: none;
  outline: none;
  text-align: right;
  margin-right: 10px;
  font-size: x-large;

  @media (max-width: 600px) {
    width: 80%;
    text-align: right;
    margin-left: 10px;
  }
`;

const FormInputSpan = styled.p`
  margin-right: 10px;
  font-size: x-large;

  @media (max-width: 600px) {
    width: 20%;
  }
`;

const FormButtonContainer = styled.div`
  font-size: x-large;
  cursor: pointer;
  color: white;
  border-radius: 6px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const FormButton = styled.button`
  width: 360px;
  height: 60px;
  font-size: large;
  cursor: pointer;
  border: 1px solid #f2b04f;
  background-color: #f2b04f;
  color: white;
  border-radius: 10px;
  margin-bottom: 0px;

  @media (max-width: 600px) {
    width: 100%;
  }

  &:hover {
    background-color: #ebc489;
    border-color: #ebc489;
  }

  &:disabled {
    background-color: #a0a0a0;
    border-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const Card = (props) => {
  const { getRefData } = props;
  const { account, ethereum } = useWallet();
  const [val, setVal] = useState(0);

  const changeVal = (e) => {
    setVal(e.target.value);
  };

  const onDeposit = async () => {
    const w3 = getWeb3();
    const contractz = getContractW3(ethereum);
    console.log(getRefData());
    const ref = w3.utils.isAddress(getRefData())
      ? getRefData()
      : "0x0000000000000000000000000000000000000000";
    console.log(`acc : ${account}`);
    await contractz.methods.createSwamp(ref).send({
      from: account,
      value: new BigNumber(val).times(new BigNumber(10).pow(18)),
    });
  };

  return (
    <CardContainer>
      <Topcardcontent />
      <FormInput>
        <FormInputItem>
          <FormInputElement
            type="number"
            name="amount"
            onChange={changeVal}
            value={val || 0}
          />
          <FormInputSpan>BNB</FormInputSpan>
        </FormInputItem>
      </FormInput>
      <FormButtonContainer>
        <FormButton onClick={onDeposit} disabled={!account}>
          BAKE BEANS
        </FormButton>
      </FormButtonContainer>

      <Reward refData={getRefData} />
    </CardContainer>
  );
};

export default Card;
