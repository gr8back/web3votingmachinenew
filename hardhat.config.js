require("@nomiclabs/hardhat-waffle");
const { utils } = require("ethers");
const { isAddress, getAddress, formatUnits, parseUnits } = utils;


async function addr(ethers, addr) {
  if (isAddress(addr)) {
    return getAddress(addr);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts[addr] !== undefined) {
    return accounts[addr];
  }
  throw `Could not normalize address: ${addr}`;
}

const defaultNetwork = "localhost";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("blockNumber", "Prints the block number", async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

task("balance", "Prints an account's balance")
    .addPositionalParam("account", "The account's address")
    .setAction(async (taskArgs, { ethers }) => {
      const balance = await ethers.provider.getBalance(
          await addr(ethers, taskArgs.account)
      );
      console.log(formatUnits(balance, "ether"), "ETH");
    });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  defaultNetwork,
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/c199a2603e274f03849c82d5a60f524c",
      accounts: ["1d30572db065cf2ec8d3d5212f8135b1a7694a0606ca96e1d1c7b9b57d5ce346"]
    },
  }
};
