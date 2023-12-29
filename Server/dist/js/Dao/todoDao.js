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
const todo_1 = __importDefault(require("../models/todo"));
class TodoDao {
    constructor() {
        this.todoModel = todo_1.default;
        this.addImagedao = (img, id) => __awaiter(this, void 0, void 0, function* () {
            console.log("image in dao");
            return yield this.todoModel.findByIdAndUpdate(id, { imageUpload: img });
        });
        this.getTodosdao = (userId) => __awaiter(this, void 0, void 0, function* () {
            console.log(userId, 'userid in dao');
            const alltodos = yield todo_1.default.find({ user: userId });
            return alltodos;
        });
        this.addTododao = (userId, description, status, title, isActivated) => __awaiter(this, void 0, void 0, function* () {
            const toadd = new todo_1.default({
                user: String(userId),
                description: description,
                title: title,
                status: status,
                isActivated: true
            });
            console.log(yield toadd.save());
            return yield toadd.save();
        });
        this.updateTododao = (userId, { description, user, title, status }) => __awaiter(this, void 0, void 0, function* () {
            return yield todo_1.default.findByIdAndUpdate(userId, {
                description: description,
                user: user,
                title: title,
                status: status
            });
        });
        this.deleteTododao = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.todoModel.findByIdAndDelete(id);
        });
    }
}
exports.default = TodoDao;
