import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useNavigate } from "react-router-dom";
import { GetTodoSend } from "../services/api";
import { ITodo } from "../App";
import UpdateTodo from "./UpdateTodo";

interface homeProps {
  setRefreshList: any;
  refreshList:ITodo[]
}

const Home:React.FC<homeProps>=({setRefreshList,refreshList})=> {
  const navigation = useNavigate();
  const [list, setList] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState<any>(false);
  // const [refreshList,setRefreshList] = useState<ITodo[]>([]);
  
  
  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    //console.log(tokenValue, 'this is the token value') 
    if (!tokenValue) {
      navigation("/signin");
    }
    else{
      fetchTodoList();
    }
  }, [refreshList]); 
 
  async function fetchTodoList() {
    try {
      const result = await GetTodoSend();
      if (result.status === 200) {
        setList(result.data.todos.reverse());
      }
    } catch (error) {
      console.error("Error fetching todo list");
    }
  }

  return (
    <div>
      <div className="div1"
      style={{ margin: "10px 10px 10px 10px" }}
      >
        <div className="div2 "
        style={{ margin: "10px 10px 10px 10px" }}
        >
          {list.map((todo) => (
            <div
              className="div2" 
              style={{ margin: "25px 25px 25px 25px" }}
              onClick={() => {
                setSelectedTodo(todo);
                setUpdateModalOpen(true);
              }}
            >  
              <Todo todo={todo} setRefreshList = {setRefreshList}/>
            </div>
          ))}
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-primary"
        > 
          Add
        </button>
      </div>
      {updateModalOpen && selectedTodo !== null && (
        <UpdateTodo
          setList={setList}
          list={list}
          selectedTodo={selectedTodo}
          setUpdateModalOpen={setUpdateModalOpen}
        />
      )}
     <AddTodo setList={setList} list={list} setRefreshList = {setRefreshList}/>
    </div>
  );
}
export default Home;
