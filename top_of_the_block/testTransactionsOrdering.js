const ethers = require("ethers")
const provider = new ethers.providers.JsonRpcProvider("https://eth.public-rpc.com")
const { contract_1, contract_2, bot_1, bot_2} = require("./bot_data")


getContractNumber = async () => {
    tx = await contract_1.number();
    console.log("\n>> contract number: ", tx.toString())
}

sendTransactions = async () => {

    // Execute BOT 1 first 
    console.log("BOT 1: sending transaction...")
    __nonce = await provider.getTransactionCount(bot_1.public_key) // get account nonce
    tx1 = await contract_1.setNumber("1111111",{ 
        gasPrice: 1123456789,   // 1.123456789 Gwei
        gasLimit: 150000,       // 150,000
        nonce: __nonce,         // account nonce
        value:0                 // 0 ETH sent
    });
   

    // Execute BOT 2 second but with higher gas params
    _nonce = await provider.getTransactionCount(bot_2.public_key) // get account nonce
    console.log("BOT 2: sending transaction...\n")
    tx2 = await contract_2.setNumber("2222222", { 
        gasPrice: 99159653159, // 99.159653159 Gwei
        gasLimit: 210000,      // 210,000
        nonce: _nonce,         // account nonce
        value:0                // 0 ETH sent
    });

    
    // wait for transactions to be mined
    console.log("Waiting for transactions to be mined...\n")
    
    result1 = await provider.waitForTransaction(tx1.hash)
    result2 = await provider.waitForTransaction(tx2.hash)

    console.log(`
    Block url: https://rinkeby.etherscan.io/txs?block=${result1.blockNumber}

    --> Bot 1 sent normal transaction
    From: ${result1.from}
    Index in block: ${result1.transactionIndex}
    Block Number: ${result1.blockNumber}


    --> Bot 2 sent transaction with higher gas
    From: ${result2.from}
    Index in block: ${result2.transactionIndex}
    Block Number: ${result2.blockNumber}
    `)

    // value stored in contract `number`:
    number = await contract_1.number();
    console.log("\n>> value stored in contract: ", number.toString())

}

// MAIN
getContractNumber()
sendTransactions()