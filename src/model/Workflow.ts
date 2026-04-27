import { Schema, model } from "mongoose";

const workflowSchema = new Schema({
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
            data: Schema.Types.Mixed
        }
    ],
    edges: [
        {
            id: String,
            source: String,
            target: String,
            data: Schema.Types.Mixed
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,
});

export default model('Workflow', workflowSchema);
