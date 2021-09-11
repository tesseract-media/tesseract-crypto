const Web3 = require('web3')


const provider = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/1e6cf032dd7d4a789adfc232d97fa1c0"))

const tokenABI = [ 
    { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, 
    { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "type": "function" }, 
    { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "type": "function" }, 
    { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" } 
]

exports.getAccounts = async () => {
    const web3Provider = new Web3(provider)
    await window.ethereum.enable()
    const accounts = await web3Provider.eth.getAccounts()
    return accounts
}

exports.getBalance = async (walletAddress, tokenBalanceAddress) => {
    const web3Provider = new Web3(provider)
    const tokenContract = new web3Provider.eth.Contract(tokenABI, tokenBalanceAddress)
    const tokenResponse = await tokenContract.methods.balanceOf(walletAddress).call()
    const tokenDecimals = await tokenContract.methods.decimals().call()
    const tokenBalance = tokenResponse / Math.pow(10, tokenDecimals)
    return tokenBalance
}

exports.signMessage = async (walletAddress, payload) => {
    const web3Provider = new Web3(provider)
    const signature = await web3Provider.eth.personal.sign(payload, walletAddress)
    const signedMessage = {
        walletAddress,
        signature,
        payload,
        version: "1",
    }
    return signedMessage
}

exports.verifyMessage = async (payload, signature, walletAddress) => {
    const web3Provider = new Web3(provider)
    const verification = await web3Provider.eth.personal.ecRecover(payload, signature)
    const isVerified = (walletAddress === verification)
    return isVerified
}
