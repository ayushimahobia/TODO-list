import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const jwtSecret =
  "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";

export default class verifyToken {
  public verifyuser = async (
    req: Request, 
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.file?.originalname, 'this is the file in auth ');
    const token = (req.headers.authorization as string)?.split(" ")[1];
    // console.log(req.headers.authorization,'this is the headers in auth');
    // console.log(token,'this is the token');
    if (!token) {
      return res.status(403).json({ message: "Token not present" });
    }

    jwt.verify(
      token,
      jwtSecret,
      (err: VerifyErrors | null, decoded: any | undefined) => {
        if (err) {
          console.error("Error verifying token:", err);
          return res.status(403).json({ message: "Token not verified" });
        }
         req.body = {...req.body,...decoded };
         //  console.log(req.body, "this is the req body");
        // console.log(decoded, "this is the decoded email");
        next();
      }
    );
  };
}
