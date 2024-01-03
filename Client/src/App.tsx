import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IUser {
  email: string;
  password: string;
}
export interface ITodo {
  blobFile: string | Blob;
  _id?: string;
  title: string;
  description: string;
  status: string;
  imageUpload : string;
  date : Date 
}

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [refreshList,setRefreshList] = useState<ITodo[]>([]); // need to change type as date 

  return (
    <>
      <BrowserRouter>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setRefreshList={setRefreshList} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home refreshList = {refreshList} setRefreshList={setRefreshList}/>} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login setLoggedIn={setLoggedIn} />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
