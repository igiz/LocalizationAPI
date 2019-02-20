const logger = require('./logging');

const tasks = {}

function scheduleRemoveTask(taskId) {
    setTimeout(() => {
        let task = tasks[taskId];
        logger.api.info("Removing task {0} for project {1}".format(taskId, task.Project));
        delete tasks[taskId]; 
    }, (process.env.TASK_REMOVAL_INTERVAL_HOURS * 3600000));
};

module.exports = {

    run: (task) => {
        tasks[task.Id] = task;
        task.run().then(() => {
            scheduleRemoveTask(task.Id);
        }).catch(() => {
            scheduleRemoveTask(task.Id);
        });
        return task.Id;
    },

    status: (taskid) => {
        let result = {Status:"Unknown", Message:""};
        let task = tasks[taskid];
        if(task) {
            result.Status = task.Status;
            result.Message = task.Message;
        }
        return result
    }
}