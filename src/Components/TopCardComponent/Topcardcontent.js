import { useState, useEffect } from "react";
import styled from "styled-components";
import { getContractW3, getWeb3 } from "../../utils/getContract";
import BigNumber from "bignumber.js";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { getBalanceNumber, getBeans } from "../../utils/formatBalance";

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
  width: 100%;
  margin-top: 24px;
  @media (max-width: 600px) {
    width: 80%;
  }
`;

const CardText = styled.div`
  padding-bottom: 10px;
  margin-bottom: 24px;
  font-size: x-large;
`;

const Cardcontent = (props) => {
  const { account, ethereum } = useWallet();
  const [contractBalance, setContractBalance] = useState(new BigNumber(0));
  const [userBNB, setuserBNB] = useState(new BigNumber(0));
  const [userBalance, setUserBalance] = useState(new BigNumber(0));

  const fetchUserBeans = async () => {
    if (account) {
      const contract = getContractW3(ethereum);
      const beans = await contract.methods.getMyEggs(account).call();
      setUserBalance(new BigNumber(beans));
    }
  };
  const fetchContractBalance = async () => {
    const contract = getContractW3(ethereum);
    const balanceRequest = await contract.methods.getBalance().call();
    setContractBalance(new BigNumber(balanceRequest));
  };

  const fetchUserBalance = async () => {
    const contract = getContractW3(ethereum);
    const w3 = getWeb3(ethereum);
    if (account && w3.utils.isAddress(account)) {
      const balance = await w3.eth.getBalance(account);
      setuserBNB(new BigNumber(balance));
    }
  };

  useEffect(() => {
    let isSyncing = false;
    setInterval(async () => {
      try {
        if (!isSyncing) {
          isSyncing = true;
          await fetchContractBalance();
          console.log("contract");
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
          await fetchUserBalance();
          console.log("BNB");
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
          await fetchUserBeans();
          console.log("Beans");
          isSyncing = false;
        }
      } catch (ex) {
        console.error(ex.message);
        isSyncing = false;
      }
    }, 3000);
  }, [account]);

  /*  useEffect(() => {
    const aa = () => {
      if (account) {
        setUserBalance(0), setuserBNB(0), setContractBalance(0);
        console.log("if");
      }
    };
    aa();
  },[userBalance, userBNB, contractBalance]);
*/

  return (
    <CardContainer>
      <div>
        <CardText>Contract</CardText>
        <CardText>Wallet</CardText>
        <CardText>Your Beans</CardText>
      </div>
      <div>
        <CardText>{`${getBalanceNumber(contractBalance).toFixed(
          5
        )} BNB`}</CardText>
        <CardText>{`${getBalanceNumber(userBNB).toFixed(9)} BNB`}</CardText>
        <CardText>{`${getBeans(userBalance)} Beans`}</CardText>
      </div>
    </CardContainer>
  );
};

export default Cardcontent;
