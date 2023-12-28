import Button from 'react-bootstrap/Button';
import React from "react";
import  { Navigate } from 'react-router-dom';

class PasswordReset extends React.Component{
    constructor(props){
        super(props);
        this.state={email:null, newPassword:null, repassword:null, otp:null};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePwdChange=this.handlePwdChange.bind(this);
        this.handleRePwdChange=this.handleRePwdChange.bind(this);
        this.handleOTPChange=this.handleOTPChange.bind(this);
        this.resetForm=this.resetForm.bind(this);
    }
    handleEmailChange(event){
        this.setState({email: event.target.value});
    }
    handlePwdChange(event){
        this.setState({password: event.target.value});
    }
    handleOTPChange(event){
      this.setState({otp: event.target.value});
    }
    handleRePwdChange(event){
        this.setState({repassword: event.target.value});
    }
    validate() {
        let input = this.state;
        let errors = {};
        let isValid = true;       
        if (!input["newPassword"]) {
          isValid = false;
          errors["newPassword"] = "Please enter your password.";
        }    
        if (!input["repassword"]) {
          isValid = false;
          errors["repassword"] = "Please enter your confirm password.";
        }    
        if (typeof input["newPassword"] !== "undefined") {
          if (input["newPassword"].length < 6) {
            isValid = false;
            errors["newPassword"] = "Please add at least 6 charachter.";
          }
        }    
        if (
          typeof input["newPassword"] !== "undefined" &&
          typeof input["repassword"] !== "undefined"
        ) {
          if (input["newPassword"] != input["repassword"]) {
            isValid = false;
            errors["repassword"] = "Passwords don't match.";
          }
        }
        this.setState({
          errors: errors
        });   
        console.log(errors); 
        return isValid;
      }
    async handleSubmit(event) {
        //alert('Form was submitted');
        if(this.validate()){
            try{
                event.preventDefault();
                let messageBody=JSON.stringify({
                  email: this.state.email,
                  password: this.state.password,
                });
                console.log(messageBody);
      
                let res = await fetch("http://localhost:8080/api/v1/password_reset", {
                  method: "POST",
                  body: messageBody,
                  mode:'cors',
                  headers:{
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                  }
                });
          
                //let resJson = await res.json();
                if (res.status === 200) {
                    //redirect to login
                    return <Navigate to='/login'  />
                } else {
      
                }
                
            } catch (err) {
            console.log(err);
            }
        }
        
      }
    
    resetForm(event){

    }

    render(){
        return(
        <>
        <section
            class="p-5 w-100"
            style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}>
            <div class="row">
            <div class="col-12">
                <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p class="text-center h1 fw-bold mb-5 mt-4">Reset Password</p>
                        <p>Please enter the new password and re-type it.</p>
                        <form onSubmit={this.handleSubmit}>
                        <div className='row'>
                          <div className='col-4'></div>
                          <div className="col-4 mt-3">
                          
                          <label htmlFor="pwd" className="form-label">
                              OTP
                          </label>
                          <input
                              id="otp"
                              name="otp"
                              className="form-control"
                              value={this.state.otp}
                              onChange={this.handleOTPChange}
                          />
                          </div>
                          
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col text-left">
                            <label htmlFor="pwd" className="form-label">
                                New Password
                            </label>
                            <input
                                id="pwd"
                                name="pwd"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handlePwdChange}
                                
                            />
                            
                            </div>
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col text-left">
                            <label htmlFor="rePwd" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                id="rePwd"
                                name="rePwd"
                                className="form-control"
                                value={this.state.repassword}
                                onChange={this.handleRePwdChange}
                                
                            />
                            
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-right actionButtons">
                            

                            <Button
                                variant="primary"
                                size="sm"
                                onClick={this.handleSubmit}
                            >
                                Reset my password
                            </Button>
                            </div>
                        </div>
                        
                        </form>
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid"
                        alt=""
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </>
        );
    }
}

export default PasswordReset;