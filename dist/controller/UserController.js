"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePicture = exports.myProfile = void 0;
const User_1 = __importDefault(require("../model/User"));
const myProfile = (req, res, next) => {
    res.json({
        msg: 'Your profile !',
        data: req.user
    });
};
exports.myProfile = myProfile;
const uploadProfilePicture = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                msg: 'You didn\'t upload any image !'
            });
        }
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                msg: 'Please log in again !'
            });
        }
        const fileName = req.file.filename;
        const imageUrl = `/uploads/${fileName}`;
        const updatedUser = await User_1.default.findByIdAndUpdate(req.user._id, { img: imageUrl }, { new: true, select: '-password' });
        if (!updatedUser) {
            return res.status(404).json({
                msg: 'User not found !'
            });
        }
        res.json({
            success: true,
            message: 'Profile picture uploaded successfully',
            data: {
                user: updatedUser,
                imageUrl: imageUrl
            }
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.uploadProfilePicture = uploadProfilePicture;
