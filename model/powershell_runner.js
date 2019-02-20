require('./string_extensions.js');
const shell = require('node-powershell');
const logger = require('./logging');

module.exports = {
    run: (command) => {
        const result = new Promise((resolve, reject) => {
            const ps = new shell({
                executionPolicy: "Bypass",
                noProfile: true
            });

            ps.addCommand(command)
            logger.api.debug("Executing powershell command: {0}".format(command));
            ps.invoke().then(output => {
                logger.api.debug("Powershell script execution successfully complete")
                resolve(0);
            }).catch(error => { 
                logger.api.error("Powershell script execution failed: {0}".format(error))
                ps.dispose();
                reject(error);
            });

            ps.streams.stdout.on("data", (data) => {
                console.log(data);
                logger.translation.log(data)
            });
        });

        return result;
    }
}