// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

contract GuessNumber {
    address private owner;
    address private player;
    uint public actualNumber;
    uint private maxNumber;
    uint private numGuesses;
    mapping(address => uint) private wins;
    mapping(address => bool) private addressExists;
    address[] private players;
    event NumberGuessed(address indexed player, uint guessedNumber, uint numGuesses, bool isCorrect, uint numWins);
    event NewGame(address indexed player, uint256 timestamp);
    event UpdatedMaxNumber(address indexed player, uint maxNumber, uint256 timestamp);

    constructor() {
        owner = msg.sender;
        newGame();
    }

    function guess(uint _guessedNumber) public returns (bool) {
        bool isCorrect = actualNumber == _guessedNumber;
        if(!addressExists[msg.sender])   {
            players.push(player);
        }

        if (isCorrect) {
            this.newGame();
            wins[player]++;
        }
        numGuesses++;
        emit NumberGuessed(player, _guessedNumber, numGuesses, isCorrect, wins[player]);
        return isCorrect;
    }

    function newGame() public returns (bool){
        player = msg.sender;
        maxNumber = 10; // Default value to ensure it's > 0
        numGuesses = 0;
        actualNumber = generateRandomNumber();
        emit NewGame(player, block.timestamp);
        return true;
    }

    function getNumGuesses()public view returns(uint){
        return numGuesses;
    }

    function setMaxNumber(uint _maxNumber) public {
        require(0 < _maxNumber, "Max number must be greater than zero");
        maxNumber = _maxNumber;
        actualNumber = generateRandomNumber();
        emit UpdatedMaxNumber(player, maxNumber, block.timestamp);
    }

    function getMaxNumber() public view returns (uint) {
        return maxNumber;
    }

    function getNumWins() public view returns (uint) {
        return wins[player];
    }

    function generateRandomNumber() private view returns (uint) {
        require(0 < maxNumber, "Max number must be greater than zero");
        uint randomHash = uint(
            keccak256(abi.encodePacked(block.timestamp, player))
        );
        return uint(randomHash % maxNumber);
    }

    //debug fctns
    function thisAddress()public view returns(address){
        return address(this);
    }

    function getSender() public view returns(address){
        return msg.sender;
    }
}