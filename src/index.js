import ReactDOM from "react-dom/client";
import App from "./App";
import * as bsc from "@binance-chain/bsc-use-wallet";
import { getRpc } from "./utils/getRpc";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rpc = getRpc();
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
root.render(
  <bsc.UseWalletProvider
    chainId={56}
    connectors={{
      walletconnect: {
        rpcUrl: "https://bsc-dataseed.binance.org/",
      },
      bsc,
    }}
  >
    <App />
  </bsc.UseWalletProvider>
);
