// SPDX-License-Identifier: MIT

const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function () {
  let Bank;
  let bank;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
    await bank.connect(owner).deployed();
  });

  it("should assign the contract owner", async function () {
    expect(await bank.owner()).to.equal(owner.address);
  });

  it("should allow a user to deposit funds", async function () {
    const depositAmount = ethers.utils.parseEther("0.01");
    await bank.connect(addr1).deposite({ value: depositAmount });
    expect(await bank.connect(addr1).getbalance()).to.equal(depositAmount);
  });

  it("should not allow a user to deposit less than 10 wei", async function () {
    const depositAmount = ethers.utils.parseUnits("1", "wei");
    await expect(bank.connect(addr1).deposite({ value: depositAmount })).to.be.revertedWith("Please deposit at least 10 wei");
  });

  it("should allow a user to withdraw funds", async function () {
    const depositAmount = ethers.utils.parseUnits("50", "wei");
    const withdrawAmount = ethers.utils.parseUnits("20", "wei");
    await bank.connect(addr1).deposite({ value: depositAmount });
    await bank.connect(addr1).withdraw(withdrawAmount);
    expect(await bank.connect(addr1).getbalance()).to.equal(depositAmount - withdrawAmount);
  });

  it("should not allow a user to withdraw more than their balance", async function () {
    const depositAmount = ethers.utils.parseEther("0.01");
    const withdrawAmount = ethers.utils.parseEther("0.02");
    await bank.connect(addr1).deposite({ value: depositAmount });
    expect(bank.connect(addr1).withdraw(withdrawAmount)).to.be.revertedWith("Insufficient Funds");
  });

  it("should allow the owner to withdraw funds", async function () {
    const depositAmount = ethers.utils.parseEther("0.01");
    const withdrawAmount = ethers.utils.parseEther("0.005");
    await bank.connect(addr1).deposite({ value: depositAmount });
    await bank.connect(owner).withdrawFunds(withdrawAmount);
    expect(await bank.connect(owner).getcontractbalance()).to.equal(depositAmount - withdrawAmount);
    expect(await bank.connect(owner).withdrawFunds(withdrawAmount)).to.be.revertedWith("Insufficient Funds");
  });

  it("should allow users to check their balance", async function(){
    const depositAmount = ethers.utils.parseEther("0.01");
    await bank.connect(addr1).deposite({ value: depositAmount });
    expect(await bank.connect(addr1).getbalance()).to.equal(depositAmount);
  })

  it("should allow the owner to get the contract balance", async function () {
    const depositAmount = ethers.utils.parseEther("0.01");
    await bank.connect(addr1).deposite({ value: depositAmount });
    expect(await bank.connect(owner).getcontractbalance()).to.equal(depositAmount);
  });
});








