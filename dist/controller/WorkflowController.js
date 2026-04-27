"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.destroy = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const Workflow_1 = __importDefault(require("../model/Workflow"));
const create = async (req, res, next) => {
    const { name, nodes, edges } = req.body;
    try {
        const workflow = await Workflow_1.default.create({
            name,
            nodes,
            edges,
            user: req.user,
        });
        res.status(201).json({
            msg: 'Workflow created successfully',
            data: workflow,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.create = create;
const getAll = async (req, res, next) => {
    try {
        const workflows = await Workflow_1.default.find({ user: req.user });
        res.status(200).json({
            msg: 'Workflows retrieved successfully',
            data: workflows,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.getAll = getAll;
const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const workflow = await Workflow_1.default.findOne({ _id: id, user: req.user });
        if (!workflow) {
            throw new Error('Workflow not found');
        }
        res.status(200).json({
            msg: 'Workflow retrieved successfully',
            data: workflow,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.getById = getById;
const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, nodes, edges } = req.body;
    try {
        const workflow = await Workflow_1.default.findOneAndUpdate({ _id: id, user: req.user }, { name, nodes, edges }, { new: true });
        if (!workflow) {
            throw new Error('Workflow not found');
        }
        res.status(200).json({
            msg: 'Workflow updated successfully',
            data: workflow,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.update = update;
const destroy = async (req, res, next) => {
    const { id } = req.params;
    try {
        const workflow = await Workflow_1.default.findOneAndDelete({ _id: id, user: req.user });
        if (!workflow) {
            throw new Error('Workflow not found');
        }
        res.status(200).json({
            msg: 'Workflow deleted successfully',
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.destroy = destroy;
/**
 * Execute Automation (Logic for Log and Color nodes)
 */
const run = async (req, res, next) => {
    const { nodes, edges } = req.body;
    // In a real scenario, we might process the graph here.
    // For now, we return a success status to the frontend.
    try {
        res.json({
            msg: 'Automation run processed',
            timestamp: new Date().toISOString()
        });
    }
    catch (err) {
        next(err);
    }
};
exports.run = run;
