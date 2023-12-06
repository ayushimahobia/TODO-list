import { Document } from "mongoose"

export interface ITodo extends Document {
  name: string
  description: string
  status: boolean
  email: string;
  password: string;
  username: string;
}