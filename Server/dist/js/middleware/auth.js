"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";
// export interface CustomRequest extends Request {
//     email : string;
// }
class verifyToken {
    constructor() {
        this.verifyuser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                return res.status(403).json({ message: "Token not present" });
            }
            jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    console.error("Error verifying token:", err);
                    return res.status(403).json({ message: "Token not verified" });
                }
                req.body = Object.assign(Object.assign({}, req.body), decoded);
                // console.log(req.body, "this is the req body");
                // console.log(decoded, "this is the decoded email");
                next();
            });
        });
    }
}
exports.default = verifyToken;
