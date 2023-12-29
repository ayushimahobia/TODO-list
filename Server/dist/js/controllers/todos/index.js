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
const todo_1 = __importDefault(require("../../models/todo"));
const user_1 = __importDefault(require("../../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "TODOAPI";
class TodoList {
    constructor() {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield todo_1.default.find();
                res.status(200).json({ todos });
            }
            catch (error) {
                throw error;
            }
        });
        this.addTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const val = req.body;
                const toadd = new todo_1.default({
                    name: val.name,
                    description: val.description,
                    status: val.status,
                });
                const newtodo = yield toadd.save();
                const alltodos = yield todo_1.default.find();
                res.status(200).json({ messsge: "New Todo Added", todo: newtodo, todos: alltodos });
            }
            catch (error) {
                throw error;
            }
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { params: { id }, body } = req;
                const updatelist = yield todo_1.default.findOneAndUpdate({ _id: id }, body);
                const alltodo = yield todo_1.default.find();
                res.status(200).json({
                    messgage: "Todo Updated",
                    todo: updatelist,
                    todos: alltodo,
                });
            }
            catch (error) {
                res.status(400).json(error);
                throw (error);
            }
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const toDelete = yield todo_1.default.deleteOne({ _id: req.params.id });
                const allTodos = yield todo_1.default.find();
                res.status(200).json({
                    message: "Todo deleted",
                    todo: toDelete,
                    todos: allTodos,
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // existing user
            // Hashed password
            // user creation
            const { username, email, password } = req.body;
            try {
                const existingUser = yield user_1.default.findOne({ email: email });
                if (existingUser) {
                    res.status(400).json({ message: "User already exists" });
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const result = yield user_1.default.create({
                    email: email,
                    password: hashedPassword,
                    username: username,
                });
                const token = jsonwebtoken_1.default.sign({ email: result.email, id: result._id }, SECRET_KEY); // stores two thing payload and secret  
                res.status(201).json({ user: result, token });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        });
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const existingUser = yield user_1.default.findOne({ email: email });
                if (!existingUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                const matchPassword = yield bcrypt_1.default.compare(password, existingUser.password);
                if (!matchPassword) {
                    res.status(400).json({ message: "Invalid Password" });
                }
                const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
                res.status(201).json({ user: existingUser, token: token });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('refreshToken');
            res.status(200).json({ success: true, message: 'LogOut SuccesFully' });
        });
    }
}
exports.default = TodoList;
