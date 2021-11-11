// SPDX License-Identifier: MIT

pragma solidity  ^0.8.4;

contract Faucet {
    
    event deposit(address, uint256);
    event withdrawal(address, uint256);
    
    address payable private owner;
    
    mapping(address => uint256) coolOff;
    
    
    constructor (){
        owner = payable(msg.sender);
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _; // this is called a 'merge wildcard'
    }
    
    
    function fundContract() external payable {
        emit deposit(msg.sender, msg.value);
    }
    

    function getFakeEther() public payable {
        require(address(this).balance >= 1 ether, "Sorry, the contract is empty");
        require(coolOff[msg.sender] <= block.timestamp - 1 hours, "You must wait for 1 hour");
        emit withdrawal(msg.sender, 1);
        payable(msg.sender).transfer(1 ether);
        coolOff[msg.sender] = block.timestamp;
    }
    
    
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    
    function selfDestruct() external onlyOwner {
        selfdestruct(payable(owner));
    }
    
}
