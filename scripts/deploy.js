const { ethers } = require("hardhat");

async function main(){
    // here we are getting the instance of the contract
    const [deployer] = await ethers.getSigners();  //is used to get an array of signer objects

    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    console.log("Bank Samart Contract Address:", bank.address);
}

main().then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})