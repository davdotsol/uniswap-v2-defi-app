# DeFi App Based on Uniswap v2

Simple decentralized application based on Solidity and Web3 that swap a simple pair of tokens with the help of the Uniswap V2 library.

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Web3](https://web3js.readthedocs.io/en/v1.5.2/) (Blockchain Interaction)
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview) (Development Framework)
- [Ganache CLI](https://github.com/trufflesuite/ganache-cli-archive) (For Local Blockchain)
- [Infura](https://infura.io/) (Ethereum Node As A Service Provider)

## Requirements For Initial Setup

- Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
- Install [Truffle](https://www.trufflesuite.com/docs/truffle/overview), In your terminal, you can check to see if you have truffle by running `truffle version`. To install truffle go to your project root directory and run `npm install --save-dev truffle` Ideal to have truffle version 5.4 to avoid dependency issues.
- Install [Ganache CLI](https://github.com/trufflesuite/ganache-cli-archive).

## Setting Up

### 1. Clone/Download the Repository

```
$ git clone https://github.com/davdotsol/uniswap-v2-defi-app.git
$ cd uniswap-v2-defi-app
$ git checkout starter
```

### 2. Install Dependencies:

```
$ cd uniswap-v2-defi-app
$ npm install
```

### 3. Start Ganache

`$ npm run ganache`

### 4. Migrate Smart Contracts

`$ npx truffle migrate --reset --skip-dry-run`

### 5. Run Tests

`$ npx truffle test`
