import { Response, Request } from "express";
import userService from "../services/userservices";
import jwt from "jsonwebtoken";
const jwtSecret =
  "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";

export default class Userlist {
  private userservices = new userService();

  public signup = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    console.log(req.header, "this is header in signup");
    console.log(req.body, " this is the req body");
    console.log(req.body.username, "this is the username");
    console.log(email, "this is signup email");
    console.log(password, " this is signup password");
    try {
      const checkSignup = await this.userservices.signup(
        username,
        email,
        password
      );
      if (!checkSignup) {
        return res.status(500).json({ message: "User creation failed" });
      }
      res.status(200).json({ message: "Successfully registered" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  public signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.header, "this is header in signup");
    console.log(req.body, " this is the req body");
    try {
      const existingUser = await this.userservices.login(email, password);
      if (!existingUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        jwtSecret,
        {
          expiresIn: maxAge,
        }
      );
      const result = {
        email: existingUser.email,
        id: existingUser.id,
        token: `${token}`,
      };
      // req.headers.authorization = token;
      // req.headers = {
      //   ...req.headers,
      //   Authorization: token,
      // };
      // console.log(">>>>>>>>>>>>>>>>>>>>>> Request Headers: ", req.headers);
      res
        .status(200)
        .json({ data: token, result, message: "login successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  public logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "LogOut SuccesFully" });
  };
}
