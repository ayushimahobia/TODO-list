import express from "express";
import mongoose, { Mongoose } from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes";
import { error } from "console";
import cookieParser from "cookie-parser";
import multer from "multer";

export default class App {
  private app: express.Application;
  constructor() {
    console.log("into the constructor");
    this.app = express();
    this.connectDb();
    this.config();
  }

  public config(): void {
    this.app.use(cors({ origin: ["http://localhost:3000"] }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:false}))
    this.app.use(cookieParser());
   // this.app.use('/uploads', express.static('uploads'))
    this.routes();
    this.app.use(multer);
  }
  public routes(): void {
    const user = new userRoutes();
    this.app.use(user.router);
    console.log("public is running");
  }
  public connectDb(): void {
    console.log("public db is running");
    const str: string =
      process.env.MONGO_URI_STRING ||
      `mongodb+srv://ayushim235:ayushi23@cluster1.wiuswak.mongodb.net/?retryWrites=true&w=majority`;
    const PORT: string | number = process.env.PORT || 5000;
    mongoose.connect(str!).then(() => {
      console.log("Connected to MongoDB");
      this.app.listen(PORT, () => {
        console.log(`Server is running on :${PORT}`);
      });
    });
  }
}
