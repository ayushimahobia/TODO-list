import React, { useEffect, useState } from "react";
import { ITodo } from "../App";
import { DeleteTodoSend, getImage } from "../services/api";
import { Uploadimage } from "../services/api";
import { toast } from "react-toastify";
import moment from "moment";
import ImageUpload from "./Image";
import UpdateTodo from "./UpdateTodo";

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
  const [currentImg, setCurrentImg] = useState("");
  const [updateModalOpen, setUpdateModalOpen] = useState<any>(false);
  const [imageModalOpen, setImageModalOpen] = useState<any>(false);

  async function getImageurl() {
    try {
      const url = await getImage(todo._id);
      if (url.status === 200) {
        // console.log(url.data);
        setImageUrl(url.data);
        setRefreshList(new Date());
      } else {
        setImageUrl("");
      }
    } catch (error) {
      toast("image not there");
    }
  }

  useEffect(() => {
    //   console.log(imageUrl,'this is in effect');
    getImageurl();
  }, [todo._id]);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const uploadImage = await Uploadimage(formData, todo._id);
    if (uploadImage.status === 200) {
      setImageUrl(`${uploadImage.data}`);
      setRefreshList(new Date());
      toast("image uploaded");
    } else {
      toast("Image not uploaded");
    }
  };
  // console.log(imageUrl, "this is in todo.tsx");
  return (
    <>
      {imageModalOpen && (
        <ImageUpload
          currentImg={currentImg}
          onClose={() => {
            setImageModalOpen(false);
          }}
        />
      )}
       {updateModalOpen && (
        <UpdateTodo todoUpdate={todo} setUpdateModalOpen={setUpdateModalOpen} setRefreshList={setRefreshList} />
      )}
      <div
        className="d-flex mx-5 my-4 border px-2 py-2 h-25 w-75 justify-content-between"
        style={{
          height: "250px",
          width: "40%",
          background: "#E0FFFF",
          boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: '0 0 0.5rem 0.5rem'
        }}
      >
        <div className="mx-2 my-4">
          {!imageUrl && (
            <div>
              <label
                style={{
                  display: "inline-block",
                  position: "relative",
                  overflow: "hidden",
                  marginTop: "10px",
                }}
              >
                <input
                  type="file"
                  name="image"
                  onChange={(e: any) => setImage(e.target.files[0])}
                  style={{
                    fontSize: "100px",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    opacity: 0,
                  }}
                />
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 6px",
                    cursor: "pointer",
                    backgroundColor: "#5bc0de",
                    color: "#fff",
                    borderRadius: "5px",
                    border: "1px solid #5bc0de",
                    transition: "background-color 0.3s",
                  }}
                >
                  Choose File
                </span>
              </label>

              {image && (
                <button
                  className="uploadImage"
                  onClick={uploadImage}
                  style={{ border: "1px solid black" }}
                >
                  Upload
                </button>
              )}
            </div>
          )}
          <div
            onClick={() => {
              console.log("current", imageUrl);
              setCurrentImg(imageUrl);
              setImageModalOpen(true);
            }}
          >
            <img
              src={imageUrl}
              alt="imagex"
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        </div>

        <div className="d-flex flex-column mx-3 ">
          <span className="text-start text-uppercase fw-bold mt-1">
            {todo.title}
          </span>

          <span className="text-start text-truncate mt-2">
            {todo.description}
          </span>
          <span className="text-start mt-2">{todo.status}</span>
          <span className="text-start mt-2">{moment(todo.date).fromNow()}</span>
        </div>


        <div className="h-100 mx-2 "
        style={{justifyItems:"space-between",float:'right'}}
        >
          <div style={{paddingBottom:"5px"}}>
          <button
            type="button"
            className="btn btn-outline-info mt-3"
            onClick={() => setUpdateModalOpen(true)}
            style={{width:'100px'}}
          >
            edit
          </button>
          </div> 
          <div  >
          <button
            type="button"
            className="btn btn-outline-danger mb-2"
            onClick={handleDelete}
            style={{width:'100px'}}
          >
            Delete
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
