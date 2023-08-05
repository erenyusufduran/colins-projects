// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Number {
    uint256 number = 0;

    event numberUpdated(uint256 number);

    function increment() public {
        number++;
        emit numberUpdated(number);
    }

    function incrementBy(uint256 _number) public {
        number += _number;
        emit numberUpdated(number);
    }

    function decrement() public {
        number--;
        emit numberUpdated(number);
    }

    function decrementBy(uint256 _number) public {
        number -= _number;
        emit numberUpdated(number);
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
