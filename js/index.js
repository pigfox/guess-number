const web3 = new Web3(window.ethereum);
const address = "0x8635AC8a3c813f5508C6893bB362B4745cB68E27";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"guesser","type":"address"},{"indexed":false,"internalType":"uint256","name":"guessedNumber","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isCorrect","type":"bool"}],"name":"NumberGuessed","type":"event"},{"inputs":[],"name":"actualNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumWins","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_guessedNumber","type":"uint256"}],"name":"guess","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"newGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxNumber","type":"uint256"}],"name":"setMaxNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contract = new web3.eth.Contract(ABI, address);

const connectMetamaskBtn = document.getElementById('connectMetamaskBtn');
connectMetamaskBtn.addEventListener('click', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log('Connected', accounts[0]);
                connectMetamaskBtn.textContent = 'Connected';
            })
            .catch(err => {
                console.error('User denied account access', err);
            });

        contract.methods.getNumWins().call()
            .then(result => {
                console.log("My wins: ", result);
                document.getElementById("myWins").innerHTML = "My wins: " + result;
            })
            .catch(error => {
                console.error("An error occurred: ", error);
            });
    } else {
        console.log('MetaMask is not installed. Please consider installing it.');
        connectMetamaskBtn.textContent = 'Please install MetaMask';
    }
});

const connectContractBtn = document.getElementById('connectContractBtn');
connectContractBtn.addEventListener('click', () => {
    if (typeof Web3 !== 'undefined') {
        contract.methods.getMaxNumber().call()
            .then(result => {
                console.log("Max number: ", result);
                document.getElementById("contractArea").innerHTML = "Max number: " + result;
            })
            .catch(error => {
                console.error("An error occurred: ", error);
            });
    } else {
        console.log('Web3 is not found. Please install MetaMask or another web3 provider.');
    }
});

const guessBth = document.getElementById('guessBtn');
guessBth.addEventListener('click', () => {
    let guessNumberInput = document.getElementById('guessNumber');
    let guessNumber = guessNumberInput.value;
    if(guessNumber == ""){
        guessNumberInput.classList.add('red');
        guessNumberInput.focus();
        return;
    }
    contract.methods.guess(guessNumber).send({ from: ethereum.selectedAddress })
        .then(receipt => {
            console.log("Transaction receipt: ", receipt);
        })
        .catch(err => {
            console.error("Transaction error: ", err);
        });
    guessNumberInput.value = "";
});

const newGameBtn = document.getElementById('newGameBtn');
newGameBtn.addEventListener('click', () => {
    console.log("newGameBtn");
    contract.methods.newGame().send({ from: ethereum.selectedAddress });
});

const setMaxNumberBtn = document.getElementById('setMaxNumberBtn');
setMaxNumberBtn.addEventListener('click', () => {
    console.log("setMaxNumber");
    let maxNumberInput = document.getElementById('maxNumber');
    let maxNumber = maxNumberInput.value;
    if(maxNumber == ""){
        maxNumberInput.classList.add('red');
        maxNumberInput.focus();
        return;
    }

    contract.methods.setMaxNumber(maxNumber).send({ from: ethereum.selectedAddress })
        .then(receipt => {
            console.log("Transaction receipt: ", receipt);
        })
        .catch(err => {
            console.error("Transaction error: ", err);
        });
    maxNumberInput.value = "";
});

let inputs = document.getElementsByClassName('input');
function clearInputs() {
    Array.from(inputs).forEach(function(input) {
        input.classList.remove('red');
    });
}