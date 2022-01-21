const Web3 = require("web3");
require("dotenv").config();

const ganache = require("ganache-cli");
const options = {
  fork: `https://mainnet.infura.io/v3/${process.env.INFURA_MAINNET}`,
  unlocked_accounts: ["0x6262998ced04146fa42253a5c0af90ca02dfd2a3"],
  account_keys_path: "keys.json",
  host: "127.0.0.1",
  port: 7545,
  seed: 1306,
};

const server = ganache.server(options);
const PORT = 7545;
server.listen(PORT, async (err, blockchain) => {
  if (err) throw err;

  console.log(`ganache listening on port ${PORT}`);
  const provider = server.provider;
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
});
