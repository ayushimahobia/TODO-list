import { Response, Request } from "express"
import { ITodo } from "./../../types/todo"
import Todo from "../../models/todo"

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos :ITodo[] = await Todo.find();
    res.status(200).json({todos});
  } catch (error) {
    throw error
  }
}
const addTodo = async (req:Request , res:Response):Promise<void>=>{
    try {
        const val = req.body as Pick<ITodo ,"name" | "description"|"status">
        const toadd :ITodo = new Todo ({
            name : val.name,
            description : val.description,
            status : val.status,
        })
        const newtodo :ITodo = await toadd.save();
        const alltodos :ITodo[] = await Todo.find();      
        res.status(200).json({messsge:"New Todo Added",todo: newtodo,todos:alltodos})
    }
    catch(error){
        throw error
    }
}

