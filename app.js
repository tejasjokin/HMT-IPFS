const express = require('express');
const { pinFilesToIPFS, retrieveFileContent } = require('./ipfs.js');
const { createFile, deleteFile } = require("./fileoperations.js");
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

app.post('/upload', async (req, res) => {
    const { jsonData } = req.body;
    // Define the file path
    const filePath = path.join(__dirname, '/upload/data.json');

    if (!jsonData) {
        return res.status(400).json({ message: 'jsonData is required in the request body' });
    }

    var fileCreated = createFile(filePath, jsonData);
    

    if(fileCreated)
    {
        var fileHashObject = await pinFilesToIPFS(filePath);
        console.log(fileHashObject)
        if(fileHashObject?.IpfsHash !== undefined)
        {
            deleteFile(filePath);
            return res.status(200).json(fileHashObject);
        }
    }
    else
    {
        deleteFile(filePath)
        return res.status(500).json({message: "Some internal error occured while saving new health record to file"});
    }

});

app.post('/retrieve', async (req, res) => {
    const { hash } = req.body;
    // Define the file path
    const filePath = path.join(__dirname, '/upload/data.json');

    if (!hash) {
        return res.status(400).json({ message: 'Hash is required in the request body' });
    }

    var filedata = await retrieveFileContent(hash)
    if(filedata?.email !== undefined)
    {
        return res.status(200).json(filedata);
    }
    else
    {
        return res.status(500).json({message: "Some internal error occured while retrieving health record files for patient"});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});  