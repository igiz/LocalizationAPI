class ApiResponse {
    constructor(status, message) {
        this.Status = status;
        this.Message = message;
    }
};

module.exports = ApiResponse;