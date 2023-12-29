"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
class FileUploads {
    constructor() {
        this.Uploads = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './ImageUploads');
                },
                filename: function (req, file, cb) {
                    cb(null, `${Date.now()}->${file.originalname}`);
                }
            })
        }).single('image');
        this.middleware = (req, res, next) => {
            next();
        };
    }
}
exports.default = FileUploads;
