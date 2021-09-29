const web3 = require('./providers/web3')

const PROVIDER = {
    WEB3: {
        Id: "WEB3",
        DisplayName: "Web3",
    },
    WEB3_TEST: {
        Id: "WEB3_TEST",
        DisplayName: "Web3 - Ropsten",
    },
    
}

const resolveProvider = (providerId) => {
    switch (providerId) {
        case PROVIDER.WEB3.Id:
            return { ...PROVIDER.WEB3, isProd: true, ...web3 }
        case PROVIDER.WEB3_TEST.Id:
            return { ...PROVIDER.WEB3_TEST, isProd: false, ...web3 }
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
    return provider.getBalance(provider, walletAddress, tokenBalanceAddress)
}

exports.signMessage = async (providerId, walletAddress, msg) => {
    const provider = resolveProvider(providerId)
    return provider.signMessage(walletAddress, msg)
}

exports.generateSubmission = async (providerId, walletAddress, tokenBalanceAddress, msg) => {
    const provider = resolveProvider(providerId)
    const tokenBalance = await provider.getBalance(provider, walletAddress, tokenBalanceAddress)
    const submission = await provider.signMessage(walletAddress, msg)

    const response = {
        tokenBalanceAddress,
        walletAddress,
        tokenBalance,
        message: msg,
        verification: submission
    }

    return response
}

exports.verifyMessage = async (providerId, payload, signature, walletAddress) => {
    const provider = resolveProvider(providerId)
    const { isProd } = provider
    return provider.verifyMessage(isProd, payload, signature, walletAddress)
}
