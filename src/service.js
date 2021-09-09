const { metamask } = require('./providers/metamask')


exports.linkAccount = (providerId) => {
    switch (providerId) {
        case providerId.METAMASK:
            return metamask.linkAccount()
        default:
            return metamask.linkAccount()
    }
}