import { Response, Request, NextFunction } from "express";
import TodoListService from "../../Services/todo.service";
import csvtojson from 'csvtojson'
import { google } from "googleapis";
import fs from 'fs'

const GOOGLE_API_FOLDER = '1KDoJUw5MpK2lnuqh4Z9RM2LqRPIkk3rC'


class TodoList {
  private addServices = new TodoListService();

  public getTodos = async (req: Request, res: Response) => {
    const userId = req.body.id;
    console.log(userId, "this is the user id as user");
    try {
      const todos = await this.addServices.getTodosservices(userId);
      res.status(200).json({ todos });
    } catch (error) {
      throw error;
    }
  };

  public addTodo = async (req: Request, res: Response) => {
    console.log(req.body, "this is the body");
    const userId = req.body.id;
    const { title, description, status ,isActivated,date } = req.body;
    try {
      console.log(userId, "user id of addtodo");
      const todo = await this.addServices.addTodoservices(userId,title,description,status,isActivated,date);
      const val = todo.user;
      console.log(val, "this is val in addtodo");
      console.log(todo, "todo id in controller");
      res.status(200).json({ messsge: "New Todo Added", todo });
    } catch (error) {
      throw error;
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    console.log(req.body, "req body in console");
    const user = req.body.id;
    const userId = req.params.id;
    const des = req.body.description;
    const title = req.body.title;
    const status = req.body.status;
    const date = req.body.date;
    try {
      const updateTodo = await this.addServices.updateTodoservices(
        userId,
        des,
        user,
        title,
        status,
        date
      );
      res.status(200).json({
        messgage: "Todo Updated",
        updateTodo,
      });
    } catch (error) {
      res.status(400).json(error);
      throw error;
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    try {
      const isActivated = req.body.isActivated;
      const DelteTodo = await this.addServices.deleteTodoservices(
        req.params.id
      );
     return res.status(200).json({ message: "Todo Deleted", DelteTodo });
    } catch (error) {
      throw error;
    }
  };

  public addImage = async(req:Request,res:Response,next:NextFunction) => {
      
      console.log(req, 'this is in controller');
       const image = req.file;
       const userId = req.params.id
       
       if (!image) {
         return res.status(400).send({ error: 'No image file provided' });
        }
        
        if (!image.path) {
          return res.status(400).send({ error: 'Image file path is undefined' });
        }
    const uploadImg = await this.addServices.addImage(image.path,userId);
    try{
        const auth = new google.auth.GoogleAuth({
        keyFile: './drive.json',
        scopes: ['https://www.googleapis.com/auth/drive']
      });
      const driveService = google.drive({
        version: "v3",
        auth : auth
      });
      const metaData = {
        name : image?.originalname.substring(
          0,
          image.originalname.lastIndexOf(".")
        ),
        parents: [GOOGLE_API_FOLDER]
      };
      const media = {
        mimeType : image?.mimetype,
        body : fs.createReadStream(image?.path) 
      }
      const result = await driveService.files.create({
        requestBody : metaData,
        media : media,
        fields: "id",
      })
       //const url :string  = `https:drive.google.com/uc?export=view&id=${result.data.id}`
       console.log(result); 
       res.send(result.data.id);
    } catch (error) {
      throw error
    }
  }

  public addCsv = async (req:Request, res:Response,next:NextFunction)=>{
      try{
        const filepath = req.file?.path;
        if(!filepath)return 
        console.log(req.file?.originalname,'this is the file in controller');
        console.log(req.file?.path, 'this is the body in cont');
        console.log(req.body.id, "this is the userid in csv in cont");
        const userId = req.body.id
        const isActivated = true;
        const uploadCsv = await this.addServices.addCsv(filepath,userId,isActivated);
        return res.status(200).json({message:"todo csv", uploadCsv});
      }
      catch(error) {
       throw error;
      }
  }
}
export default TodoList;
