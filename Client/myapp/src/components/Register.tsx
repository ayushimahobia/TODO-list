import React, { useState } from "react";

export default function Register(){
    const [details,setDetails] = useState({
        email : ' ',
        password : ' '
    })
    const handleSubmit = async()=>{
        const registerDetails = await 
    }

    return <>
    <div className="container">
        <div className="row justify-content-md-center mt-4">
            <div className="col-lg-5 card border-primary mb-3">
                <div className="card-header h4 text-center">
                    Register An Account
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label className="col-form-label mt-4">
                            Email
                        </label>
                        <input type="text" 
                        className="form-control"
                        placeholder="Enter Your Email" />
                    </div>
                    <div className="form-group">
                        <label className="col-form-label mt-4">
                            Password
                        </label>
                        <input type="text" 
                        className="form-control"
                        placeholder="Enter Your Password" />
                    </div>
                    <div className="row justify-content-md-center 
                    from-group mt-4">
                        <button type="button" 
                        className="col-sm-6 btn btn-outline-secondary center">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
}