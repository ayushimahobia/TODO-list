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
const userdao_1 = __importDefault(require("../Dao/userdao"));
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class userService {
    constructor() {
        this.userdao = new userdao_1.default();
        this.signup = (username, email, password) => __awaiter(this, void 0, void 0, function* () {
            if (!email || !password || !username) {
                throw (0, http_errors_1.default)(404, "Please fill all fields");
            }
            const checkExisting = yield this.userdao.getuserbyId(email);
            if (checkExisting) {
                throw (0, http_errors_1.default)(404, "email exist");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            return yield this.userdao.signupdao(username, email, hashedPassword);
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw (0, http_errors_1.default)(404, "Missing credentials");
            }
            const checkExisting = yield this.userdao.getuserbyId(email);
            if (!checkExisting) {
                throw (0, http_errors_1.default)(404, "User not found");
            }
            const matchPassword = yield bcrypt_1.default.compare(password, checkExisting.password);
            if (!matchPassword) {
                throw (0, http_errors_1.default)(404, "incorrect Password");
            }
            return checkExisting;
        });
        this.logout = () => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = userService;
