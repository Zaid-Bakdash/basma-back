"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const TaskController_1 = require("../controller/TaskController");
const routes = (0, express_1.Router)();
routes.post('/', [
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
], TaskController_1.create);
routes.get('/', TaskController_1.get);
routes.delete('/:id', [
    (0, express_validator_1.param)('id', 'Id is not valid')
        .isString(),
    validate_1.checkValidate
], TaskController_1.destroy);
routes.patch('/:id', [
    (0, express_validator_1.param)('id', 'Id is not valid')
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
], TaskController_1.update);
exports.default = routes;
