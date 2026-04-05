"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middleware/validate");
const LabelController_1 = require("../controller/LabelController");
const express_validator_1 = require("express-validator");
const routes = (0, express_1.Router)();
routes.post('/', [
    (0, express_validator_1.body)('label')
        .isString()
        .isLength({ min: 3, max: 10 })
], validate_1.checkValidate, LabelController_1.create);
routes.get('/', LabelController_1.get);
routes.delete('/:id', [
    (0, express_validator_1.param)('id', 'Id is not valid')
        .isString(),
    validate_1.checkValidate
], LabelController_1.destroy);
routes.patch('/:id', [
    (0, express_validator_1.param)('id', 'Id is not valid')
        .isString(),
    (0, express_validator_1.body)('label')
        .isString()
        .isLength({ min: 3, max: 10 }),
    validate_1.checkValidate
], LabelController_1.update);
exports.default = routes;
