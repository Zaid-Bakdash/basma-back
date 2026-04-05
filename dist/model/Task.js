"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    priority: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    },
    project: {
        default: false,
        type: Boolean
    },
    deadline: {
        required: true,
        type: String,
    },
    tags: {
        required: true,
        type: Array,
    },
    label: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Label',
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('task', taskSchema);
