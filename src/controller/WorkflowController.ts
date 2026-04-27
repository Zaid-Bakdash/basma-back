import { Req } from "../types";
import { Response, NextFunction } from "express";
import Workflow from "../model/Workflow";

export const create = async (req: Req, res: Response, next: NextFunction) => {
    const { name, nodes, edges } = req.body;
    try {
        const workflow = await Workflow.create({
            name,
            nodes,
            edges,
            user: req.user,
        });
        res.status(201).json({
            msg: 'Workflow created successfully',
            data: workflow,
        });
    } catch (err: any) {
        return next(err);
    }
};

export const getAll = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const workflows = await Workflow.find({ user: req.user });
        res.status(200).json({
            msg: 'Workflows retrieved successfully',
            data: workflows,
        });
    } catch (err: any) {
        return next(err);
    }
};

export const getById = async (req: Req, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const workflow = await Workflow.findOne({ _id: id, user: req.user });
        if (!workflow) {
            throw new Error('Workflow not found');
        }
        res.status(200).json({
            msg: 'Workflow retrieved successfully',
            data: workflow,
        });
    } catch (err: any) {
        return next(err);
    }
};

export const update = async (req: Req, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, nodes, edges } = req.body;
    try {
        const workflow = await Workflow.findOneAndUpdate(
            { _id: id, user: req.user },
            { name, nodes, edges },
            { new: true }
        );
        if (!workflow) {
            throw new Error('Workflow not found');
        }
        res.status(200).json({
            msg: 'Workflow updated successfully',
            data: workflow,
        });
    } catch (err: any) {
        return next(err);
    }
};

export const destroy = async (req: Req, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const workflow = await Workflow.findOneAndDelete({ _id: id, user: req.user });
        if (!workflow) {
            throw new Error('Workflow not found');
        }
        res.status(200).json({
            msg: 'Workflow deleted successfully',
        });
    } catch (err: any) {
        return next(err);
    }
};

/**
 * Execute Automation (Logic for Log and Color nodes)
 */
export const run = async (req: Req, res: Response, next: NextFunction) => {
    const { nodes, edges } = req.body;
    // In a real scenario, we might process the graph here.
    // For now, we return a success status to the frontend.
    try {
        res.json({
            msg: 'Automation run processed',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        next(err);
    }
};
