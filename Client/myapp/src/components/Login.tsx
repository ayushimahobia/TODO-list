import React, { useEffect } from 'react'
import { useState } from 'react';
import { login } from '../services/apiIntegration';
import { useNavigate } from 'react-router-dom';
// import { json } from 'stream/consumers';
 import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserApiType } from '../type';


const Login = ()=>{
    // used useState to store form data 
    const navigation = useNavigate();
    const[form,setForm] = useState({   
       email :'',
       password :''
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{  
        setForm({...form,[e.target.name]:e.target.value})
    }
    // 
    const handleSubmit =async()=>{
        const result = await login(form)
        console.log('form',result);    
    };
return (
    <>
     <div className="container">
        <div className="row justify-content-md-center mt-4">
            <div className="col-lg-5 card border-primary mb-3">
                <div className="card-header h4 text-center">
                    Login into your Account
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label className="col-form-label mt-4">
                            Email or Username
                        </label>
                        <input type="text" 
                        onChange={handleChange}
                        name = "email"
                        className="form-control"
                        placeholder="Enter Your Email" />
                        {

                         <small id = "emailHelp" className='"form-text text-muted'>
                           {/* {errors.data.message} */}
                        </small>
                        }
                    </div>
                    <div className="form-group">
                        <label className="col-form-label mt-4">
                            Password
                        </label>
                        <input type="text" 
                        onChange={handleChange}
                        name = "password"
                        className="form-control"
                        placeholder="Enter Your Password" />
                        {
                        <small id = "emaildHelp" className='"form-text text-muted'>
                            We'll never share your password with anyone else
                        </small>
                        }
                    </div>
                    <div className="row justify-content-md-center 
                    from-group mt-4">
                        <button type="button" 
                        onClick={handleSubmit}
                        className="col-sm-6 btn btn-outline-secondary center">
                           Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
export default Login
