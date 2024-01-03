import TodoDao from "../dao/todoDao";
import createHttpError from "http-errors";
import csvtojson from "csvtojson";
import { ITodo } from "../types/todo";
import { error } from "console";
import todo from "../models/todo";

const generateRandomString = (length: number): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};


export default class TodoListService {
  private todoDao = new TodoDao();

  public addImage = async (imageUrl: string, userId: string) => {
    if (!userId || !imageUrl) {
      throw new Error("Imageurl not exist or id not found");
    }
    return await this.todoDao.addImagedao(imageUrl, userId);
  };

  public getTodosservices = async (userId: string) => {
    if (!userId) {
      throw error("Id Not Found");
    }
    return await this.todoDao.getTodosdao(userId);
  };

  public getImageservices = async (id: string) => {
    return this.todoDao.getImageUrl(id);
  };

  public addTodoservices = async (
    userId: string,
    title: string,
    description: string,
    status: string,
    isActivated: boolean,
    imageUpload: string,
    short_id:string,
    date: Date
  ) => {
    if (!userId) {
      throw error("Id not found");
    }
     console.log("services");
    short_id = generateRandomString(8);
    return await this.todoDao.addTododao(
      userId,
      description,
      status,
      title,
      isActivated,
      imageUpload,
      short_id,
      date
    );
  };

  public updateTodoservices = async (
    id: string,
    des: string,
    user: string,
    title: string,
    status: string,
    imageUpload: string,
    date: Date
  ) => {
    if (!id) {
      throw createHttpError(404, "invalid id");
    }
    const resUrl: ITodo | null = await todo.findOne({ _id: id });
    const imgUrl: any = resUrl?.imageUpload
    return await this.todoDao.updateTododao(id, {
      description: des,
      user: user,
      title: title,
      isActivated: true,
      imageUpload: imgUrl,
      status: status,
      date: date,
    });
  };

  public deleteTodoservices = async (id: string) => {
    if (!id) {
      throw createHttpError("invalid id");
    }
    return await this.todoDao.deleteTododao(id);
  };
  public addCsv = async (
    filepath: string,
    userId: string,
    isActivated: boolean
  ) => {
    const todos: ITodo[] = [];
    const data = await csvtojson().fromFile(filepath);
    data.map((item: any) => {
      todos.push({
        ...item,
        user: userId,
        isActivated: true,
        short_id: generateRandomString(8),
        date: new Date(),
      });
    });
    return await this.todoDao.addCsvDao(todos);
  };
}
