const { create } = require('ipfs-http-client')





exports.addFile = async (file) => {

    // connect using a URL
    const client = create(new URL('https://ipfs.infura.io:5001'))

    // call Core API methods
    const response = await client.add(file)

    const { cid } = response

    console.log({ cid, file, response })

    return response
}
