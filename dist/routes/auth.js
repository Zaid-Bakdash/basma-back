"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controller/AuthController");
const validate_1 = require("../middleware/validate");
const routes = (0, express_1.Router)();
routes.post('/sign-up', [
    (0, express_validator_1.body)('first_name', 'first_name is required (3 chars atleast)')
        .isString()
        .isLength({ min: 3, max: 10 }),
    (0, express_validator_1.body)('last_name', 'last_name is required (3 chars atleast)')
        .isString()
        .isLength({ min: 3, max: 10 }),
    (0, express_validator_1.body)('email', 'email is required to be email')
        .isString()
        .isEmail(),
    (0, express_validator_1.body)('password', 'password is required to be 8 nimurce atleast')
        .isNumeric()
        .isLength({ min: 8, max: 20 }),
    validate_1.checkValidate,
], AuthController_1.signUp);
routes.post('/', [
    (0, express_validator_1.body)('email', 'email is required to be email')
        .isString()
        .isEmail(),
    (0, express_validator_1.body)('password', 'password is required to be 8 nimurce atleast')
        .isNumeric()
        .isLength({ min: 8, max: 20 }),
    validate_1.checkValidate
], AuthController_1.logIn);
routes.get('/', AuthController_1.getAllUsers);
exports.default = routes;
