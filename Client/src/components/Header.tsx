import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Uploader } from "rsuite";
import { ITodo } from "../App";
import { toast } from "react-toastify";
import { csvUpload } from "../services/api";
import { FileType } from "rsuite/esm/Uploader";

interface HeaderProps {
  loggedIn: boolean;
  setLoggedIn: (data:boolean)=>void;
  setRefreshList : any
}


const Header: React.FC<HeaderProps> = ({ loggedIn, setLoggedIn,setRefreshList }) => {
  
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigation("/signin");
  };

    const handleFrom = async (file: FileType[]) => {
      const formdata = new FormData();
      try {
       if (file[0].blobFile) formdata.append("file", file[0].blobFile);
       const result = await csvUpload(formdata);
       if(result.status===200){
       // console.log(result,'this is the result in header')
        toast.success("Successfully added csv");
        setRefreshList(new Date()) 
       }
      } catch (error) {
        toast.error("Error in uploading csv")
      }
    }
   console.log(loggedIn, 'this is in header');
  return (
    <nav className="navbar navbar-expand-lg " style={{background:'#01497c'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{color:"white",fontWeight:"bold",fontFamily:"sans-serif",fontSize:"x-large"}} >
          TODO LIST
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{color:"white"}}
        >
          <span className="navbar-toggler-icon" style={{color:"white"}} ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01" style={{color:"white"}}>
          <ul className="navbar-nav me-auto" >
            <li className="nav-item">
              <Link className="nav-link active" to="/" style={{color:"white"}}>
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="signup" style={{color:"white"}}>
                    REGISTER
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin" style={{color:"white"}}>
                    LOGIN
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout} style={{color:"white"}}>
                  Logout
                </a>
              </li>
            )}
          </ul>
          <Uploader 
            accept=".csv"
            name="file"
            maxPreviewFileSize={1}
            action=""
            // action="http://localhost:5000/csv-upload"
            size="lg"
            onChange={handleFrom}
            shouldUpload={()=>false}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
