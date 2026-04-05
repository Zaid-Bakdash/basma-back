"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadsDir = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
// Option 1: Block ALL image files completely
const blockImagesFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(new Error('Image files are not allowed!'));
    }
    else {
        cb(null, true);
    }
};
// Option 2: Allow only specific file types (excluding images)
const allowSpecificTypesFilter = (req, file, cb) => {
    // Define allowed file types (excluding images)
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'text/csv',
        'application/json',
        'application/xml'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`File type ${file.mimetype} is not allowed!`));
    }
};
// Option 3: Allow images but filter by content (more advanced)
const contentBasedFilter = (req, file, cb) => {
    // Check file extension and mimetype
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt', '.csv', '.json', '.xml'];
    const fileExtension = path_1.default.extname(file.originalname).toLowerCase();
    if (file.mimetype.startsWith('image/')) {
        cb(new Error('Image files are not allowed!'));
    }
    else if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    }
    else {
        cb(new Error(`File extension ${fileExtension} is not allowed!`));
    }
};
// Option 4: Original filter (allow images only)
const allowImagesFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
// Choose which filter to use by changing this line:
const fileFilter = allowImagesFilter; // Change this to use different filters
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});
exports.default = upload;
