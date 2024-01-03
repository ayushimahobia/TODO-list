import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { UpdateTodoSend } from "../services/api"; // Import your update service function here
import { ITodo } from "../App";

interface UpdateProps {
  todoUpdate:ITodo,
  setUpdateModalOpen:any
  setRefreshList:any
}

const UpdateTodo: React.FC<UpdateProps> = ({
  // setList,
  // list,
  // selectedTodo,
  setUpdateModalOpen,
  todoUpdate,
  setRefreshList
}) => {
  const [todo, setTodo] = useState<Partial<ITodo>>({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (todoUpdate) {
      setTodo({
        title: todoUpdate.title,
        description: todoUpdate.description,
        status: todoUpdate.status,
      });
    }
  }, [todoUpdate]);

  const handleTodoUpdate = async () => {
    if (!todoUpdate) {
      toast("No todo selected for update");
      return;
    }

    if (todo.title === "" || todo.description === "" || todo.status === "") {
      toast("All fields are required");
      return;
    }

    const updatedTodo = {
      ...todoUpdate,
      title: todo.title!,
      description: todo.description!,
      status: todo.status!,
    };


    const result = await UpdateTodoSend(updatedTodo, updatedTodo._id);
    if (result.status === 200) {
      toast("Todo Updated");
      setUpdateModalOpen(false);
      setRefreshList(new Date());
    } else {
      toast(result.data.message);
    }
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const clearFields = () => {
    setTodo({
      title: "",
      description: "",
      status: "",
    });
   setUpdateModalOpen(false);
  };

  return (
    <div className="Modal" id="updateModal" 
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "1000",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
    >
      <div className="" role="document">
        <div className="modal-content"
        style={{width:"100%"}}
        >
          <div className="modal-header">
            <div className="modal-title">Update Todo</div>
            <button
              type="button"
              className="btn-close"
              aria-label="close"
               onClick={() => setUpdateModalOpen(false)}
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <input
                name="title"
                className="form-control"
                value={todo.title}
                onChange={handleInputChange}
                placeholder="Update Title"
              />
              <textarea
                name="description"
                className="form-control"
                rows={3}
                value={todo.description}
                onChange={handleInputChange}
                placeholder="Update Todos"
              />
              <input
                name="status"
                className="form-control"
                value={todo.status}
                onChange={handleInputChange}
                placeholder="Update Status"
              />
            </div>
          </div>
          <div className="modal-footer">
            <div style={{paddingRight:"5px"}}>
            <button className="btn btn-secondary" onClick={handleTodoUpdate}>
              Update Now
            </button>
            </div>
            <div style={{paddingLeft:"5px"}}>
            <button className="btn btn-secondary" onClick={clearFields}>
              Close
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
