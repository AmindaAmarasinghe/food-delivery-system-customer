import Button from 'react-bootstrap/Button';
import React from "react";
import  { Navigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
class RegisterForm extends React.Component{

    constructor(props) {
        super(props);
        this.state={fname:null, lname:null, email:null, password:null, repassword:null, city:null, errors:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFnameChange=this.handleFnameChange.bind(this);
        this.handleLnameChange=this.handleLnameChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePwdChange=this.handlePwdChange.bind(this);
        this.handleRePwdChange=this.handleRePwdChange.bind(this);
        this.handleCityChange=this.handleCityChange.bind(this);
        this.resetForm=this.resetForm.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem('isLogged')){
            window.location.assign('/login')
        }
    }

    handleFnameChange(event){
        this.setState({fname: event.target.value});
    }
    handleLnameChange(event){
        this.setState({lname: event.target.value});
    }
    handleEmailChange(event){
        this.setState({email: event.target.value});
    }
    handleCityChange(event){
        this.setState({city: event.target.value});
    }
    handlePwdChange(event){
        this.setState({password: event.target.value});
    }
    handleRePwdChange(event){
        this.setState({repassword: event.target.value});
    
    }
    validate() {
        let input = this.state;
        let errors = {};
        let isValid = true;       
        if (!input["password"]) {
          isValid = false;
          errors["password"] = "Please enter your password.";
        }    
        if (!input["repassword"]) {
          isValid = false;
          errors["repassword"] = "Please enter your confirm password.";
        }    
        if (typeof input["password"] !== "undefined") {
          if (input["password"].length < 6) {
            isValid = false;
            errors["password"] = "Please add at least 6 charachter.";
          }
        }    
        if (
          typeof input["password"] !== "undefined" &&
          typeof input["repassword"] !== "undefined"
        ) {
          if (input["password"] != input["repassword"]) {
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
    async handleSubmit(event){
        if(this.validate()){
            try{
                event.preventDefault();
                const hashedPassword = bcrypt.hashSync(this.state.password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
                let messageBody=JSON.stringify({
                    fname: this.state.fname,
                    lname: this.state.lname,  
                    email: this.state.email,
                    password: hashedPassword,
                    city: this.state.city
                });
                console.log(messageBody);
    
                let res = await fetch("http://localhost:8080/api/v1/setCustomer", {
                method: "POST",
                body: messageBody,
                mode:'cors',
                headers:{
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                }
                });
        
                let resJson = await res.json();
                if (res.status === 200) {
                     //redirect to login
                     window.location.assign('/login');
    
                } else {
    
                }
                
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    resetForm(event){
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = null)
        );
        this.setState({fname: null});
        this.setState({lname: null});
        this.setState({email: null});
        this.setState({password: null});
        this.setState({repassword: null});
        this.setState({city: null});
    }
    render() {
        return(
        <>   
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
                        <p class="text-center h1 fw-bold mb-5 mt-4">Sign up</p>
                        <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col text-left">
                            <label htmlFor="first" className="form-label">
                                First Name
                            </label>
                            <input
                                id="first"
                                name="first"
                                className="form-control"
                                value={this.state.fname}
                                onChange={this.handleFnameChange}
                                
                            />
                           
                            </div>
                            <div className="col text-left">
                            <label htmlFor="last`" className="form-label">
                                Last Name
                            </label>
                            <input
                                id="last"
                                name="last"
                                className="form-control"
                                value={this.state.lname}
                                onChange={this.handleLnameChange}
                                
                            />
                            
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-left">
                            <label htmlFor="city" className="form-label">
                                City
                            </label>
                            <input
                                id="city"
                                name="city"
                                className="form-control"
                                value={this.state.city}
                                onChange={this.handleCityChange}
                                
                            />
                            
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-left">
                            <label htmlFor="first" className="form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
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
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handlePwdChange}
                                
                                type="password"
                            />
                           
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-left">
                            <label htmlFor="first" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                id="repassword"
                                name="repassword"
                                className="form-control"
                                value={this.state.repassword}
                                onChange={this.handleRePwdChange}
                             
                                type="password"
                            />
                            
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-right actionButtons">
                            <Button
                                variant="secondary"
                                size="sm" style={{margin:'5px'}}
                                onClick={this.resetForm}
                            >
                                Clear
                            </Button>

                            <Button
                                variant="primary"
                                size="sm" style={{margin:'5px'}}
                                onClick={this.handleSubmit}
                            >
                                Register
                            </Button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <br />
                            <div className="col text-right">
                            Already have an account? <a href="/login">Sign in</a>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <br />
                            <div className="col text-right">
                            {/* {this.state.errors.map(err => <div>{err}</div>)} */}
                            </div>
                        </div>
                        </form>
                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{display: "flex", justifyContent:"center"}}>
                        <img
                        src="/img/Food-Delivery-768x768.png"
                        className="img-fluid"
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
        </>
        );
    }
}

export default RegisterForm;
