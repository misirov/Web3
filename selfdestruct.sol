// SPDX-License-Identifier: MIT
//https://betterprogramming.pub/solidity-what-happens-with-selfdestruct-f337fcaa58a7

pragma solidity ^0.8.4;


// this contract self destructs when tick() function is called 10 times
pragma solidity ^0.8.4;

contract Contract {
    
    // when the contract self destructs, the counter will remain at 0
    uint public counter = 0;
    
    
    function tick() external returns (uint){
        if(counter == 10){
            selfdestruct(payable(msg.sender));
        }
        
        counter += 1;
        return counter;
    }
    
    
    // When the contract self destructs, the new address becomes 0x0000...
    function contractAddress() public view returns(address){
        return address(this);
    }
    
}
