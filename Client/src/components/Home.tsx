import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useNavigate } from "react-router-dom";
import { GetTodoSend } from "../services/api";
import { ITodo } from "../App";
import UpdateTodo from "./UpdateTodo";

interface homeProps {
  setRefreshList: any;
  refreshList: ITodo[];
}

const Home: React.FC<homeProps> = ({ setRefreshList, refreshList }) => {
  const navigation = useNavigate();
  const [list, setList] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState<any>(false);
  //const [refreshList,setRefreshList] = useState<ITodo[]>([]);

  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    //console.log(tokenValue, 'this is the token value')
    if (!tokenValue) {
      navigation("/signin");
    } else {
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
     <div className="left" style={{width:'60%',float:'left'}}>
     <div className="w-100 d-flex " >
        <div className="w-100" style={{ margin: "10px 10px 10px 10px" }}>
          {list.map((todo) => (
            <div
              className="w-100"
              // style={{ margin: "auto", display: "flex" }}
              onClick={() => {
                setSelectedTodo(todo);
                setUpdateModalOpen(true);
              }}
            >
              <Todo todo={todo} setRefreshList={setRefreshList} />
            </div>
          ))}
        </div>
      </div>
     </div>


     <div className="right" style={{width:"40%",float:'right'}}>
     <div className="nested-right" style={{margin:'10px'}}>
     <div
        className="add-div"
        style={{ position: "fixed", right: 50,width:'30%' }}
      > 
         <AddTodo setList={setList} list={list} setRefreshList={setRefreshList} /> 
      </div>
     </div>
     </div>
    </div>
  );
};
export default Home;
