require('./string_extensions');
const logger = require('./logging');
const fs = require('fs');
const path = require('path');

module.exports = {
    clean: (directory, keepLast) => {
        const files = fs.readdirSync(directory);
        if(files.length > keepLast){
            const fileStats = [];       
            for(let i in files) {
                const file = files[i];
                const fileFullPath = path.join(directory, file);
                fileStats[i] = {File:fileFullPath, Stats:fs.statSync(fileFullPath)};
            }

            const ordered = fileStats.sort((item1, item2) => {
                return item1.Stats.birthTimeMs - item2.Stats.birthTimeMs;
            }).reverse();

            const filesToRemove = ordered.slice(keepLast, ordered.length);

            for(let i in filesToRemove) {
                const fileToremove = filesToRemove[i].File;
                logger.api.info("Removing file {0}".format(fileToremove));
                fs.unlinkSync(fileToremove);
            }
        }
    }
}