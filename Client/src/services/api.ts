import axios, { AxiosResponse } from "axios";
import {
  ADDTodo,
  AddCsv,
  DELETETodo,
  LOGIN,
  UPDATETodo,
  Uploadimg,
} from "./apiConstant";
import { REGISTER } from "./apiConstant";
import { GETTodos } from "./apiConstant";
import { promises } from "dns";
import { getIcon } from "react-toastify/dist/components";

// from data will come check type here
interface IUser {
  username?: string;
  email: string;
  password: string;
}

interface ITodo {
  _id?: string;
  title?: string;
  description: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

type ApiDataType = {
  message: string;
  status: string;
  todos: ITodo[];
  todo?: ITodo;
};
export function getToken() {
  const val: string | null = localStorage.getItem("token");
  if (!val) return;
  const userObj = JSON.parse(val);
  return userObj.token;
}

export const loginSend = async (data: IUser) => {
  try {
    const res = await axios.post(LOGIN, data);
    console.log("this is res", res);
    return res;
  } catch (error) {
    window.alert(error);
  }
};

export const registerSend = async (data: IUser) => {
  return axios.post(REGISTER, data);
};

export const AddTodoSend = async (data: ITodo) => {
  const tokenValue = localStorage.getItem("token");

  try {
    const response = await axios.post(ADDTodo, data, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const GetTodoSend = async () => {
  const tokenValue = localStorage.getItem("token");

  try {
    const response = await axios.get(GETTodos, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const UpdateTodoSend = async (data: ITodo, _id: any) => {
  const tokenValue = localStorage.getItem("token");
  console.log(_id, " id in apiconst");

  try {
    const response = await axios.put(`${UPDATETodo}/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in Updating todo:", error);
    throw error;
  }
};

export const DeleteTodoSend = async (_id: any) => {
  const tokenValue = localStorage.getItem("token");
  console.log(_id, " id in apiconst");
  try {
    const response = await axios.delete(`${DELETETodo}/${_id}`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error Deleting todo:", error);
    throw error;
  }
};

export const csvUpload = async (csv: any) => {
  const tokenValue = localStorage.getItem("token");
  try {
    //console.log(csv,'this is csv in api post');
    const response = await axios.post(`${AddCsv}`, csv, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
        "content-type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading Csv:", error);
    throw error;
  }
};

export const Uploadimage = async (image: any, _id: any) => {
  console.log(image, _id);
  const tokenValue = localStorage.getItem("token");
  try {
    console.log(image, "this is csv in api post");
    const response = await axios.post(`${Uploadimg}/${_id}`, image, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
        "content-type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading Csv:", error);
    throw error;
  }
};
