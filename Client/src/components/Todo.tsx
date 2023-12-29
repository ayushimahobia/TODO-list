import React, { useState } from "react";
import { ITodo } from "../App";
import { DeleteTodoSend } from "../services/api";
import { Uploadimage } from "../services/api";
import { toast } from "react-toastify";
import moment from "moment";

interface TodoProps {
  todo: ITodo;
  setRefreshList: any;
}

const Todo: React.FC<TodoProps> = ({ todo, setRefreshList }) => {
  const handleDelete = async () => {
    const result = await DeleteTodoSend(todo._id);
    if (result.status === 200) {
      toast("deleted");
      setRefreshList(new Date());
    } else {
      toast("not deleted");
    }
  };

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const uploadImage = await Uploadimage(formData, todo._id);
    if (uploadImage.status === 200) {
      setImageUrl(
        `https:drive.google.com/uc?export=view&id=${uploadImage.data}`
      );
      setRefreshList(new Date());
      console.log(imageUrl);
      toast("image uploaded");
    } else {
      toast("Image not uploaded");
    }
  };

  return (
    <div className="row" style={{ justifyContent: "center" }}>
      <div
        className="todo "
        style={{ height: "250px", width: "30%",
        background:"#E0FFFF",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
       }}
      >
        <div className="header">{todo.title}</div>
        <div className="todo-body">
          <p className="todo-desc">{todo.description}</p>
          <p className="todo-desc">{todo.status}</p>
          <p className="todo-time">{moment(todo.date).fromNow()}</p>
        </div>
        <div
          className="deleteButton"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           
          }}
        >
          <button
            style={{ background: "#971111", padding: "5px" ,
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
          }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <div
        className="img"
        style={{ height: "250px", width: "30%",
        background:"#E0FFFF",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
       }}
      >
        {!imageUrl && (
          <div>
            <input
              type="file"
              name="image"
              onChange={(e: any) => {
                setImage(e.target.files[0]);
              }}
            />
            {image && (
              <button
                className="uploadImage"
                onClick={uploadImage}
                style={{ padding: "5px", border: "1px solid black" }}
              >
                Upload
              </button>
            )}
          </div>
        )}
        {imageUrl && (
          <div
            style={{
              width: "300px",
              height: "250px",
              overflow: "hidden",
            }}
          >
            <img
              src={imageUrl}
              alt="imagex"
              style={{ objectFit: "contain", width: "100%", height: "250px"}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
