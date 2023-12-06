import { Router } from "express";
import { getTodos, addTodo, updatetodo, deleteTodo,signin,signup,logout } from "../controllers/todos"

const router:Router = Router()
router.get("/todos" , getTodos)
router.post("/add-todo",addTodo)
router.put("/update-todo/:id",updatetodo)
router.delete("/delete-todo/:id",deleteTodo)
router.post("/signup",signup)
router.post("/signin",signin)
router.post("/logout",logout)
export default router



