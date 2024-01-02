import userService from "../services/userservices";
import bcrypt from "bcrypt";
import user from "../models/user";

export default class Userdao {
  private usermodel = user;

  constructor() {}

  public getuserbyId = async (email: string) => {
    return await this.usermodel.findOne({ email: email });
  };

  public signupdao = async (
    username: string,
    email: string,
    password: string
  ) => {
    const newUser = await this.usermodel.create({
      username: username,
      email: email,
      password: password,
    });
    return await newUser.save();
  };

  public logindao = async (username: string) => {
    return await this.usermodel.findOne({ username: username });
  };
}
