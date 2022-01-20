import React from "react";

import WalletInfo from "./components/WalletInfo/WalletInfo";
import SwapEth from "./components/SwapEth/SwapEth";
import SwapUSDC from "./components/SwapUSDC/SwapUSDC";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const swapEthHandler = () => {};
  const swapUSDCHandler = () => {};
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <WalletInfo />
        <SwapEth onSwap={swapEthHandler} />
        <SwapUSDC onSwap={swapUSDCHandler} />
      </main>
    </React.Fragment>
  );
}

export default App;
