const CryptoService = require('../service')

afterAll(() => {

})
  




describe('General Tests', () => {

    test('Get Providers', () => {

        // when
        const providers = CryptoService.getProviders()
    
        // then
        expect(providers.length).toBeGreaterThan(0)
    })
        
})


describe('Web3 Provider Tests', () => {

    test('Get wallet balance', async () => {

        // given
        const providerId = 'WEB3'
        const walletAddress = '0x0d8775f648430679a709e98d2b0cb6250d2887ef'
        const tokenAddress =  "0x0d8775f648430679a709e98d2b0cb6250d2887ef" // BAT
    
        // when
        const providers = await CryptoService.getBalance(providerId, walletAddress, tokenAddress)
    
        // then
        expect(providers).toBeGreaterThan(0)
    
    })
    
        
})
