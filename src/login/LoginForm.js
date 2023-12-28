import Button from 'react-bootstrap/Button';
import React from "react";
import {useRef} from 'react';

class LoginForm extends React.Component{
    
    constructor(props) {
        super(props);
        this.state={email:null, password:null};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePwdChange=this.handlePwdChange.bind(this);
        this.resetForm=this.resetForm.bind(this);
    }
    
    handleEmailChange(event){
        this.setState({email: event.target.value});
    }
    handlePwdChange(event){
        this.setState({password: event.target.value});
    }
    async handleSubmit(event) {
        //alert('Form was submitted');
        try{
          event.preventDefault();
          let messageBody=JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          });
          console.log(messageBody);

          let res = await fetch("http://localhost:8080/api/v1/set_data", {
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
            

          } else {

          }
          
        } catch (err) {
          console.log(err);
        }
      }
    
    resetForm(event){
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = null)
        );
        this.setState({email: null});
        this.setState({password: null});
    }
    render() {
        return(
        <section
            class="p-5 w-100"
            style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
        >
            <div class="row">
            <div class="col-12">
                <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p class="text-center h1 fw-bold mb-5 mt-4">Sign in</p>
                        <form onSubmit={this.handleSubmit}>
                   
                        <div className="row mt-3">
                            <div className="col text-left">
                            <label htmlFor="first" className="form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                ref={this.reEmail}
                                className="form-control"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                
                            />
                            
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-left">
                            <label htmlFor="first" className="form-label">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                ref={this.rePwd}
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handlePwdChange}
                                
                                type="password"
                            />
                           
                            </div>
                        </div>
                       
                        <div className="row mt-3">
                            <div className="col text-right actionButtons">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={this.resetForm}
                            >
                                Clear
                            </Button>

                            <Button
                                variant="primary"
                                size="sm"
                                onClick={this.handleSubmit}
                            >
                                Login
                            </Button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <br />
                            <div className="col text-right">
                            Already have an account? <a href="/register">Sign up</a>
                            </div>
                            <div className="col text-right">
                            Forgot password? <a href="/forgot_pwd">click here</a>
                            </div>
                        </div>
                        </form>
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{display: "flex", justifyContent:"center"}}>
                        <img
                        src="/img/preview.jpg"
                        class="img-fluid"
                        alt=""
                        width={'80%'}
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        );
    }
}
export default LoginForm;