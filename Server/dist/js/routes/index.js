"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todocontroller_1 = __importDefault(require("../controllers/todos/todocontroller"));
const usercontrollers_1 = __importDefault(require("../controllers/usercontrollers"));
const auth_1 = __importDefault(require("../middleware/auth"));
const uploads_1 = __importDefault(require("../middleware/uploads"));
class userRoutes {
    constructor() {
        this.control = new todocontroller_1.default();
        this.userControl = new usercontrollers_1.default();
        this.auth = new auth_1.default();
        this.fileUploads = new uploads_1.default();
        this.router = express_1.default.Router();
        this.todoRoutes();
    }
    todoRoutes() {
        this.router.get("/todos", this.auth.verifyuser, this.control.getTodos);
        this.router.post("/add-todo", this.auth.verifyuser, this.control.addTodo);
        this.router.put("/update-todo/:id", this.auth.verifyuser, this.control.updateTodo);
        this.router.delete("/delete-todo/:id", this.auth.verifyuser, this.control.deleteTodo);
        this.router.post("/signup", this.userControl.signup);
        this.router.post("/signin", this.userControl.signin);
        this.router.post("/logout", this.userControl.logout);
        this.router.post("/image-upload", this.fileUploads.Uploads, this.auth.verifyuser, this.control.addImage);
    }
}
exports.default = userRoutes;
