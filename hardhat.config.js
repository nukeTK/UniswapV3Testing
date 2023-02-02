require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { API_KEY } = process.env;

module.exports = {
  solidity: "0.7.6",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`,
      },
    },
  },
};
