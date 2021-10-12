const { utils } = require("ethers");
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers, tenderly, run } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
require('fs')


async function main() {
      const voter = await deploy("Ballot", [
    "0x6c10000000000000000000000000000000000000000000000000000000000000",
    "0x6c20000000000000000000000000000000000000000000000000000000000000",
  ]);

    const [addr1] = await ethers.getSigners();
    console.log("your addr1 is " + JSON.stringify(addr1))
   console.log("Ballot deployed to:", voter.address);
   var myobj = `REACT_APP_KEY=${voter.address}`
try {
fs.writeFileSync('.env', JSON.stringify(myobj).slice(1,-1));
  console.log('The "data to append" was appended to file!');
} catch (err) {
  console.log("ERROR")
}

    console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );

}


const deploy = async (
  contractName,
  _args = [],
  overrides = {},
  libraries = {}
) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  console.log(contractArgs.length)
    console.log(contractName)
  const contractArtifacts = await ethers.getContractFactory(contractName);
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  fs.writeFileSync(`src/artifacts/${contractName}.address`, deployed.address);

  let extraGasInfo = "";
  if (deployed && deployed.deployTransaction) {
    const gasUsed = deployed.deployTransaction.gasLimit.mul(
      deployed.deployTransaction.gasPrice
    );
    extraGasInfo = `${utils.formatEther(gasUsed)} ETH, tx hash ${
      deployed.deployTransaction.hash
    }`;
  }

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address)
  );
  console.log(" ⛽", chalk.green(extraGasInfo));


  return deployed;
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
