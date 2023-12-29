import axios from "axios";
import { ITodo } from "../type";
import { LoginAPI } from "./apiconstant";
import { ApiDataType } from "../type";
import { RegisterAPI } from "./apiconstant";
import { UserApiType } from "../type";


export const login = async(data:UserApiType)=>{
   return axios.post(LoginAPI,data)
}
export const register = async(data:UserApiType)=>{
   return axios.post(RegisterAPI,data)
}


// todos 
export const updateTodo = async (
   todo: ITodo
 ): Promise<AxiosResponse<ApiDataType>> => {
   try {
     const todoUpdate: Pick<ITodo, "status"> = {
       status: true,
     }
     const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
       `${}/edit-todo/${todo._id}`,
       todoUpdate
     )
     return updatedTodo
   } catch (error) {
     throw new Error(error)
   }
 }