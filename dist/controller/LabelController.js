"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.destroy = exports.get = exports.create = void 0;
const Label_1 = __importDefault(require("../model/Label"));
const create = async (req, res, next) => {
    const { label } = req.body;
    try {
        const checkLabel = await Label_1.default.findOne({ label: label });
        if (checkLabel) {
            throw new Error('label is all ready exist');
        }
    }
    catch (err) {
        return next(err);
    }
    try {
        const newLabel = await Label_1.default.create({ label: label, user: req.user });
        res.status(201).json({
            msg: 'Label Created Succefully',
            label: newLabel,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.create = create;
const get = async (req, res, next) => {
    try {
        const labels = await Label_1.default.find();
        res.json({
            msg: 'Labels ',
            data: labels,
        });
    }
    catch (err) {
        return next(err);
    }
    ;
};
exports.get = get;
const destroy = async (req, res, next) => {
    const { id } = req.params;
    try {
        const label = await Label_1.default.findById(id);
        if (label) {
            await label.deleteOne();
            res.status(200).json({ msg: 'label has been deleted!' });
        }
        else {
            throw new Error('No label with this id');
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.destroy = destroy;
const update = async (req, res, next) => {
    const { id } = req.params;
    const { label } = req.body;
    try {
        const theLabel = await Label_1.default.findById(id);
        if (!theLabel) {
            throw new Error('No label with this id');
        }
        if (req.user && (theLabel.user.toString() !== req.user._id.toString())) {
            throw new Error('You can update this label');
        }
        const checkExist = await Label_1.default.findOne({ label });
        if (checkExist) {
            throw new Error('This label is already exist !');
        }
        if (label === theLabel.label) {
            throw new Error('Same label don\'t need to update !');
        }
        const lastLabel = await Label_1.default.findByIdAndUpdate(id, { label }, { new: true });
        res.json({
            msg: 'label has been updated !',
            label: lastLabel,
        });
    }
    catch (err) {
        return next(err);
    }
    ;
};
exports.update = update;
