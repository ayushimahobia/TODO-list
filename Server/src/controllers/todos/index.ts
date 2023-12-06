import { Response, Request } from "express"
import { ITodo } from "./../../types/todo"
import Todo from "../../models/todo"
import user from "../../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET_KEY = "TODOAPI"
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

const updatetodo = async (req:Request,res:Response):Promise<void>=>{
  try {
    const { params: { id }, body } = req;
    const updatelist: ITodo| null = await Todo.findOneAndUpdate({ _id: id },body) 
    const alltodo: ITodo[] = await Todo.find()
    res.status(200).json({
      messgage :"Todo Updated",
      todo : updatelist,
      todos : alltodo,
    })
  } catch (error) {
    res.status(400).json(error)
     throw(error)
  }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try{
    const toDelete = await Todo.deleteOne({_id:req.params.id}) 
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
      message: "Todo deleted",
      todo: toDelete,
      todos: allTodos,
    })
  } catch (error) {
    throw error
  }
}

const signup = async(req:Request, res:Response):Promise<void>=>{
   // existing user
   // Hashed password
   // user creation
   const {username,email,password} = req.body
   try{
    const existingUser =  await user.findOne({email:email})
    if(existingUser){
       res.status(400).json({message: "User already exists"});
    }
    const hashedPassword =  await bcrypt.hash(password,10)
    const result = await user.create({
      email : email,
      password : hashedPassword,
      username : username,
    })
    const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY) // stores two thing payload and secret  
    res.status(201).json({user:result,token}) 
   }
   catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
   }
}

const signin = async(req:Request, res:Response):Promise<void>=>{
   const {email,password} = req.body
   try{
    const existingUser =  await user.findOne({email:email})
    if(!existingUser){
       res.status(404).json({message: "User not found"});
       return;
    }
    const matchPassword  = await bcrypt.compare(password,existingUser.password)
    if(!matchPassword){
      res.status(400).json({message:"Invalid Password"})
    }
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY)
    res.status(201).json({user:existingUser,token:token})  
   }
   catch(error){
      console.log(error);
      res.status(500).json({message :"Something went wrong" })
   }
}
 const logout = async(req:Request,res:Response):Promise<void>=>{
  res.clearCookie('refreshToken')
     res.status(200).json({success:true, message: 'LogOut SuccesFully'})
}
export { getTodos, addTodo, updatetodo, deleteTodo,signin,signup,logout}