const uuid = require('uuid/v4');

class Task {
    constructor(project, action) {
        this.Id = project + "_" + uuid();
        this.Message = ""
        this.Cancel = false;
        this.Status = "Queued";
        this.Project = project;
        this.Started = 0;
        this.Finished = 0;
        this.action = action;
    }

    run() {
        this.Started = new Date().getTime();
        this.Status = "Running";
        let result = new Promise((resolve , reject) => {
            try{
                this.action();
                resolve(0);
            } catch(error) {
                error(error);
                reject(error);
            }
        }); 
        
        return result;
    }
    
    finished() {
        this.Finished = new Date().getTime();
        this.Status = "Finished";
        this.Message = "Task executed successfully";
    }
    
    error(error) {
        this.Finished = new Date().getTime();
        this.Status = "Error";
        this.Message = error;
    }
};

module.exports = Task;