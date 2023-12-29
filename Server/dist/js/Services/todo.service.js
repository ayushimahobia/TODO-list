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
const todoDao_1 = __importDefault(require("../Dao/todoDao"));
const http_errors_1 = __importDefault(require("http-errors"));
class TodoListService {
    constructor() {
        this.todoDao = new todoDao_1.default();
        this.addImage = (img, id) => __awaiter(this, void 0, void 0, function* () {
            if (!img || !id) {
                throw (0, http_errors_1.default)(404, "please upload Image only");
            }
            return yield this.todoDao.addImagedao(img, id);
        });
        this.getTodosservices = (userId) => __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw (0, http_errors_1.default)(404, "Id Not Found");
            }
            return yield this.todoDao.getTodosdao(userId);
        });
        this.addTodoservices = (userId, title, description, status, isActivated) => __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw (0, http_errors_1.default)(404, "Id not found");
            }
            return yield this.todoDao.addTododao(userId, description, status, title, isActivated);
        });
        this.updateTodoservices = (userId, des, user, title, status) => __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw (0, http_errors_1.default)(404, "invalid id");
            }
            return yield this.todoDao.updateTododao(userId, { description: des, user: user, title: title, status: status });
        });
        this.deleteTodoservices = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw (0, http_errors_1.default)(404, "invalid id");
            }
            return yield this.todoDao.deleteTododao(id);
        });
    }
}
exports.default = TodoListService;
