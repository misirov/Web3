
const abi =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "withdrawal",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "faucetAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundContract",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_destination",
        "type": "address"
      }
    ],
    "name": "getFakeEther",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_faucetAddress",
        "type": "address"
      }
    ],
    "name": "setFaucetAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "selfDestruct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


const web3 = new Web3(window.ethereum);// DEPRECATED
window.ethereum.enable() // Enabe Ethereum in the browser
//Initialize browser ethereum provider and contract:
//const web3 = new Web3(Web3.givenProvider); 
const contractAddress = "0x5a302357CA03AE47A924155004269cffDC07C2AA";
const contract = new web3.eth.Contract(abi, contractAddress);



// Display contract information Address and Balance: 
getContractBalance = async () => {
  var balance = await contract.methods.contractBalance().call();
  var balance_eth = balance / 10**18; //from wei to eth
  document.getElementById("contract-balance").innerHTML = balance_eth + ' Eth';
}

getContractAddress = async () => {
  var address = await contract.methods.faucetAddress().call();
  document.getElementById("contract-address").innerHTML = address;
}

window.addEventListener('load', getContractBalance())
window.addEventListener('load', getContractAddress())



// Main functions, Get test ether and Donate test ether:
async function donateEther(){
  var wallet = await web3.eth.getAccounts(); //get metamsk wallet, returns promise
  var wallet_address = wallet.toString();    // need to convert to string
  var user_donation = document.getElementById("input-donate").value;

  if(user_donation == "" ){
    var errorText = 'Please enter donation amount';
    console.log('Please enter donation amount');
    showError(errorText);
    setTimeout(hideError,2500); // hide the modal pop up after 2.5 seconds
    return;
  };

  var amount = web3.utils.toWei(user_donation, "ether");
  
  try{
    await contract.methods.fundContract().send({
      from:wallet_address,
      value:amount,
    });
    console.log(`You donated ${amount/10**18} eth. Thank you stranger`)
    showThanks(amount);
    setTimeout(hideThanks, 3000) 
 
  } catch(e){
    console.log(e)
  }
}

async function getFakeEther(){
  try{    
    var wallet = await web3.eth.getAccounts(); //get metamsk wallet, returns promise
    var wallet_address = wallet.toString();    // need to convert to string

    var _destination = document.getElementById("input-address").value;
    if(_destination == "" ){
      var errorText = 'Empty address field';
      console.log('Please enter an address to send ether to');
      showError(errorText);
      setTimeout(hideError,2500);
      return;
    };

    await contract.methods.getFakeEther(_destination).send({
      from:wallet_address
    })
    .then(function(receipt){
      console.log(receipt)
    });
    
  }catch(e){
    // catch the smart contract reason to revert the transaction
    console.log(e)
    var errorMessageInJson = JSON.parse(e.message.slice(58, e.message.length - 2));
    var errorMessageToShow = errorMessageInJson.data.data[Object.keys(errorMessageInJson.data.data)[0]].reason;
    showError(errorMessageToShow);
    setTimeout(hideError,2500);
    return; 
  }
}




// Modal Pop Ups messages
showThanks = amount => {
  var p = document.getElementById("thanks");
  p.innerHTML = `You donated ${amount/10**18} eth. Thank you stranger`;
  p.style.display = "block";
}

hideThanks = () => {
  var p = document.getElementById('thanks');
  p.style.display = "none";
}

showError = errorText => {
  var p = document.getElementById("error");
  p.innerHTML = `Error: ${errorText}`;
  p.style.display = "block";
}
hideError = () => {
  var p = document.getElementById('error');
  p.style.display = "none";
}


//Set the contract address from here rather than from the migrations file.
// async function setAddress(){
//    try{
//     var wallet = await web3.eth.getAccounts(); //get metamsk wallet, returns promise
//     var wallet_address = wallet.toString();    // need to convert to string
//     await contract.methods.setFaucetAddress(contractAddress).send({
//      from:wallet_address,
//     });
//     } catch(e){
//         console.log(e)
//     }
// }
// setAddress()
