import express, { Router } from "express";
import TodoList from "../controllers/todos/todocontroller";
import Userlist from "../controllers/usercontrollers";
import verifyToken from "../middleware/auth";
import FileUploads from "../middleware/uploads";

class userRoutes {
  public router: Router;
  private control: TodoList = new TodoList();
  private userControl: Userlist = new Userlist();
  private auth: verifyToken = new verifyToken();
  private fileUploads: FileUploads = new FileUploads();
  constructor() {
    this.router = express.Router();
    this.todoRoutes();
  }
  public todoRoutes(): void {
    this.router.get("/todos", this.auth.verifyuser, this.control.getTodos);
    this.router.post("/add-todo", this.auth.verifyuser, this.control.addTodo);
    this.router.put(
      "/update-todo/:id",
      this.auth.verifyuser,
      this.control.updateTodo
    );
    this.router.delete(
      "/delete-todo/:id",
      this.auth.verifyuser,
      this.control.deleteTodo
    );
    this.router.post("/signup", this.userControl.signup);
    this.router.post("/signin", this.userControl.signin);
    this.router.post("/logout", this.userControl.logout);
    this.router.post(
      "/image-upload/:id",
      this.fileUploads.Uploads.single('image'),
      this.auth.verifyuser,
      this.control.addImage 
    );
    this.router.post("/csv-upload",this.fileUploads.Uploads.single('file'),this.auth.verifyuser,this.control.addCsv)
  } 
} 
export default userRoutes;
