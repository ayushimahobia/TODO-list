export interface ITodo{
    _id:string,
    name:string,
    description:string,
    status:boolean,
    createdAt?:string,
    updatedAt?:string
}

export interface ITodoProps{
    todo:ITodo
}

type ApiDataType = {
    message :string,
    status : boolean,
    todos : ITodo[],
    todo : ITodo
}

export interface IUser {
    email:string,
    password : string,
}
export interface IUserProps{
    user : IUser
}
type UserApiType = {
    email:string,
    password : string
}
