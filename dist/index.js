"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./middleware/auth"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const auth_2 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const label_1 = __importDefault(require("./routes/label"));
const task_1 = __importDefault(require("./routes/task"));
const project_1 = __importDefault(require("./routes/project"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.get('/docs.json', (req, res) => {
    res.json(swagger_1.default);
});
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use('/auth', auth_2.default);
app.use('/user', auth_1.default, user_1.default);
app.use('/label', auth_1.default, label_1.default);
app.use('/task', auth_1.default, task_1.default);
app.use('/project', auth_1.default, project_1.default);
app.use((error, req, res, next) => {
    if (error instanceof Error && (error.message === 'Only image files are allowed!' ||
        error.message === 'Image files are not allowed!' ||
        error.message.includes('File type') ||
        error.message.includes('File extension'))) {
        return res.status(400).json({
            msg: error.message
        });
    }
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            msg: 'File size too large. Maximum size is 5MB.'
        });
    }
    // Handle label-related errors
    if (error instanceof Error && (error.message === 'label is all ready exist' ||
        error.message === 'No label with this id' ||
        error.message === 'You can update this label' ||
        error.message === 'This label is already exist !' ||
        error.message === 'Same label don\'t need to update !')) {
        return res.status(400).json({
            msg: error.message
        });
    }
    // Handle project-related errors
    if (error instanceof Error && (error.message === 'You don\'t have project with this id !' ||
        error.message === 'No Project matched with id !' ||
        error.message === 'You can\'t add task to this project !')) {
        return res.status(400).json({
            msg: error.message
        });
    }
    // Handle task-related errors
    if (error instanceof Error && (error.message === 'No label found with this label id' ||
        error.message === 'You don\'t have task with this id !')) {
        return res.status(400).json({
            msg: error.message
        });
    }
    // Handle auth-related errors
    if (error instanceof Error && (error.message === 'email is already token' ||
        error.message === 'Email or password not match')) {
        return res.status(400).json({
            msg: error.message
        });
    }
    if (error instanceof Error && (error.message)) {
        return res.status(400).json({
            msg: error.message
        });
    }
    console.error('Error:', error);
    res.status(500).json({
        msg: 'Internal server error'
    });
});
mongoose_1.default.connect('mongodb://localhost:27017/')
    .then(() => {
    app.listen(3000);
    console.log('app listing', 'http://localhost:3000');
}).catch(err => console.log(err));
