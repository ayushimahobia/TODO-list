import { NextFunction, Request, Response } from "express";
import multer from "multer";

console.log('inside multer middleware')
export default class FileUploads {
    public Uploads = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './imgUploads');
            },
            filename: function (req, file, cb) {
                cb(null, `${Date.now()}_${file.originalname}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            console.log(file.originalname,'this is the original name of file in uploads');
            if (file.mimetype.includes("csv") || file.mimetype.includes("image")) {
              cb(null, true);
              console.log(file.originalname,'this is the original name of file in uploads ifff');
            } else {
              cb(null,false);
              console.log(file.originalname,'this is the original name of file in uploads elsee');
            }

          }
    })
}
