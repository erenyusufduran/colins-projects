// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Number {
    uint256 number = 0;

    event numberUpdated(address sender, uint256 number);

    function increment(address sender) public {
        number++;
        emit numberUpdated(sender, number);
    }

    function incrementBy(address sender, uint256 _number) public {
        number += _number;
        emit numberUpdated(sender, number);
    }

    function decrement(address sender) public {
        number--;
        emit numberUpdated(sender, number);
    }

    function decrementBy(address sender, uint256 _number) public {
        number -= _number;
        emit numberUpdated(sender, number);
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
