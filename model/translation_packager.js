const packager = require('./packager');
const path = require('path');
const glob = require('glob-promise'); 

module.exports = {
    package: (configuration, packageName) => {
        const result = new Promise((resolve, reject) => {
            try {
                const input = process.env[configuration+"_INPUT"];
                const extensionIndex = input.lastIndexOf(".");
                const outputFilter = input.substring(0, extensionIndex) + "*" + input.substring(extensionIndex);
                const translationsLocation = process.env[configuration + "_TRANSLATIONS_LOCATION"];
    
                glob(path.join(translationsLocation, outputFilter)).then(((files) => {
                    const toArchive = {};
                    for (let key in files) {
                        const file = files[key];
                        const fileName = path.basename(file);
                        toArchive[fileName] = file;
                    }
                    const packageDirectory = process.env[configuration + "_OUTPUT_LOCATION"];
                    packager.package(toArchive, path.join(packageDirectory, packageName))
                    .then(() => {
                        resolve(0);
                    }).catch(error => {
                        reject(error);
                    });      
                })).catch(error => {
                    reject(error);
                });
            } catch(error) {
                reject(error);
            }
        });

        return result;
    }
}