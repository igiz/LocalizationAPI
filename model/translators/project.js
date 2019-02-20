require('../string_extensions');
const Task = require('../task');
const psRunner = require('../powershell_runner');
const path = require('path');
const packager = require('../translation_packager');
const cleaner = require('../cleaner');
const logger = require('../logging');
const fileUtilities = require('../file_util');

const powershellWrapper = path.join(process.cwd(),"model/powershell_util","PowershellCommandWrapper.ps1");

function configurationFromFile(fileName) {
    switch(fileName) {
       case process.env.H_WEB_INPUT:
           return "H_WEB";
       default:
           throw "Project not supported/no longer supported";
    }
}

module.exports = {

    createTask: (uploadedFile) => {
        let task = new Task(configType, () => {
            try {
                const configType = configurationFromFile(uploadedFile.name);
                if(configType) {
                    const fileSavePath = path.join(process.env[configType + "_TRANSLATIONS_LOCATION"], uploadedFile.name);
                    const movedFile = fileUtilities.moveFile(uploadedFile, fileSavePath);
                    movedFile.then(() => {
                        const command = "{0} -WorkingDirectory '{1}' -Script '{2}'"
                        .format(powershellWrapper, process.env.SCRIPTS_LOCATION, process.env.SCRIPTS_RUN_ALL_SCRIPT);

                        psRunner.run(command).then(() => {
                            task.finished();
                            packager.package(task.Project, task.Id).then(() => {
                                cleaner.clean(process.env[task.Project + "_OUTPUT_LOCATION"], process.env.KEEP_LAST);
                                resolve(0);
                            }).catch(error => {
                                reject(error);
                            });
                        }).catch(error => {     
                            task.error(error);
                            reject(error);
                        });
                    }, (error) => { throw error });
                } 
            } catch(error) {
                task.error(error);
                reject(error);
            }
        });
    
        logger.api.info("Created translation task for project {0}".format(task.Project));
    
        return task;
    }
};