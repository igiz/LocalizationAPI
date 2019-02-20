const express = require('express');
const taskRunner = require('../model/task_runner');
const TaskApiResponse = require('../model/responses/task_api_response');
const commonResponses = require('../model/responses/common_responses');

// The different types of translators we support.
const projectTranslator = require('../model/translators/project');
const branchTranslator = require('../model/translators/branch');

const router = express.Router();

router.get("/:id", (request, response) => {
    const taskId = request.params.id;
    if(taskId) {
        response.status(200).send(taskStatus(taskId));
    }
});

router.post("/", (request, response) => {
    const branch = request.query.branch;

    if(branch) {
        let task = branchTranslator.createTask(branch);
        response.status(200).send(JSON.stringify(queueTask(task)));
    } else {
        if (request.files.fileUploaded) {
            let task = projectTranslator.createTask(request.files.fileUploaded);
            response.status(200).send(JSON.stringify(queueTask(task)));   
        } else {
            response.status(404).send(JSON.stringify(commonResponses.fileNotFoundResponse()));
        }
    }
});

function queueTask(task) {
    taskRunner.run(task);
    return new TaskApiResponse(task.Id, task.Status, task.Message);
}

function taskStatus(taskId) {
    const status = taskRunner.status(taskId);
    return new TaskApiResponse(taskId, status.Status, status.Message);
}

module.exports = router;
