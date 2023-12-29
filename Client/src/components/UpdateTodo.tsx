import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { UpdateTodoSend } from "../services/api"; // Import your update service function here
import { ITodo } from "../App";

interface UpdateProps {
  setList: React.Dispatch<React.SetStateAction<ITodo[]>>;
  list: ITodo[];
  selectedTodo: ITodo | null;
  setUpdateModalOpen: any;
}

const UpdateTodo: React.FC<UpdateProps> = ({
  setList,
  list,
  selectedTodo,
  setUpdateModalOpen,
}) => {
  const [todo, setTodo] = useState<Partial<ITodo>>({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (selectedTodo) {
      setTodo({
        title: selectedTodo.title,
        description: selectedTodo.description,
        status: selectedTodo.status,
      });
    }
  }, [selectedTodo]);

  const handleTodoUpdate = async () => {
    if (!selectedTodo) {
      toast("No todo selected for update");
      return;
    }

    if (todo.title === "" || todo.description === "" || todo.status === "") {
      toast("All fields are required");
      return;
    }

    const updatedTodo = {
      ...selectedTodo,
      title: todo.title!,
      description: todo.description!,
      status: todo.status!,
    };


    const result = await UpdateTodoSend(updatedTodo, updatedTodo._id);
    if (result.status === 200) {
      const updatedList = list.map((item) =>
        item._id === updatedTodo._id ? updatedTodo : item
      );
      setList(updatedList);
      toast("Todo Updated");
      setUpdateModalOpen(false);
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
    <div className="updateModal" id="updateModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
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
            <button className="btn btn-secondary" onClick={handleTodoUpdate}>
              Update Now
            </button>
            <button className="btn btn-secondary" onClick={clearFields}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
