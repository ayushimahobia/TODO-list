import React, { useEffect, useState } from 'react'
import { registerSend } from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const[form,setFrom] = useState({
   // name :" ",
    email:"",
    password:""
  })
   const[errors,setErrors] = useState(null);
   const navigation = useNavigate();
   

   // use effect with no variable will be executed only once when the page is loaded 
   useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
      return navigation('/');
    }
   })
   
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setFrom({...form,[e.target.name]:e.target.value}) 
  }
  const handleSubmit = async () =>{
    try{
      const result = await registerSend(form)
      //  console.log('form in register', result)
       
       if(result.status===200){
            if(result.data.status===200){
              localStorage.setItem('user',JSON.stringify(result.data));
              navigation('/');
              return;
            }
           if(result.data.status!==200){
             setErrors(result.data.status);
             toast(result.data.message);
             return;
           }
       }
       else{
        toast('something went wrong, please try again')
        }
      }
      catch{
        toast('something went wrong, please try again')
      }
  }

  return (
  <>
  <div className="container">
    <ToastContainer/>
    <div className="row justify-content-md-center mt-4" >
        <div className="col-lg-5 card border-primary mb-3">
           <div className="card-header h4 text-center">
             Register an Account
           </div>
           <div className="card-body">
           <div className="form-group">
                <label className="col-form-label mt-4">
                    Username
                </label>
                <input type="text" 
                name = "username"
                onChange={handleInputChange}
                className='form-control'
                 placeholder='Enter Name' />
            </div>
            <div className="form-group">
                <label className="col-form-label mt-4">
                    Email
                </label>
                <input type="text"
                  name = "email"
                  onChange={handleInputChange}
                 className='form-control'
                 placeholder='Enter email' />
            </div>
            <div className="form-group">
                <label className="col-form-label mt-4">
                    Password
                </label>
                <input type="text"
                  name = "password"
                  onChange={handleInputChange}
                 className='form-control'
                 placeholder='Enter Password'/>
            </div>
            <div className="row justify-content-md-center form-group mt-4">
                <button type='button'
                 onClick={handleSubmit}
                 className='col-sm-6 btn--outline-secondary center'>
                  Register Now
                </button>
            </div>
           </div>
        </div>
    </div>
  </div>
  </>
  )
}

export default Register
