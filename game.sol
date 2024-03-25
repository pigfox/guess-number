// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

contract GuessNumber {
    address private owner;
    uint private guessedNumber;
    uint public actualNumber;
    uint private maxNumber;
    mapping(address => uint) private wins;

    constructor() {
        owner = msg.sender;
        maxNumber = 10; // Default value to ensure it's > 0
        newGame();
    }

    function guess(uint _guessedNumber) public returns (bool) {
        if (actualNumber == _guessedNumber) {
            newGame();
            wins[msg.sender]++;
            return true;
        }
        return false;
    }

    function newGame() public {
        actualNumber = generateRandomNumber();
    }

    function setMaxNumber(uint _maxNumber) public {
        require(0 < _maxNumber, "Max number must be greater thatn zero");
        maxNumber = _maxNumber;
    }

    function getMaxNumber() public view returns (uint) {
        return maxNumber;
    }

    function getWins() public view returns (uint) {
        return wins[msg.sender];
    }

    function generateRandomNumber() private view returns (uint) {
        uint randomHash = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        return uint(randomHash % maxNumber);
    }
}
