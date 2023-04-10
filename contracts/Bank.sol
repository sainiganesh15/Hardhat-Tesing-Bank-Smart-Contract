//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank{
    address public owner;
    mapping(address=>uint256) private userbalance;

    constructor(){
        owner = msg.sender;       // here we given value to state variable owner
    }

    modifier onlyOwner(){                              // modifier are used to restrict access to certain function
        require(msg.sender == owner,"You are not owner of the contract");
        _;
    }
    

    // function to deposite funds
    function deposite() public payable returns(bool){
        require(msg.value > 10 wei,"Please deposit at least 10 wei");  // user has to deposit 10 wei minimum
        userbalance[msg.sender] += msg.value;                         //updating the balance of user whp called the function in userbalance mapping
        return true;                                                  // function execution was successful
    }
    
    // User can wthdraw funds when required
    function withdraw(uint256 _amount) public payable returns(bool){
        require(_amount <= userbalance[msg.sender], "Insufficient Funds");  // withdraw amount should be greater than the userbalance
        userbalance[msg.sender] -= _amount;                                 // withdraw amount is deducted from userBalance
        payable(msg.sender).transfer(_amount);                              // amount transfered to requested user
        return true;                                                        // function execution was successful
    }

    // function so that user can see the balance
    function getbalance() public view returns(uint256){
        return userbalance[msg.sender];
    }
    

    // only ownwer of this contract can access this function b/c we have used modifier onlyOwner in which he can see contract balance
    function getcontractbalance() public view onlyOwner returns(uint256){
        return address(this).balance;
    }
    

    // only ownwer of this contract can access this function b/c we have used modifier onlyOwner in which he can withdraw funds
    function withdrawFunds(uint256 _amount) public payable onlyOwner returns(bool){
        payable(owner).transfer(_amount);
        return true;
    }
}