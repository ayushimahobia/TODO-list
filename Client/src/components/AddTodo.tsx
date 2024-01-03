import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddTodoSend } from "../services/api";
import { ITodo } from "../App";

  
 
interface AddProps {
  setList: any;  
  list: ITodo[];
  setRefreshList:any
}

const AddTodo: React.FC<AddProps> = ({ setList, list, setRefreshList }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "",
  });
  const handleTodoSubmit = async () => {
    if (todo.title === "" || todo.description === "" || todo.status === "") {
      toast("Todo is required");
      return;
    }

    const result = await AddTodoSend({
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });

    if (result.status === 200) {
      setList([...list, result.data.todo]);
      toast("Todo Added");
      clearFields();
      setRefreshList(new Date())
    } else {
      toast(result.data.message);
    }

  };
  
  const handleInputChange = (e: any) => {
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
  };
  
  return ( 
    <div className="mt-5" id="">
      <div className="dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Add New Todo</div>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <input
                name="title"
                className="form-control"
                value={todo.title}
                onChange={handleInputChange}
                placeholder="Write Title"
              />
              <textarea
                name="description"
                className="form-control"
                rows={3}
                value={todo.description}
                onChange={handleInputChange}
                placeholder="Write Todos"
              />
              <input
                name="status"
                className="form-control"
                value={todo.status}
                onChange={handleInputChange}
                placeholder="Write Status"
              />
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button className="btn btn-secondary" onClick={handleTodoSubmit}>
              Save Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
