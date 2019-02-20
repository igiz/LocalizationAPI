require('./string_extensions')
const fs = require('fs');
const archiver = require('archiver');
const logger = require('./logging');

module.exports = {
    package: (files, archivePath) => {
        const result = new Promise((resolve , reject) => {
            try {
                const output = fs.createWriteStream(archivePath + "." + process.env.TASK_ARCHIVE_FORMAT);
                const archive = archiver(process.env.TASK_ARCHIVE_FORMAT, {
                    zlib: { level: process.env.COMPRESSION_LEVEL }
                });
        
                // pipe archive data to the file
                archive.pipe(output);
        
                for (let fileName in files) {
                    const file = files[fileName];
                    console.log("Adding {0} to archive {1}".format(fileName, archivePath));
                    archive.append(fs.createReadStream(file), { name: fileName });
                }
                
                archive.finalize();
                logger.api.info("Archived {0}".format(archivePath));
                resolve(0);
            } catch(error) {
                reject(error);
            }
        });

        return result;
    }
}