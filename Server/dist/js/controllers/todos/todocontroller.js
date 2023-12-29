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
const todo_service_1 = __importDefault(require("../../Services/todo.service"));
class TodoList {
    constructor() {
        this.addServices = new todo_service_1.default();
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.id;
            console.log(userId, "this is the user id as user");
            try {
                const todos = yield this.addServices.getTodosservices(userId);
                res.status(200).json({ todos });
            }
            catch (error) {
                throw error;
            }
        });
        this.addTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body, "this is the body");
            const userId = req.body.id;
            const { title, description, status, isActivated } = req.body;
            try {
                console.log(userId, "user id of addtodo");
                const todo = yield this.addServices.addTodoservices(userId, title, description, status, isActivated);
                const val = todo.user;
                console.log(val, "this is val in addtodo");
                console.log(todo, "todo id in controller");
                res.status(200).json({ messsge: "New Todo Added", todo });
            }
            catch (error) {
                throw error;
            }
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body, "req body in console");
            const user = req.body.id;
            const userId = req.params.id;
            const des = req.body.description;
            const title = req.body.title;
            const status = req.body.status;
            try {
                const updateTodo = yield this.addServices.updateTodoservices(userId, des, user, title, status);
                res.status(200).json({
                    messgage: "Todo Updated",
                    updateTodo,
                });
            }
            catch (error) {
                res.status(400).json(error);
                throw error;
            }
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isActivated = req.body.isActivated;
                const DelteTodo = yield this.addServices.deleteTodoservices(req.params.id);
                res.status(200).json({ message: "Todo Deleted", DelteTodo });
            }
            catch (error) {
                throw error;
            }
        });
        this.addImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const img = req.body.imageUpload;
                const id = req.params.id;
                const uploadImg = yield this.addServices.addImage(img, id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TodoList;
