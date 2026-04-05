"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyTaskOfProject = exports.updateTaskOfProject = exports.getTaskOfProject = exports.addTaskToProject = exports.update = exports.destroy = exports.get = exports.create = void 0;
const Project_1 = __importDefault(require("../model/Project"));
const Task_1 = __importDefault(require("../model/Task"));
const Label_1 = __importDefault(require("../model/Label"));
const create = async (req, res, next) => {
    const { title } = req.body;
    try {
        const project = await Project_1.default.create({
            title,
            tasks: [],
            user: req.user,
        });
        res.status(201).json({
            msg: 'project created successful',
            data: project,
        });
    }
    catch (err) {
        return next(err);
    }
    ;
};
exports.create = create;
const get = async (req, res, next) => {
    try {
        const projects = await Project_1.default.find({ user: req.user });
        res.status(200).json({
            msg: 'project created successful',
            data: projects,
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
        const project = await Project_1.default.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'project deleted successfully',
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
    const { title } = req.body;
    try {
        const checkProject = await Project_1.default.find({ id, user: req.user });
        if (!checkProject) {
            throw new Error('You don\'t have project with this id ! ');
        }
        const project = await Project_1.default.findByIdAndUpdate(id, {
            title,
        }, {
            new: true,
        });
        res.status(200).json({
            msg: 'project updated successfully',
            data: project
        });
    }
    catch (err) {
        return next(err);
    }
    ;
};
exports.update = update;
const addTaskToProject = async (req, res, next) => {
    const projectId = req.params.id;
    const { title, desc, status, priority, deadline, tags, labelId } = req.body;
    try {
        const project = await Project_1.default.findById(projectId);
        if (!project) {
            throw new Error('No Project matched with id !');
        }
        if (project.user.toString() !== req.user?._id.toString()) {
            throw new Error('You can\'t add task to this project !');
        }
        const label = await Label_1.default.findById(labelId);
        if (!label) {
            throw new Error('No label match with this id');
        }
        const task = await Task_1.default.create({
            title,
            desc,
            status,
            priority,
            deadline,
            label,
            tags,
            user: req.user,
            project: true,
        });
        project.tasks.push(task);
        await project.save();
        res.status(201).json({
            msg: 'Task added!',
            data: project
        });
    }
    catch (err) {
        return next(err);
    }
    ;
};
exports.addTaskToProject = addTaskToProject;
const getTaskOfProject = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Project_1.default.findById(id);
        if (!project) {
            throw new Error('No Project match with this id');
        }
        if (project.user.toString() !== req.user?._id.toString()) {
            throw new Error('You can\'t add task to this project !');
        }
        res.json({ msg: 'Project\'s tasks :', data: project.tasks });
    }
    catch (err) {
        next(err);
    }
};
exports.getTaskOfProject = getTaskOfProject;
const updateTaskOfProject = async (req, res, next) => {
    const { id } = req.params;
    const { taskId, title, desc, status, priority, deadline, tags, labelId } = req.body;
    try {
        const project = await Project_1.default.findById(id);
        if (!project) {
            throw new Error('No Project match with this id');
        }
        if (project.user.toString() !== req.user?._id.toString()) {
            throw new Error('You can\'t add task to this project !');
        }
        const label = await Label_1.default.findById(labelId);
        if (!label) {
            throw new Error('No label match this label id');
        }
        let tasks = project.tasks;
        project.tasks = project.tasks.map((taskItem) => {
            if (taskItem._id?.toString() === taskId.toString()) {
                return {
                    _id: taskItem._id,
                    title: title || taskItem.title,
                    desc: desc || taskItem.desc,
                    status: status || taskItem.status,
                    priority: priority || taskItem.priority,
                    deadline: deadline || taskItem.deadline,
                    tags: tags || taskItem.tags,
                    label: label || taskItem.label,
                };
            }
            else {
                return taskItem;
            }
        });
        project.save();
        res.status(201).json({
            msg: 'task updated succesfully !',
            data: project,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.updateTaskOfProject = updateTaskOfProject;
const destroyTaskOfProject = async (req, res, next) => {
    const { id } = req.params;
    const { taskId, title, desc, status, priority, deadline, tags, labelId } = req.body;
    try {
        const project = await Project_1.default.findById(id);
        if (!project) {
            throw new Error('No Project match with this id');
        }
        if (project.user.toString() !== req.user?._id.toString()) {
            throw new Error('You can\'t add task to this project !');
        }
        project.tasks = project.tasks.filter((taskItem) => {
            return (taskItem._id?.toString() !== taskId.toString());
        });
        project.save();
        res.json({ msg: 'Task has been deleted !', data: project });
    }
    catch (err) {
        return next(err);
    }
};
exports.destroyTaskOfProject = destroyTaskOfProject;
