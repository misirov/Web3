// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;


contract Bank {

    address public sender;
    address public owner;
    uint256 public bank_funds;

    constructor(address _owner, uint256 _funds)  {
        bank_funds = _funds;
        owner = _owner;
        sender = msg.sender;
    }
}

contract BankFactory {

    Bank bank;

    Bank[] public list_of_bank_contracts;

    function createBank(address _owner, uint256 _funds) external {
        bank = new Bank(_owner, _funds);
        list_of_bank_contracts.push(bank);
    } 
}
