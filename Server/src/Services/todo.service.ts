import TodoDao from "../Dao/todoDao";
import createHttpError from "http-errors";
import csvtojson from "csvtojson";
import { ITodo } from "../types/todo";
import { error } from "console";


export default class TodoListService {
  private todoDao = new TodoDao();

  public addImage = async (img: string, userId: string) => {
    if (!userId || !img) {
      throw new Error("Image not exist or id not found");
    }
    return await this.todoDao.addImagedao(img, userId);
  };

  public getTodosservices = async (userId: string) => {
    if (!userId) {
      throw error("Id Not Found");
    }
    return await this.todoDao.getTodosdao(userId);
  };

  public addTodoservices = async ( 
    userId: string,
    title: string,
    description: string,
    status: string,
    isActivated: boolean,
    date: Date
  ) => {
    if (!userId) {
      throw error("Id not found");
    }

    return await this.todoDao.addTododao(
      userId,
      description,
      status,
      title,
      isActivated,
      date
    );
  };

  public updateTodoservices = async (
    userId: string,
    des: string,
    user: string,
    title: string,
    status: string,
    date :Date
  ) => {
    if (!userId) {
      throw createHttpError(404, "invalid id");
    }
    return await this.todoDao.updateTododao(userId, {
      description: des,
      user: user,
      title: title,
      isActivated:true,
      status: status,
      date : date
    });
  };

  public deleteTodoservices = async (id: string) => {
    if (!id) {
      throw createHttpError("invalid id");
    }
    return await this.todoDao.deleteTododao(id);
  };
  public addCsv = async (filepath: string,userId:string,isActivated:boolean) => {  

    const generateRandomString = (length: number): string => {
      const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomString = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      } 
      return randomString;
    };  
        const todos:ITodo[] = [];
        const data = await csvtojson().fromFile(filepath);
        data.map((item:any)=>{
          todos.push({...item,user:userId, isActivated:true,short_id:generateRandomString(8),date:new Date()});
        }) 
        return await this.todoDao.addCsvDao(todos)
  };
}