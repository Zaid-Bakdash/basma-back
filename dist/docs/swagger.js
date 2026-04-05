"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerSpec = {
    openapi: '3.0.3',
    info: {
        title: 'Basma API',
        version: '1.0.0',
        description: 'Swagger documentation for the Basma backend APIs.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local development server',
        },
    ],
    tags: [
        { name: 'Auth', description: 'Authentication endpoints' },
        { name: 'Users', description: 'User profile and uploads' },
        { name: 'Labels', description: 'Label management endpoints' },
        { name: 'Tasks', description: 'Standalone task endpoints' },
        { name: 'Projects', description: 'Project and project-task endpoints' },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            ErrorResponse: {
                type: 'object',
                properties: {
                    msg: { type: 'string', example: 'Internal server error' },
                },
            },
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '67f11d0ec7ebf93829d9b0cc' },
                    firstName: { type: 'string', example: 'Anas' },
                    lastName: { type: 'string', example: 'Ali' },
                    email: { type: 'string', format: 'email', example: 'anas@example.com' },
                    img: { type: 'string', example: '/uploads/profile-123.png' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            AuthRequest: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email', example: 'anas@example.com' },
                    password: { type: 'string', example: '12345678' },
                },
            },
            SignUpRequest: {
                type: 'object',
                required: ['first_name', 'last_name', 'email', 'password'],
                properties: {
                    first_name: { type: 'string', minLength: 3, maxLength: 10, example: 'Anas' },
                    last_name: { type: 'string', minLength: 3, maxLength: 10, example: 'Ali' },
                    email: { type: 'string', format: 'email', example: 'anas@example.com' },
                    password: { type: 'string', minLength: 8, maxLength: 20, example: '12345678' },
                },
            },
            AuthResponse: {
                type: 'object',
                properties: {
                    msg: { type: 'string', example: 'welcome !' },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                    data: { $ref: '#/components/schemas/User' },
                },
            },
            Label: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '67f11d0ec7ebf93829d9b0dd' },
                    label: { type: 'string', example: 'Bug' },
                    user: { type: 'string', example: '67f11d0ec7ebf93829d9b0cc' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            LabelRequest: {
                type: 'object',
                required: ['label'],
                properties: {
                    label: { type: 'string', minLength: 3, maxLength: 10, example: 'Design' },
                },
            },
            Task: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '67f11d0ec7ebf93829d9b0ee' },
                    title: { type: 'string', example: 'Build docs' },
                    desc: { type: 'string', example: 'Create Swagger documentation' },
                    priority: { type: 'string', example: 'high' },
                    status: { type: 'string', example: 'todo' },
                    project: { type: 'boolean', example: false },
                    deadline: { type: 'string', example: '2026-04-10' },
                    tags: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['backend', 'docs'],
                    },
                    label: { type: 'string', example: '67f11d0ec7ebf93829d9b0dd' },
                    user: { type: 'string', example: '67f11d0ec7ebf93829d9b0cc' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            TaskRequest: {
                type: 'object',
                required: ['title', 'desc', 'deadline', 'tags', 'priority', 'labelId', 'status'],
                properties: {
                    title: { type: 'string', minLength: 3, maxLength: 15, example: 'Finish API' },
                    desc: { type: 'string', maxLength: 30, example: 'Write endpoint documentation' },
                    deadline: { type: 'string', example: '2026-04-12' },
                    tags: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['swagger', 'express'],
                    },
                    priority: { type: 'string', example: 'medium' },
                    labelId: { type: 'string', example: '67f11d0ec7ebf93829d9b0dd' },
                    status: { type: 'string', example: 'in-progress' },
                },
            },
            Project: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '67f11d0ec7ebf93829d9b0ff' },
                    title: { type: 'string', example: 'Website Redesign' },
                    tasks: {
                        type: 'array',
                        items: { oneOf: [{ type: 'string' }, { $ref: '#/components/schemas/Task' }] },
                    },
                    user: { type: 'string', example: '67f11d0ec7ebf93829d9b0cc' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            ProjectRequest: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: { type: 'string', minLength: 3, maxLength: 15, example: 'API Project' },
                },
            },
            ProjectTaskUpdateRequest: {
                allOf: [
                    { $ref: '#/components/schemas/TaskRequest' },
                    {
                        type: 'object',
                        required: ['taskId'],
                        properties: {
                            taskId: { type: 'string', example: '67f11d0ec7ebf93829d9b0ee' },
                        },
                    },
                ],
            },
            DeleteProjectTaskRequest: {
                type: 'object',
                required: ['taskId'],
                properties: {
                    taskId: { type: 'string', example: '67f11d0ec7ebf93829d9b0ee' },
                },
            },
            UploadProfilePictureRequest: {
                type: 'object',
                required: ['image'],
                properties: {
                    image: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    },
    paths: {
        '/auth/sign-up': {
            post: {
                tags: ['Auth'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/SignUpRequest' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'User created successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/AuthResponse' },
                            },
                        },
                    },
                    '400': {
                        description: 'Validation or business error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' },
                            },
                        },
                    },
                },
            },
        },
        '/auth': {
            post: {
                tags: ['Auth'],
                summary: 'Login user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AuthRequest' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Login successful',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/AuthResponse' },
                            },
                        },
                    },
                    '400': {
                        description: 'Validation or credential error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' },
                            },
                        },
                    },
                },
            },
            get: {
                tags: ['Auth'],
                summary: 'Get all users',
                responses: {
                    '200': {
                        description: 'Users list',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        msg: { type: 'string' },
                                        users: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/User' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/user/profile': {
            get: {
                tags: ['Users'],
                summary: 'Get current user profile',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Current profile',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        msg: { type: 'string', example: 'Your profile !' },
                                        data: { $ref: '#/components/schemas/User' },
                                    },
                                },
                            },
                        },
                    },
                    '403': {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' },
                            },
                        },
                    },
                },
            },
        },
        '/user/upload-profile-picture': {
            post: {
                tags: ['Users'],
                summary: 'Upload profile picture',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: { $ref: '#/components/schemas/UploadProfilePictureRequest' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Image uploaded successfully',
                    },
                    '400': {
                        description: 'Upload error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' },
                            },
                        },
                    },
                    '401': {
                        description: 'User missing',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' },
                            },
                        },
                    },
                },
            },
        },
        '/label': {
            post: {
                tags: ['Labels'],
                summary: 'Create a label',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LabelRequest' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Label created',
                    },
                    '400': {
                        description: 'Validation or business error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' },
                            },
                        },
                    },
                },
            },
            get: {
                tags: ['Labels'],
                summary: 'Get labels',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'List of labels',
                    },
                },
            },
        },
        '/label/{id}': {
            delete: {
                tags: ['Labels'],
                summary: 'Delete a label',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Label deleted',
                    },
                    '400': {
                        description: 'Invalid or missing label',
                    },
                },
            },
            patch: {
                tags: ['Labels'],
                summary: 'Update a label',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LabelRequest' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Label updated',
                    },
                    '400': {
                        description: 'Validation or business error',
                    },
                },
            },
        },
        '/task': {
            post: {
                tags: ['Tasks'],
                summary: 'Create a standalone task',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/TaskRequest' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Task created',
                    },
                    '400': {
                        description: 'Validation or business error',
                    },
                },
            },
            get: {
                tags: ['Tasks'],
                summary: 'Get current user standalone tasks',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Tasks list',
                    },
                },
            },
        },
        '/task/{id}': {
            delete: {
                tags: ['Tasks'],
                summary: 'Delete a standalone task',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Task deleted',
                    },
                },
            },
            patch: {
                tags: ['Tasks'],
                summary: 'Update a standalone task',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/TaskRequest' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Task updated',
                    },
                    '400': {
                        description: 'Validation or business error',
                    },
                },
            },
        },
        '/project': {
            post: {
                tags: ['Projects'],
                summary: 'Create a project',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ProjectRequest' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Project created',
                    },
                },
            },
            get: {
                tags: ['Projects'],
                summary: 'Get current user projects',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Projects list',
                    },
                },
            },
        },
        '/project/{id}': {
            delete: {
                tags: ['Projects'],
                summary: 'Delete a project',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Project deleted',
                    },
                },
            },
            patch: {
                tags: ['Projects'],
                summary: 'Update a project title',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ProjectRequest' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Project updated',
                    },
                },
            },
        },
        '/project/add-task/{id}': {
            post: {
                tags: ['Projects'],
                summary: 'Add a task to a project',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Project id',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/TaskRequest' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Task added to project',
                    },
                },
            },
        },
        '/project/get-tasks/{id}': {
            get: {
                tags: ['Projects'],
                summary: 'Get tasks of a project',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Project id',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Project tasks list',
                    },
                },
            },
        },
        '/project/update-task/{id}': {
            patch: {
                tags: ['Projects'],
                summary: 'Update a task inside a project',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Project id',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ProjectTaskUpdateRequest' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Project task updated',
                    },
                },
            },
        },
        '/project/delete-task/{id}': {
            delete: {
                tags: ['Projects'],
                summary: 'Delete a task from a project',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Project id',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/DeleteProjectTaskRequest' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Project task deleted',
                    },
                },
            },
        },
    },
};
exports.default = swaggerSpec;
