"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.destroy = exports.get = exports.create = void 0;
const Task_1 = __importDefault(require("../model/Task"));
const Label_1 = __importDefault(require("../model/Label"));
const create = async (req, res, next) => {
    const { title, desc, status, priority, deadline, tags, labelId } = req.body;
    try {
        const label = await Label_1.default.findById(labelId);
        if (!label) {
            throw new Error('No label found with this label id');
        }
        const task = await Task_1.default.create({
            title,
            desc,
            status,
            priority,
            deadline,
            tags,
            label,
            user: req.user
        });
        res.status(201).json({
            msg: 'Task created Successfull',
            data: task,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.create = create;
const get = async (req, res, next) => {
    try {
        const tasks = await Task_1.default.find({ user: req.user, project: false });
        res.status(200).json({
            msg: 'Your tasks',
            data: tasks,
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
        const task = await Task_1.default.findByIdAndDelete(id);
        res.json({
            msg: 'Task deleted succeful',
        });
    }
    catch (err) {
        return next(err);
    }
    ;
};
exports.destroy = destroy;
const update = async (req, res, next) => {
    const { id } = req.params;
    const { title, desc, status, priority, deadline, tags, labelId } = req.body;
    try {
        const label = await Label_1.default.findById(labelId);
        if (!label) {
            throw new Error('No label found with this label id');
        }
        const checkTask = await Task_1.default.findOne({ _id: id, user: req.user });
        if (!checkTask) {
            throw new Error('You don\'t have task with this id !');
        }
        const task = await Task_1.default.findByIdAndUpdate(id, {
            title,
            desc,
            status,
            priority,
            deadline,
            tags,
            label,
        }, {
            new: true,
        });
        res.status(201).json({
            msg: 'You have updated this task!',
            data: task,
        });
    }
    catch (err) {
        return next(err);
    }
    ;
};
exports.update = update;
