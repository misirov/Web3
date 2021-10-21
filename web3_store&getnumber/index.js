cotract_address = "0x8775e271F2a6416F40E475E111d7dEB641EAF9Ea"

abi = [
{
"inputs": [
{
"internalType": "uint256",
"name": "_num",
"type": "uint256"
}
],
"name": "setNum",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "getNum",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function",
"constant": true
}
]



function get_number(){
    const number = document.getElementById('input-number').value;
    const p = document.getElementById('p-number')
    p.innerHTML = number;
}


const web3 = new Web3("http://127.0.0.1:7545");
web3.eth.getAccounts(console.log);


var sc = new web3.eth.Contract(abi, '0x8775e271F2a6416F40E475E111d7dEB641EAF9Ea')
var account = '0x7F0e20a6F03C628d1a3adAc809d7FE35c4dBAa92'



function set_number(){
    let num = document.getElementById('input-number').value;
    let p_receipt = document.getElementById('p-receipt')

    sc.methods.setNum(num).send({from:'0x7F0e20a6F03C628d1a3adAc809d7FE35c4dBAa92'})
    .then((receipt) => {
        console.log(receipt)
        let transactionHash = receipt[Object.keys(receipt)[0]]
        p_receipt.innerHTML = `transaction hash: ${transactionHash}`
    })

}

async function get_number(){
    let num = await sc.methods.getNum().call()
    console.log(num)
    document.getElementById('p-number').innerHTML = `stored number: ${num}`;

}