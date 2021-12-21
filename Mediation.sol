
contract Mediation {


    address attacker = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address victim = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148;

    uint minimum = 10 ether;  
    mapping(address => uint) public balances;
    
    
    function agree() external payable  {
        require(msg.sender == attacker || msg.sender == victim, "only these two parties are allowed to interact with the contract");
        require(msg.value >= minimum, "you need to respect the minimum amount agreed upon");
        balances[msg.sender] += msg.value;
    }

    function unlock() external payable{
        require(msg.sender == attacker || msg.sender == victim, "only these two parties are allowed to interact with the contract");
        require(balances[attacker] >= minimum && balances[victim] >= minimum, "balances do not have the minimum amount required for the transfer");
        payable(victim).transfer(address(this).balance);
        uint256 amount = balances[attacker];
        balances[victim] += amount;
    }


    function balance() external view returns(uint){
        return address(this).balance;
    }


}
