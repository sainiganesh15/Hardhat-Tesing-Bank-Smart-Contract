# Hardhat Testing (Bank Smart Contract)

This is a Smart Contract called **Bank** and it allows users to deposit and withdraw funds. The smart contract also has functions to allow the contract owner to withdraw funds and check the contract balance.

The purpose of this repository is to demonstrate how to write unit tests for smart contracts using the Hardhat testing framework.

## Prerequisites

Before you can run the tests, make sure you have the following installed:

- Node.js
- Hardhat

## Installation

1. For Hardhat Installation
``` 
npm init --yes
npm install --save-dev hardhat
```

2. For running hardhat sample project install these dependencies:
```
npm install --save-dev @nomiclabs/hardhat-ethers@^2.0.5 @nomiclabs/hardhat-waffle@^2.0.3 
npm install --save-dev chai@^4.3.6 ethereum-waffle@^3.4.4 ethers@^5.6.2 hardhat@^2.9.2
```

## Deploying Smart Contract to Localhost

1. Write your smart contract in Solidity and save it in the `contracts/` folder.

2. In the `hardhat.config.js` file, configure your local development network by adding the following:

```
require("@nomiclabs/hardhat-waffle")


module.exports = {
    solidity: "0.8.9",
    networks: {
      hardhat: {
        chainId: 1337,
      },
    },
  };
  ```

  3. In the `scripts/` folder, create a new script to deploy your contract to the local network:
  ```
 const { ethers } = require("hardhat");

async function main(){
    // here we are getting the instance of the contract

    const Bank= await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    await bank.deployed();

    console.log("Bank Smart Contract address:", votingContract.address);
}

main().then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})
```
4. Compile and deploy the smart contract using Hardhat

```
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost

``` 

This will deploy your smart contract to the local development network.


## Running the Tests

To run the tests, use the following command:

`npx hardhat test
`

This will run all the tests in the `test` folder.

## Tests


The tests are located in the `test` folder and cover the following scenarios:

- Assigning the contract owner
- Depositing funds
- Rejecting deposits less than 10 wei
- Withdrawing funds
- Rejecting withdrawals greater than the user's balance
- Withdrawing funds as the contract owner
- Checking user balances
- Checking the contract balance

## Conclusion
Writing unit tests for smart contracts is an essential part of the development process. Hardhat makes it easy to write and run tests, and can be used with a variety of testing frameworks.

In this repository, we have demonstrated how to write unit tests for a sample smart contract called **Bank**.