"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidate = void 0;
const express_validator_1 = require("express-validator");
const checkValidate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(421).json({ msg: 'Error Validation', filed: errors['errors'][0]['path'], error_msg: errors['errors'][0]['msg'] });
    }
    next();
};
exports.checkValidate = checkValidate;
