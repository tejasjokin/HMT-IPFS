const fs = require('fs');
const path = require('path');

const createFile = (filePath, jsonData) => {
    try {
        // Ensure the directory exists
        const dirPath = path.dirname(filePath);
        console.log(dirPath)
        fs.mkdirSync(dirPath, { recursive: true });

        deleteFile(filePath)
    
        // Write JSON data to a new file
        fs.writeFileSync(filePath, jsonData);
        console.log('Data saved to file:', filePath);
    
        return true;
    }
    catch (error) {
        console.error('Error saving Data:', error.message);
        return false;
    }
}

const deleteFile = (filePath) => {
    try{
        // Delete the file if it already exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return true;
    }
    catch(error)
    {
        console.error('Error saving JSON data:', error.message)
        return false;
    }
}

module.exports = {
    createFile,
    deleteFile
};