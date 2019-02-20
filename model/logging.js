const SimpleNodeLogger = require('simple-node-logger');
const path_util = require('./path_util');

const logger = {}

logger["api"] = SimpleNodeLogger.createSimpleLogger({
    logFilePath: path_util.resolve(process.env.API_LOG_FILE),
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
});

logger["translation"] = SimpleNodeLogger.createSimpleLogger({
    logFilePath: path_util.resolve(process.env.TRANSLATION_LOG_FILE),
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
});

module.exports = logger;