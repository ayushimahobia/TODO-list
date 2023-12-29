"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = __importDefault(require("multer"));
class App {
    constructor() {
        console.log("into the constructor");
        this.app = (0, express_1.default)();
        this.connectDb();
        this.config();
    }
    config() {
        this.app.use((0, cors_1.default)({ origin: ["http://localhost:3000"] }));
        this.app.use(multer_1.default);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false })); // to parse data coming from UI which is not in the form of JSON
        this.app.use((0, cookie_parser_1.default)());
        this.routes();
    }
    routes() {
        const user = new routes_1.default();
        this.app.use(user.router);
        console.log("public is running");
    }
    connectDb() {
        console.log("public db is running");
        const str = process.env.MONGO_URI_STRING ||
            `mongodb+srv://ayushim235:ayushi23@cluster1.wiuswak.mongodb.net/?retryWrites=true&w=majority`;
        const PORT = process.env.PORT || 5000;
        mongoose_1.default.connect(str).then(() => {
            console.log("Connected to MongoDB");
            this.app.listen(PORT, () => {
                console.log(`Server is running on :${PORT}`);
            });
        });
    }
}
exports.default = App;
