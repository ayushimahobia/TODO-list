export interface ITodo {
   title: string;
   description: string;
   status: string;
   user : string;
   imageUpload:string,
   isActivated:boolean;
   date: Date;
}
export interface ITodoWithEmail extends ITodo{
  email: string;
}

export interface ITodoWithPassword extends ITodo {
  password: string;
}

