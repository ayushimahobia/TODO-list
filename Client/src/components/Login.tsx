import React, { useEffect, useState } from "react";
import { loginSend } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


interface HeaderProps {
  loggedIn?: boolean;
  setLoggedIn: any;
}

const Login: React.FC<HeaderProps> = ({ setLoggedIn }) => {
  
  const [formData, setFromdata] = useState({
    email: "",
    password: "",
  });
  
  const navigation = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromdata({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const result = await loginSend(formData);
    if (result) {
      localStorage.setItem('token', result.data.data);
      setLoggedIn(true);
      console.log(setLoggedIn,'this is in signin')
      navigation("/");
      return;
    }
   else {
      toast("Data Not found");
      return;
    }
  };
  return (
    <>
      <div className="container">
        <ToastContainer/> 
        <div className="row justify-content-md-center mt-4">
          <div className="col-lg-5 card border-primary mb-3">
            <div className="card-header h4 text-center">
              Login to your Account
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="col-form-label mt-4">Email</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  never share your password
                </small>
              </div>
              <div className="form-group">
                <label className="col-form-label mt-4">Password</label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>
              <div className="row justify-content-md-center form-group mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="col-sm-6  btn--outline-secondary center"
                >
                  Login Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
