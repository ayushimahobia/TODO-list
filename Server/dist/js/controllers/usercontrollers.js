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
const userservices_1 = __importDefault(require("../Services/userservices"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";
class Userlist {
    constructor() {
        this.userservices = new userservices_1.default();
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, username } = req.body;
            console.log(req.header, "this is header in signup");
            console.log(req.body, " this is the req body");
            console.log(req.body.username, "this is the username");
            console.log(email, "this is signup email");
            console.log(password, " this is signup password");
            try {
                const checkSignup = yield this.userservices.signup(username, email, password);
                if (!checkSignup) {
                    return res.status(500).json({ message: "User creation failed" });
                }
                res.status(200).json({ message: "Successfully registered" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        });
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log(req.header, "this is header in signup");
            console.log(req.body, " this is the req body");
            try {
                const existingUser = yield this.userservices.login(email, password);
                if (!existingUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                const maxAge = 3 * 60 * 60;
                const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, jwtSecret, {
                    expiresIn: maxAge,
                });
                const result = {
                    email: existingUser.email,
                    id: existingUser.id,
                    token: `${token}`,
                };
                // req.headers.authorization = token;
                // req.headers = {
                //   ...req.headers,
                //   Authorization: token,
                // };
                // console.log(">>>>>>>>>>>>>>>>>>>>>> Request Headers: ", req.headers);
                res.status(200).json({ data: token, result, message: "login successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("refreshToken");
            res.status(200).json({ success: true, message: "LogOut SuccesFully" });
        });
    }        
}
exports.default = Userlist;
