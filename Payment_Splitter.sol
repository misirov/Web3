pragma solidity ^0.8.4;

contract Splitter {
    event SentAmount(address _from, uint amount, address _to);
    
    constructor(){}

    function splitAndSend(address[] memory _accounts) external payable {
        uint numberOfAccounts = _accounts.length;
        uint amount = msg.value / numberOfAccounts;
        for(uint i = 0; i < numberOfAccounts; i++){
            (bool s, ) = payable(_accounts[i]).call{value:amount}("");
            require(s, "CALL_FAILED");
            emit SentAmount(msg.sender, amount, _accounts[i]);
        }
    }
}
