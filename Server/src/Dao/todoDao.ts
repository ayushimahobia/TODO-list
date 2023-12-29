
import { ITodo } from "../types/todo";
import todo from "../models/todo";


export default class TodoDao{
    private todoModel = todo;
    constructor(){}
    public addImagedao = async (img:any,id:string) => {
      console.log("image in dao",id);
      return await this.todoModel.findByIdAndUpdate(id,{imageUpload:img})
    }

    public getTodosdao = async (userId: string) => { 
        console.log(userId, 'userid in dao');
        const alltodos: ITodo[] = await todo.find({ user: userId });
        return alltodos;
    }

    public addTododao = async(userId:string,description:string,status:string,title:string,isActivated:boolean,date:Date)=>{
        const toadd  = new todo ({
            user : String(userId),
            description : description,
            title : title,
            status :status,
            isActivated : true,
            date: Date.now()
        })
        console.log(await toadd.save());
        return await toadd.save(); 
    }

    public updateTododao = async(userId:string,{description,user,title,status,date,isActivated}:ITodo)=>{
      return await todo.findByIdAndUpdate(userId,{
        description : description,
        user : user,
        title : title,
        status : status,
        isActivated:true,
        date : Date.now()
      })
    }

    public deleteTododao = async(id:string)=>{
      return await this.todoModel.findByIdAndDelete(id);
    }
    
    public addCsvDao = async(Todos:ITodo[])=>{
        return await todo.insertMany(Todos);
    }
}
// insertmany and create difference to read mongoose 