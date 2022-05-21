import React, { useState } from 'react'
import VConsole from 'vconsole'
import Header from './views/Header/Header.js'
import Footer from './views/Footer/Footer.js'

import ShowPanel from './components/ShowPanel/ShowPanel.js'
import ActionPanel from './components/ActionPanel/ActionPanel.js'
import Context from './components/Context/Context.js'
import './App.css'

if (window.innerWidth < 700) {
  new VConsole()
}

const App = () => {

  return (
    <main>
      <Header />
      <section className="main">
        <div className="main-content">
          {/* Information container */}
          <div className="container inform-context">
            <ul>
              <li>Up to 8% daily rewards</li>
              <li>Hybrid Tax Penalty for not compounding*</li>
              <li>Lower Inflation Rates</li>
              <li>Low 5% Dev Fee</li>
              <li>1.25% Referral Bonus</li>
            </ul>
            <div className='italic'>
              *Hybrid Tax Penalty starts at 77% and reduces by 6% every time a user compounds to a minimum of 5%. This is to prevent users from continously selling which drains the contract balance.
            </div>
            <div>
              Swampy Hotel is a miner dapp where users invest a non-refundable deposit and earn an up to 8% daily return on investment. We have implemented many changes in order to increase the sustainability of our project and recommend you read our whitepaper at https://docs.swampyfinance.site before making any investments. This is a HIGH RISK project so please ascertain your risk tolerance before depositing any money. Links to our Telegram, Discord, and Contract can be found below. 
            </div>
          </div>

          {/* functional container */}
          <div className="container main-board">
            <div className="values-container">
              <ShowPanel
                number="1.2K"
                description="Contract Balance:"
              ></ShowPanel>
              <ShowPanel
                number="1.2K"
                description="Your Wallet:"
              ></ShowPanel>
              <ShowPanel
                number="1.2K"
                description="Total Tenants:"
              ></ShowPanel>
              <ShowPanel
                number="1.2K"
                description="Your Rewards:"
              ></ShowPanel>
            </div>

            <div className="values-container" style={{marginTop: '30px', padding: '0px 20px'}}>
              <ActionPanel
                title="Deposit BNB:"
                actiontitle="Create Swamp"
                actionType="1"
              ></ActionPanel>
              <ActionPanel
                title="Compound Tenants:"
                actiontitle="Hire Landlords"
                actionType="2"
              ></ActionPanel>
              <ActionPanel
                title="Sell Rewards:"
                actiontitle="Collect Rent"
                actionType="3"
              ></ActionPanel>
            </div>

            {/* <div className="values-container" style={{marginTop: '30px'}}>
              <InputPanel
                placeholder="0.5"
                title="Create Swamp:"
                description="(BUY)"
              ></InputPanel>
              <InputPanel
                placeholder="0.5"
                title="Hire Landlords:"
                description="(Compound)"
              ></InputPanel>
              <InputPanel
                placeholder="0.5"
                title="Collect Rent:"
                description="(Sell)"
              ></InputPanel>
            </div> */}

            <div style={{marginTop: '20px'}}></div>
            <Context
              title="Time before next tax deduction: [Place timer here]"
              description="Compounding when the timer reaches 0 will result in a 6% tax deduction."
            ></Context>
            <div style={{marginTop: '20px'}}></div>
            <Context
              title="Current Tax Penalty: [Place % here]"
              description="The minimum tax a user can pay is 5% with a total of 12 compounds. This penalty will reset each time a user collects rent from their tenants."
            ></Context>
            <div style={{marginTop: '20px'}}></div>
            <Context
              title="Rent Collected: [Place BNB sold here]"
              description="The total amount of rent money you’ve accumulated from the dapp. Only collected rewards add to the counter"
            ></Context>
            <div style={{marginTop: '20px'}}></div>
            <Context
              title="Referral Rewards: [Place Referral BNB here]"
              description="The total amount you’ve received from referrals"
            ></Context>

            <div className="Referral">
              <div>Enter Referral Here: </div>
              <input></input>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default App;