// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


// this contract self destructs when tick() function is called 10 times
contract Contract {
    
    uint counter = 0;

    function tick()external {
        if(counter == 9){
            selfdestruct(payable(msg.sender));
        }
        counter += 1;
    }

}
