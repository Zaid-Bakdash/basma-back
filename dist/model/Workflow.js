"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workflowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    nodes: [
        {
            id: String,
            type: { type: String },
            position: {
                x: Number,
                y: Number
            },
            data: mongoose_1.Schema.Types.Mixed
        }
    ],
    edges: [
        {
            id: String,
            source: String,
            target: String,
            data: mongoose_1.Schema.Types.Mixed
        }
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Workflow', workflowSchema);
