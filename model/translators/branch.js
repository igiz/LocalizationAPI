require('../string_extensions');
const Task = require('../task');
const logger = require('../logging');
const psRunner = require('../powershell_runner');
const path = require('path');

const powershellWrapper = path.join(process.cwd(),"model/powershell_util","PowershellCommandWrapper.ps1");

module.exports = {

    createTask: (branch) => {
        let task = new Task(branch, () => {
            const command = "{0} -WorkingDirectory '{1}' -Script '{2}' -Arguments '{3}'"
            .format(powershellWrapper, process.env.SCRIPTS_LOCATION, process.env.SCRIPTS_RUN_ALL_SCRIPT, branch);
            psRunner.run(command).then(() => {
                task.finished();
            }).catch(error => {
                throw error;
            })
        });

        logger.api.info("Created translation task for branch {0}"
        .format(task.Project));

        return task;
    }
}