import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useConnectWallet, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { initWeb3Onboard, initNotify } from '../../services'
import { contractAddress, contractAbi } from '../../contracts'
import { useDispatch } from 'react-redux'
import { headerActions } from '../../actions'
import swal from 'sweetalert';

import BNLogo from "../../assets/icons/Swampy Finance LOGO-B1 1.svg"
import './Header.css'

let provider;

const Header = () => {
  const {methodCallType, bnbAmount} = useSelector((state) => state.rootReducer.header_reducer);
  const [{ wallet }, connect, disconnect ] = useConnectWallet();
  const [currentAccount, setCurrentAccount] = useState('');
  const [swampyContract, setSwampyContract] = useState();
  const [web3Onboard, setWeb3Onboard] = useState(null)
  const [notify, setNotify] = useState(null)
  const connectedWallets = useWallets();
  const dispatch = useDispatch();

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard)
    setNotify(initNotify())
  }, [])

  useEffect(() => {
    if(methodCallType != 0 && currentAccount == ''){
      swal("Warning!", "Please connect wallet.", "warning");
      setTimeout(()=>{
        dispatch(headerActions.headerUpdateTrigger(0));
      })
      return;
    } else if(methodCallType == 1 && bnbAmount == 0){
      swal("Warning!", "Please set deposit bnb amount.", "warning");
      setTimeout(()=>{
        dispatch(headerActions.headerUpdateTrigger(0));
      })
      return;
    }
    console.log(swampyContract);
    console.log(bnbAmount);
    
    switch(parseInt(methodCallType))
    {
      case 1: // Create Swamp 
        let overrides = {
          value: ethers.utils.parseEther(bnbAmount)
        };
        try{
          swampyContract.createSwamp(currentAccount, overrides)
          .then(res=>{
            console.log(res);
            console.log("Success Call Create Swamp");
            // swal("Success!", "Create Swamp Successed", "success");
          }).catch(err=>{
            switch(parseInt(err.code))
            {
              case 4001:
                swal("Cancelled!", "User denied transaction signature.", "warning");  
                break;
              case -32603:
                swal("Cancelled!", err.data.message, "warning");
                break;
            }
            console.log("Some error occured during call Create Swamp contract method: ", err);
          })
        } catch(err) {
          console.log("Some error occured in contract:", err);
        }
        break;
      case 2: // Hire Landlords
        try{
          swampyContract.hireLandlord(currentAccount)
          .then(res=>{
            console.log(res);
            // swal("Success!", "Hire Landlords Successed", "success");
          }).catch(err=>{
            if(err.code == "4001")
              swal("Cancelled!", "User denied transaction signature.", "warning");
            console.log("Some error occured during call Hire Landlords contract method: ", err);
          })
        } catch(err) {
          console.log("Some error occured in contract:", err);
        }
        break;
      case 3: // Collect Rent
        try{
          swampyContract.collectRent()
          .then(res=>{
            console.log(res);
            // swal("Success!", "Collect Rent Successed", "success");
          }).catch(err=>{
            if(err.code == "4001")
              swal("Cancelled!", "User denied transaction signature.", "warning");
            console.log("Some error occured during call Collect Rent contract method: ", err);
          })
        } catch(err) {
          console.log("Some error occured in contract:", err);
        }
        break;
    }
    setTimeout(()=>{
      dispatch(headerActions.headerUpdateTrigger(0));
    })
  }, [methodCallType]);

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )

  }, [connectedWallets, wallet])

  useEffect(() => {
    try{
      setCurrentAccount(wallet.accounts[0].address)
    } catch {
      setCurrentAccount('');
    }
    if (!wallet?.provider) {
      provider = null
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, 'any');

      const swampyContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider.getUncheckedSigner()
      );
      setSwampyContract(swampyContract);
    }
  }, [wallet]);

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({ autoSelect: previouslyConnectedWallets[0] })
      }
      setWalletFromLocalStorage()
    }
  }, [web3Onboard, connect])

  return (
    <header className="header-container">
      <div className="header-logo">
        <a
          className="bn-logo-link"
          href="https://www.blocknative.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Blocknative Site"
        >
          <img className="bn-logo-demo" src={BNLogo} alt="Block Native Logo" />
        </a>
        <div className="bn-logo-context">
          <div className="bg-context">Swampy Financial</div>
          <div className="sm-context">Redefining Finance, One swamp at a time</div>
        </div>
      </div>

      {/* Wallet Connect Section */}
      <div className="header-connect">
        {!wallet && (
          <button
            className="bn-demo-button"
            onClick={() => {
              connect()
            }}
          >
            Connect
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
