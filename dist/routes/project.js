"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = require("../controller/ProjectController");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const routes = (0, express_1.Router)();
routes.post('/', [
    (0, express_validator_1.body)('title', 'title id has to be at least 3 chars and 15')
        .isString()
        .isLength({ min: 3, max: 15 }),
    validate_1.checkValidate,
], ProjectController_1.create);
routes.get('/', ProjectController_1.get);
routes.delete('/:id', [
    (0, express_validator_1.param)('id', 'Id is not valid')
        .isString(),
    validate_1.checkValidate
], ProjectController_1.destroy);
routes.patch('/:id', [
    (0, express_validator_1.param)('id', 'Id is not valid')
        .isString(),
    (0, express_validator_1.body)('title', 'title id has to be at least 3 chars and 15')
        .isString()
        .isLength({ min: 3, max: 15 }),
    validate_1.checkValidate
], ProjectController_1.update);
routes.post('/add-task/:id', [
    (0, express_validator_1.param)('id', 'Id is not valid').isString(),
    (0, express_validator_1.body)('title', 'title is a required filed')
        .isString()
        .isLength({ min: 3, max: 15 }),
    (0, express_validator_1.body)('desc', 'desc is a required filed')
        .isString()
        .isLength({ min: 0, max: 30 }),
    (0, express_validator_1.body)('deadline', 'deadline is required')
        .isString(),
    (0, express_validator_1.body)('tags', 'tags is required')
        .isArray(),
    (0, express_validator_1.body)('priority', 'priority is required')
        .isString(),
    (0, express_validator_1.body)('labelId', 'label id is required')
        .isString(),
    (0, express_validator_1.body)('status', 'status is required ')
        .isString(),
    validate_1.checkValidate,
], ProjectController_1.addTaskToProject);
routes.get('/get-tasks/:id', [(0, express_validator_1.param)('id').isString(), validate_1.checkValidate], ProjectController_1.getTaskOfProject);
routes.patch('/update-task/:id', [
    (0, express_validator_1.param)('id').isString(),
    (0, express_validator_1.body)('taskId', 'title is a required filed')
        .isString(),
    (0, express_validator_1.body)('title', 'title is a required filed')
        .isString()
        .isLength({ min: 3, max: 15 }),
    (0, express_validator_1.body)('desc', 'desc is a required filed')
        .isString()
        .isLength({ min: 0, max: 30 }),
    (0, express_validator_1.body)('deadline', 'deadline is required')
        .isString(),
    (0, express_validator_1.body)('tags', 'tags is required')
        .isArray(),
    (0, express_validator_1.body)('priority', 'priority is required')
        .isString(),
    (0, express_validator_1.body)('labelId', 'label id is required')
        .isString(),
    (0, express_validator_1.body)('status', 'status is required ')
        .isString(),
    validate_1.checkValidate
], ProjectController_1.updateTaskOfProject);
routes.delete('/delete-task/:id', [
    (0, express_validator_1.param)('id', 'Id is not valid').isString(),
    (0, express_validator_1.body)('taskId', 'taskId is a required filed')
        .isString(),
    validate_1.checkValidate,
], ProjectController_1.destroyTaskOfProject);
exports.default = routes;
