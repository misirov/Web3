//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0;

contract Fundme{
    
    uint256 totalFunds = 0; // initial funds in the contract
    uint256 toether = 1000000000000000000; // convert to eth from wei
    uint256 refundAmount; // amount to refund to the funder
   
    
    mapping(address => uint256) public walletToFunds;   // user address to funds provided
    mapping(address => bool) addressInList;             // is the user in the funders list
    
    event funded(address _wallet, uint256 _value);
    
    
    function fund() public payable {
        require(msg.sender.balance >= 1 ether, "Not enough ETH in your wallet");
        require(msg.value >= 1 ether, "Minimum amount is 1 ETH");
        
        emit funded(msg.sender, msg.value);
        
        totalFunds += msg.value;
        
        walletToFunds[msg.sender] = msg.value;
        
        // add funder's address if not already in list
        if(addressInList[msg.sender] == false){
            addressInList[msg.sender] = true;
        }
        
    }
    
    
    function refund() public {
        refundAmount = getFunder();
        totalFunds -= refundAmount;
        msg.sender.transfer(refundAmount);
        addressInList[msg.sender] == false;

    }

    function getFunder() private view returns (uint256){
        require(addressInList[msg.sender] == true, 'You are not on the list');
        return walletToFunds[msg.sender]; // returns key's value 
    }
    


    // These functions do not create a transaction nor change states 
    
        // wallet balance of the wallet who called the contract
    function callerWalletBalance()public view returns (uint256){ 
        return msg.sender.balance;
    }
    
        // Amount of funds in the contract
    function fundsRaised() public view returns (uint256){
        return address(this).balance / toether;
    }
    
}
