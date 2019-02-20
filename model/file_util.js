module.exports = {
    moveFile: (file, fileSavePath) => {
        const result = new Promise((resolve, reject) => {
            file.mv(fileSavePath, (err) => {
                reject("Failed to save file on server. Contact the administrator. Error: " + err);
            });
            resolve(0);
        });
    
        return result;
    }
}