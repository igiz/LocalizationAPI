require('../string_extensions');
const ApiResponse = require('./api_response');

module.exports = {

    fileNotFoundResponse: () => {
        return new ApiResponse("Error', 'Please select a file");
    },

    notSupportedResponse: () =>  {
        return new ApiResponse("Error", "Not supported/no longer supported");
    },

    unknownErrorResponse: (error) => {
        return new ApiResponse("Error", "Unknown Error Occured: {0}".format(error));
    }

}