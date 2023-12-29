import Userdao from "../Dao/userdao";
import user from "../models/user";
import bcrypt from "bcrypt";

export default class userService {
  private userdao = new Userdao();
  public signup = async (username: string, email: string, password: string) => {
    if (!email || !password || !username) {
      throw Error("Please fill all fields");
    }
    const checkExisting = await this.userdao.getuserbyId(email);
    if (checkExisting) {
      throw Error( "email exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userdao.signupdao(username, email, hashedPassword);
  };

  public login = async (email: string, password: string) => {
    if (!email || !password) {
      throw Error( "Missing credentials");
    }
    const checkExisting = await this.userdao.getuserbyId(email);

    if (!checkExisting) {
      throw Error("User not found");
    }
    const matchPassword = await bcrypt.compare(
      password,
      checkExisting.password
    );
    if (!matchPassword) {
      throw Error("incorrect Password");
    }
    return checkExisting;
  };
  public logout = async () => {};
}
