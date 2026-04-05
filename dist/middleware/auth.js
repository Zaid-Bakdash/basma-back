"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const User_1 = __importDefault(require("../model/User"));
const auth = async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1];
    if (token) {
        try {
            const uncoded = await jsonwebtoken_1.default.verify(token, config_1.jwtConfig.secertKey);
            if (uncoded && uncoded._id) {
                const user = await User_1.default.findById(uncoded._id);
                if (user) {
                    req.user = user;
                    next();
                }
            }
        }
        catch (err) {
            res.status(403).json({ msg: 'Not authurized ! please log in again!' });
            console.log(err);
        }
    }
    else {
        res.status(403).json({ msg: 'Not authurized ! please log in again!' });
    }
};
exports.default = auth;
