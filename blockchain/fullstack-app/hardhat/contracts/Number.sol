// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Number {
    uint256 number = 0;

    function increment() public {
        number++;
    }

    function incrementBy(uint256 _number) public {
        number += _number;
    }

    function decrement() public {
        number--;
    }

    function decrementBy(uint256 _number) public {
        number -= _number;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
