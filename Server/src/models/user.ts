import mongoose, {model,Schema } from "mongoose";

const UserSchema:Schema = new Schema({
    username : {
        type:String,
        require : true
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

export default model("user", UserSchema)
