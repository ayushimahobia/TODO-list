import { ITodo } from "./../types/todo"
import mongoose, { model, Schema } from "mongoose"

const generateRandomString = (length: number): string => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};

const todoSchema: Schema = new Schema(
  {
    title : {
      type:String,
      required:true,
    },
    short_id: {
      type: String,
      default: generateRandomString(8), 
      unique: true,
    },
    description: { 
      type: String,
      required: true, 
    },
    status : {
      type:String,
      default : "pending",
      required:true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user", 
    },
    isActivated :{
      type : Boolean
    },
    imageUpload :{
      type : String 
    },
    date : {
      type:Date,
      default:Date.now(),
    }
  },
  { timestamps: true }
)
export default model<ITodo>("Todo", todoSchema)