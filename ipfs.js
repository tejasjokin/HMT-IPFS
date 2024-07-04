const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

// Load Pinata API keys from environment variables
const PINATA_API_KEY = process.env.PINATA_API_Key;
const PINATA_SECRET_API_KEY = process.env.PINATA_API_Secret;
const PINATA_GATEWAY_URL = process.env.PINATA_GATEWAY_URL;

const pinFilesToIPFS = async (fileURLToPath) => {
    try {
        const readableStreamForFile = fs.createReadStream(fileURLToPath);
        
        const data = new FormData();
        data.append('file', readableStreamForFile);

        const options = JSON.stringify({
            pinataMetadata: {
                name: "ExampleFile" + new Date().toUTCString(),
                keyvalues: {
                    customKey: 'customValue',
                    customKey2: 'customValue2'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        });

        data.append('pinataOptions', options);

        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_SECRET_API_KEY
            }
        });

        return res.data;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error.message);
        return false;
    }
}

const retrieveFileContent = async (hash) => {
    try {
        const gatewayUrl = getFileGateway(hash);
        const res = await axios.get(gatewayUrl);
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error.message);
        return false;
    }
}

const getFileGateway = (hash) => {
    const fileGatewayUrl = PINATA_GATEWAY_URL + hash;
    return fileGatewayUrl;
}


module.exports = {
    pinFilesToIPFS,
    retrieveFileContent
};