
import { ITodo } from "../types/todo";
import todo from "../models/todo";
import { error } from "console";

 
export default class TodoDao{
    private todoModel = todo;
    constructor(){}
    public addImagedao = async (imageUrl:any,id:string) => {
      console.log("image in dao",id);
      console.log(imageUrl,'image url'); 
      await this.todoModel.findByIdAndUpdate(id,{imageUpload:imageUrl})
      return imageUrl;
    }

    public getImageUrl = async (id:string) => {
      console.log(id);
      const res : ITodo | null = await todo.findOne({_id:id});
      console.log(res);
      if(res){
        return res.imageUpload;
      }
      return ("");
    }

    public getTodosdao = async (userId: string) => { 
        console.log(userId, 'userid in dao');
        const alltodos: ITodo[] = await todo.find({ user: userId });
        return alltodos;
    }
 
    public addTododao = async(userId:string,description:string,status:string,title:string,isActivated:boolean,imageUpload:string,date:Date)=>{
        const toadd  = new todo ({
            user : String(userId),
            description : description,
            title : title,
            status :status,
            isActivated : true,
            imageUpload : "",
            date: Date.now()
        })
        console.log(await toadd.save());
        return await toadd.save(); 
    }

    public updateTododao = async(userId:string,{description,user,title,status,date,isActivated,imageUpload}:ITodo)=>{
      return await todo.findByIdAndUpdate(userId,{
        description : description,
        user : user,
        title : title,
        status : status,
        isActivated:true,
        imageUpload:"",
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