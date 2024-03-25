const contractAddress = "0x76Cd24B85A6D096BF3946437Da2CaE91AfD8e064";
const contractAbi = '[ 	{ 		"inputs": [ 			{ 				"internalType": "uint256", 				"name": "_guessedNumber", 				"type": "uint256" 			} 		], 		"name": "guess", 		"outputs": [ 			{ 				"internalType": "bool", 				"name": "", 				"type": "bool" 			} 		], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "newGame", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [ 			{ 				"internalType": "uint256", 				"name": "_maxNumber", 				"type": "uint256" 			} 		], 		"name": "setMaxNumber", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"stateMutability": "nonpayable", 		"type": "constructor" 	}, 	{ 		"inputs": [], 		"name": "actualNumber", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getMaxNumber", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getWins", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	} ]';

/*** Global scope variables that will be automatically assigned values later on ***/
let infoSpace; // This is an <ul> element where we will print out all the info
let web3; // Web3 instance
let contract; // Contract instance
let account; // Your account as will be reported by Metamask