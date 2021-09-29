const Web3 = require('web3')


const httprovider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/1e6cf032dd7d4a789adfc232d97fa1c0")

const testHttpProvider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/7f94c1726ca648ee9233558bbdc7fa3c")

const tokenABI = [ 
    { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, 
    { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "type": "function" }, 
    { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "type": "function" }, 
    { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" } 
]

const getHttpProvider = (isProd) => ( isProd ? httprovider : testHttpProvider )

exports.getAccounts = async () => {
    const web3Provider = new Web3(window.ethereum)
    await window.ethereum.enable()
    const accounts = await web3Provider.eth.getAccounts()
    return accounts
}

exports.getBalance = async ({ isProd }, walletAddress, tokenBalanceAddress) => {
    const web3Provider = new Web3(getHttpProvider(isProd))

    let tokenBalance = 0

    if (tokenBalanceAddress === undefined || tokenBalanceAddress === null || tokenBalanceAddress === "" || tokenBalanceAddress === "none" ) {
        const ethBalance = await web3Provider.eth.getBalance(walletAddress)
        tokenBalance = ethBalance / Math.pow(10, 18)
    } else {
        const tokenContract = new web3Provider.eth.Contract(tokenABI, tokenBalanceAddress)
        const tokenResponse = await tokenContract.methods.balanceOf(walletAddress).call()
        const tokenDecimals = await tokenContract.methods.decimals().call()
        tokenBalance = tokenResponse / Math.pow(10, tokenDecimals)
    }

    return tokenBalance
}

exports.signMessage = async (address, msg) => {
    const web3Provider = new Web3(window.ethereum)
    const sig = await web3Provider.eth.personal.sign(msg, address)
    const signedMessage = {
        address,
        sig,
        msg,
        version: 2
    }
    return signedMessage
}

exports.verifyMessage = async ({ isProd }, payload, signature, walletAddress) => {
    const web3Provider = new Web3(getHttpProvider(isProd))
    const verification = await web3Provider.eth.personal.ecRecover(payload, signature)
    const isVerified = (walletAddress === verification)
    return isVerified
}
