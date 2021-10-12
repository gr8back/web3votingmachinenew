# Web3 Voting Machine
This is an example project using Web3, metamask and hardhat.  Once connected to your metamask chrome extension, this
Dapp allows you to interact with the sample accounts provided by Hardhat.  Example actions include
giving the right to vote, voting, tallying the vote and resetting the machine.


## Available Scripts
To use this repo, clone the repo in the usual way, and then open three terminal windows.  The first
window will be the react app, using yarn start.   The second window will be the hardhat node, start with npx hardhat node.   
The third terminal window will be running the Hardhat script.   The Hardhat script posts the contract address to the .env file
which then will be imported into the project using dot.env.


### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

No tests at this time.


