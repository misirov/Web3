const ethers = require("ethers")
const provider = new ethers.providers.JsonRpcProvider("https://eth.public-rpc.com")

// ----- BOT 1 -----
const bot_1 = {
    public_key: "0x8434B9AaC4033e1fb887FCBD85EB5303f9a9B3Cb",
    private_key:""
}
const bot1 = new ethers.Wallet(bot_1.private_key, provider);

// ----- BOT 2 -----
const bot_2 = {
    public_key: "0xB272fC335cE3BAAACaF40777723d3178C2C75BA0",
    private_key:""
}
const bot2 = new ethers.Wallet(bot_2.private_key, provider);


// ---- TARGET CONTRACT ----
const ABI = [
    "function setNumber(uint _n) external",
    "function number() public view returns(uint)"
]
const contract_address = "0xbb1fd187D6Fe8eabF56be5aBEb89574a75F7e7B8"

const contract_1 = new ethers.Contract(contract_address, ABI, bot1);
const contract_2 = new ethers.Contract(contract_address, ABI, bot2);



module.exports = {
    bot_1,
    bot_2,
    contract_1,
    contract_2
}