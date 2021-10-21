//License-Identifier: MIT

pragma solidity ^0.8.2;

contract Number {

    uint256 num = 0;

    function setNum(uint256 _num)public {
        num = _num;
    }

    function getNum()public view returns (uint256){
        return num;
    }

}
