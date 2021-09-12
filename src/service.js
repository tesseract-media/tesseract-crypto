const web3 = require('./providers/web3')

const PROVIDER = {
    WEB3: {
        Id: "WEB3",
        DisplayName: "Web3",
    }
}

const resolveProvider = (providerId) => {
    switch (providerId) {
        case PROVIDER.WEB3.Id:
            return { ...PROVIDER.WEB3, ...web3 }
        default:
            return { ...PROVIDER.WEB3, ...web3 }
    }
}

exports.getProviders = () => {
    const keys = Object.keys(PROVIDER)
    const results = keys.map( key => PROVIDER[key] )
    return results
}

exports.getAccounts = async (providerId) => {
    const provider = resolveProvider(providerId)
    const accounts = await provider.getAccounts()
    return accounts
}

exports.getBalance = async (providerId, walletAddress, tokenBalanceAddress) => {
    const provider = resolveProvider(providerId)
    return provider.getBalance(walletAddress, tokenBalanceAddress)
}

exports.signMessage = async (providerId, walletAddress, msg) => {
    const provider = resolveProvider(providerId)
    return provider.signMessage(walletAddress, msg)
}

exports.generateSubmission = async (providerId, walletAddress, tokenBalanceAddress, msg) => {
    const provider = resolveProvider(providerId)
    const tokenBalance = await provider.getBalance(walletAddress, tokenBalanceAddress)
    const payload = {
        tokenBalanceAddress,
        walletAddress,
        tokenBalance,
        message: msg,
    }
    const submission = await provider.signMessage(walletAddress, payload)
    return submission
}

exports.verifyMessage = async (providerId, payload, signature, walletAddress) => {
    const provider = resolveProvider(providerId)
    return provider.verifyMessage(payload, signature, walletAddress)
}
