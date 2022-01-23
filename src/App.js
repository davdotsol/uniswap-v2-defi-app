import React, { useState, useEffect } from "react";

import Web3 from "web3";
import Dex from "./abis/Dex.json";
import ERC20Mock from "./abis/ERC20Mock.json";

import WalletInfo from "./components/WalletInfo/WalletInfo";
import SwapEth from "./components/SwapEth/SwapEth";
import SwapUSDC from "./components/SwapUSDC/SwapUSDC";
import MainHeader from "./components/MainHeader/MainHeader";

const USDC_MAINNET = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDC_DECIMALS = 6;

function App() {
  const [web3, setWeb3] = useState("");
  const [ethBalance, setEthBalance] = useState(1);
  const [tokenBalance, setTokenBalance] = useState(1000000000);
  const [investor, setInvestor] = useState(1000000000);
  const [tokenContract, setTokenContract] = useState({});
  const [dexContract, setDexContract] = useState({});
  const [ethAmount, setEthAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      await loadWeb3();
    };
    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      await loadBlockchainData();
    };
    load();
  }, [web3]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      try {
        const _web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWeb3(_web3);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please Install MetaMask");
    }
  };

  const loadBlockchainData = async () => {
    if (web3) {
      const [investor] = await web3.eth.getAccounts();
      setInvestor(investor);
      const balance = await web3.eth.getBalance(investor);
      setEthBalance(web3.utils.fromWei(balance, "ether"));
      const _tokenContract = new web3.eth.Contract(ERC20Mock.abi, USDC_MAINNET);
      setTokenContract(_tokenContract);
      let _tokenBalance = await _tokenContract.methods
        .balanceOf(investor)
        .call();
      setTokenBalance(_tokenBalance / Math.pow(10, USDC_DECIMALS));
      const networkId = await web3.eth.net.getId();
      const dexData = Dex.networks[networkId];
      if (dexData) {
        const _dexContract = new web3.eth.Contract(Dex.abi, dexData.address);
        setDexContract(_dexContract);
      } else {
        window.alert("Dex contract not deployed to detected network");
      }
    }
  };

  const swapEthHandler = async () => {
    if (dexContract) {
      await dexContract.methods
        .swapEthForUSDC(web3.utils.toWei(ethAmount, "ether"))
        .send({
          value: web3.utils.toWei(ethAmount, "ether"),
          from: investor,
        });

      const balance = await web3.eth.getBalance(investor);
      const _tokenBalance = await tokenContract.methods
        .balanceOf(investor)
        .call();
      setTokenBalance(_tokenBalance / Math.pow(10, USDC_DECIMALS));
      setEthBalance(web3.utils.fromWei(balance, "ether"));
    }
  };

  const swapUSDCHandler = async () => {
    if (dexContract) {
      const networkId = await web3.eth.net.getId();
      const dexData = Dex.networks[networkId];
      if (dexData) {
        const sendUSDC = tokenAmount * Math.pow(10, USDC_DECIMALS);
        await tokenContract.methods.approve(dexData.address, sendUSDC).send({
          from: investor,
        });
        await dexContract.methods
          .swapUSDCForEth(sendUSDC)
          .send({ from: investor });
        const balance = await web3.eth.getBalance(investor);
        const _tokenBalance = await tokenContract.methods
          .balanceOf(investor)
          .call();
        setTokenBalance(_tokenBalance / Math.pow(10, USDC_DECIMALS));
        setEthBalance(web3.utils.fromWei(balance, "ether"));
      } else {
        window.alert("Dex contract not deployed to detected network");
      }
    }
  };

  const onEthEnteredHandler = (ethAmount) => {
    setEthAmount(ethAmount);
  };
  const onTokenEnteredHandler = (tokenAmount) => {
    setTokenAmount(tokenAmount);
  };

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <WalletInfo ethBalance={ethBalance} tokenBalance={tokenBalance} />
        <SwapEth onEthEntered={onEthEnteredHandler} onSwap={swapEthHandler} />
        <SwapUSDC
          onTokenEntered={onTokenEnteredHandler}
          onSwap={swapUSDCHandler}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
