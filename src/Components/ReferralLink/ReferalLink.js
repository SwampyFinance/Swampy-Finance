import { useState } from "react";
import styled from "styled-components";

const CardContent = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 59%) 6px 6px 20px 6px;
  border-radius: 20px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fbf1e1;
  flex-direction: column;
  margin-bottom: 25px;
`;

const CardTitle = styled.h2`
  width: 100%;
  margin: 0px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.334;
  color: rgb(23, 33, 94);
  padding-bottom: 8px;
  justify-content: center;
`;

const CardInputContainer = styled.div`
  width: 360px;
  height: 53px;
  align-items: center;
  display: flex;
  text-align: right;
  background-color: rgb(255, 255, 255);
  justify-content: center;
  border: 1px solid rgb(85, 85, 85);
  border-radius: 10px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CardInput = styled.input`
  width: 340px;
  height: 50px;
  border: 0px;
  outline: none;
  text-align: center;
  font-size: x-large;
  @media (max-width: 600px) {
    width: 96%;
  }
`;

const CardDescription = styled.h2`
  margin-bottom: 5px;
  font-size: small;
  text-align: center;
`;

const ReferalLink = (props) => {
  const changeRef = (e) => {
    const { setRef } = props;
    setRef(e.target.value);
  };
  console.log(props);
  const { setRef, refData } = props;
  return (
    <CardContent>
      <CardTitle>Referral</CardTitle>
      <CardInputContainer>
        <CardInput
          onChange={changeRef}
          value={refData}
          type="text"
          placeholder="Please enter the wallet address."
        />
      </CardInputContainer>
      <CardDescription>
        Earn 12% of the BNB used to bake beans from anyone who uses your
        referral.
      </CardDescription>
    </CardContent>
  );
};

export default ReferalLink;
