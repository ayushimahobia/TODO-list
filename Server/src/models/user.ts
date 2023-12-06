import mongoose, {model,Schema } from "mongoose";
import { ITodo } from "../types/todo";
import { timeStamp } from "console";

const UserSchema:Schema = new Schema({
    username :{
        type:String,
        required : true
    },
    password : {
        type :String,
        required: true
    },
    email : {
        type : String,
        required : true
    }
}, {timestamps:true});
export default model<ITodo>("user", UserSchema)
