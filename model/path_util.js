const appRoot = require('app-root-path');

const tokens = {
    "{appDir}" : appRoot.path
}

module.exports = {
    resolve: (path) => {
        let result = path;
        for(let token in tokens){
            result = result.replace(token, tokens[token]);
        }
        return result;
    }
}