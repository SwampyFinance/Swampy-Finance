import React, { useState, useEffect } from 'react'

import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { initWeb3Onboard, initNotify } from '../../services'

import BNLogo from "../../assets/icons/Swampy Finance LOGO-B1 1.svg"
import './Header.css'

let provider;

const Header = () => {

  const [{ wallet }, connect, disconnect ] = useConnectWallet();
  const [ {chains, connectedChain, settingChain}, setChain] = useSetChain();
  const connectedWallets = useWallets();

  const [web3Onboard, setWeb3Onboard] = useState(null)
  const [notify, setNotify] = useState(null)

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard)
    setNotify(initNotify())
  }, [])

  
  // useEffect(() => {
  //   if (!connectedWallets.length) return

  //   console.log(connectedWallets);

  //   const connectedWalletsLabelArray = connectedWallets.map(
  //     ({ label }) => label
  //   )
  //   window.localStorage.setItem(
  //     'connectedWallets',
  //     JSON.stringify(connectedWalletsLabelArray)
  //   )

  //   // Check for Magic Wallet user session
  //   if (connectedWalletsLabelArray.includes('Magic Wallet')) {
  //     const [magicWalletProvider] = connectedWallets.filter(
  //       provider => provider.label === 'Magic Wallet'
  //     )
  //     async function setMagicUser() {
  //       try {
  //         const { email } =
  //           await magicWalletProvider.instance.user.getMetadata()
  //         const magicUserEmail = localStorage.getItem('magicUserEmail')
  //         if (!magicUserEmail || magicUserEmail !== email)
  //           localStorage.setItem('magicUserEmail', email)
  //       } catch (err) {
  //         throw err
  //       }
  //     }
  //     setMagicUser()
  //   }
  // }, [connectedWallets, wallet])

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    }
  }, [wallet])

  // useEffect(() => {
  //   const previouslyConnectedWallets = JSON.parse(
  //     window.localStorage.getItem('connectedWallets')
  //   )

  //   if (previouslyConnectedWallets?.length) {
  //     async function setWalletFromLocalStorage() {
  //       await connect({ autoSelect: previouslyConnectedWallets[0] })
  //     }
  //     setWalletFromLocalStorage()
  //   }
  // }, [web3Onboard, connect])


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
