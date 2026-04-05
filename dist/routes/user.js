"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const multer_1 = __importDefault(require("../config/multer"));
const routes = (0, express_1.Router)();
routes.get('/profile', UserController_1.myProfile);
routes.post('/upload-profile-picture', multer_1.default.single('image'), UserController_1.uploadProfilePicture);
exports.default = routes;
