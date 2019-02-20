class TaskApiResponse {
    constructor(id, status, message) {
        this.Id = id;
        this.Status = status;
        this.Message = message;
    }
};

module.exports = TaskApiResponse;