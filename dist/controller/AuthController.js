"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.getAllUsers = exports.logIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_2 = require("../config/config");
const signUp = async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const checkUser = await User_1.default.findOne({ email: email });
        if (checkUser) {
            throw new Error('email is already token');
        }
    }
    catch (err) {
        return next(err);
    }
    let hashedPassword = '';
    try {
        const hp = await bcrypt_1.default.hash(password, config_1.bcryptConfig.saltyHash);
        hashedPassword = hp;
    }
    catch (err) {
        return next(err);
    }
    ;
    let user;
    try {
        user = await User_1.default.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword,
            img: '',
        });
    }
    catch (err) {
        return next(err);
    }
    ;
    let accessToken = '';
    if (user) {
        accessToken = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, }, config_2.jwtConfig.secertKey);
    }
    res.json({ data: user, msg: 'welcome !', token: accessToken });
};
exports.signUp = signUp;
const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User_1.default.findOne({ email: email });
    }
    catch (err) {
        return next(err);
    }
    if (!user) {
        throw new Error('Email or password not match');
    }
    if (user) {
        let check;
        try {
            check = await bcrypt_1.default.compare(password, user?.password);
        }
        catch (err) {
            return next(err);
        }
        if (check) {
            let accessToken = '';
            accessToken = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, }, config_2.jwtConfig.secertKey);
            res.json({ data: user, msg: 'welcome !', token: accessToken });
        }
        else {
            throw new Error('Email or password not match');
        }
    }
};
exports.logIn = logIn;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find();
        res.json({ msg: '', users });
    }
    catch (err) {
        return next(err);
    }
    ;
};
exports.getAllUsers = getAllUsers;
const getProfile = async (req, res, next) => {
};
exports.getProfile = getProfile;
