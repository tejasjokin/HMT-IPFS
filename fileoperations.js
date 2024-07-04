const fs = require('fs');

const createFile = (filePath, jsonData) => {
    try {
        deleteFile(filePath)
    
        // Write JSON data to a new file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        console.log('JSON data saved to file:', filePath);
    
        return true;
    }
    catch (error) {
        console.error('Error saving JSON data:', error.message);
        return false;
    }
}

const deleteFile = (filePath) => {
    try{
        // Delete the file if it already exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log('Existing file deleted');
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