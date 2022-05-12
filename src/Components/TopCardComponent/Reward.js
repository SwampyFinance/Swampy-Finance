import styled from "styled-components";
import { getContractW3, getWeb3 } from "../../utils/getContract";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useState, useEffect } from "react";
import { getBalanceNumber } from "../../utils/formatBalance";
import BigNumber from "bignumber.js";

const Wrapper = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Seperator = styled.div`
  width: 100%;
  height: 30px;
  color: #dcd4c6;
  margin-top: -10px;

  border-bottom: 2px solid #dcd4c6;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
  width: 100%;
  margin-top: 24px;
  font-weight: bolder;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CardText = styled.div`
  padding-bottom: 10px;
  margin-bottom: 15px;
  font-size: x-large;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 170px;
  height: 53px;
  font-size: large;
  cursor: pointer;
  border: 1px solid #f2b04f;
  background-color: #f2b04f;
  color: white;
  border-radius: 6px;

  @media (max-width: 600px) {
    width: 47%;
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

const Reward = (props) => {
  const { refData } = props;
  const { account, ethereum } = useWallet();
  const [userRewards, setUserRewards] = useState(0);
  const [withdrawTime, setWithdrawTime] = useState(0);

  const reBake = async () => {
    const w3 = getWeb3();
    const contract = getContractW3(ethereum);

    const ref = w3.utils.isAddress(refData())
      ? refData()
      : "0x0000000000000000000000000000000000000000";
    console.log(`REF : ${ref}`);
    if (account) {
      await contract.methods.hireLandlord(ref).send({ from: account });
    }
  };

  const eatBeans = async () => {
    const contract = getContractW3(ethereum);
    if (account) {
      await contract.methods.collectRent().send({ from: account });
    }
  };

  const calculateUserRewards = async () => {
    const contract = getContractW3(ethereum);
    if (account) {
      const userEggs = await contract.methods.getMyEggs(account).call();
      const userEggAsBnb = await contract.methods
        .calculateEggSell(userEggs.toString())
        .call();
      setUserRewards(getBalanceNumber(userEggAsBnb));
    }
  };

  const calculateWithdrawTime = async () => {
    const contract = getContractW3(ethereum);
    if (account) {
      const stakeTime = await contract.methods.EGGS_TO_HATCH_1MINERS().call();
      const lastCompound = await contract.methods
        .getEggsSinceLastHatch(account)
        .call();
      const getMiners = await contract.methods
        .getMyMiners(account)
        .call()
        .then(new BigNumber());
      const secondsPassed = lastCompound !== 0 ? lastCompound / getMiners : 0;
      const timeLeftInSeconds = stakeTime - secondsPassed;
      const timeLeftInDate = new Date(timeLeftInSeconds * 1000)
        .toISOString()
        .substr(11, 8);
      setWithdrawTime(timeLeftInDate);
    }
  };

  useEffect(() => {
    let isSyncing = false;
    setInterval(async () => {
      try {
        if (!isSyncing) {
          isSyncing = true;
          await calculateWithdrawTime();
          console.log("timeleft");
          isSyncing = false;
        }
      } catch (ex) {
        console.error(ex.message);
        isSyncing = false;
      }
    }, 3000);
  }, [account]);

  useEffect(() => {
    let isSyncing = false;
    setInterval(async () => {
      try {
        if (!isSyncing) {
          isSyncing = true;
          await calculateUserRewards();
          await calculateWithdrawTime();
          console.log("rewards");
          isSyncing = false;
        }
      } catch (ex) {
        console.error(ex.message);
        isSyncing = false;
      }
    }, 3000);
  }, [account]);

  return (
    <Wrapper>
      <Seperator />
      <CardContent>
        <div>
          <CardText>Time Left</CardText>
        </div>
        <div>
          <CardText>{withdrawTime}</CardText>
        </div>
      </CardContent>
      <CardContent>
        <div>
          <CardText>Your Rewards</CardText>
        </div>
        <div>
          <CardText>{`${userRewards.toFixed(9)} BNB`}</CardText>
        </div>
      </CardContent>
      <ButtonContainer>
        <Button onClick={reBake} disabled={!account}>
          RE-BAKE
        </Button>
        <Button onClick={eatBeans} disabled={!account}>
          EAT BEANS
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Reward;
