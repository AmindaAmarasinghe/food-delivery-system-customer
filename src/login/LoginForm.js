import Button from 'react-bootstrap/Button';
import React, { useState, useReducer, useEffect } from "react";
import {useRef} from 'react';
import  { Navigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { useAppContext } from '../AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { appReducer } from '../reducer.js'
import {store} from '../index.js';

const salt = bcrypt.genSaltSync(10);

export function resetForm(event){
    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = null)
    );
    
}

export function Logout(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [current, dispatch] = useReducer(appReducer, store.getState());
    const [isLoggedV, setIsLoggedV] = useState(false);

    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        if (isLogged) {
            setIsLoggedV(true)
        
        }
        if (!isLoggedV) {
            localStorage.setItem('isLogged', false);
        }
    }, [isLoggedV]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoggedV(false);
        window.location.assign('/login');
    }
    const cancelLogout = async (e) => {
        e.preventDefault();
        setIsLoggedV(true);
        window.location.assign('/home');
    }
    return(
        <section
            class="p-5 w-100"
            style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
        >
        <div class="row">
            <div class="col-12">
                <div class="card text-black" style={{ borderRadius: "25px" }}>
                    <div class="card-body p-md-5">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                <p class="text-center h1 fw-bold mb-5 mt-4">Are you want to logout?</p>
                                
                                <div className="row mt-3">
                                    <div className="col text-right actionButtons"><Button variant="secondary"
                                    size="sm" onClick={cancelLogout}>Cancel</Button><Button size="sm" onClick={handleSubmit}>Logout</Button></div>
                                </div>
                                
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
export function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [current, dispatch] = useReducer(appReducer, store.getState());
    const [isLoggedV, setIsLoggedV] = useState(false);

    useEffect(() => {
        if (isLoggedV) {
            localStorage.setItem('isLogged', true);
            localStorage.setItem('email', email);
            localStorage.setItem('username', email);
        }
    }, [isLoggedV]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //alert('Form was submitted');
        try{
          
          const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
          let messageBody=JSON.stringify({
            email: email,
            password: hashedPassword
          });
          console.log(messageBody);
    
          let res = await fetch("http://localhost:8080/api/v1/login", {
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
            console.log(resJson.key);
            console.log(localStorage.getItem("isLogged"))
            if(resJson.key==="value1"){
                //store.dispatch(login());
                // await handleLogin()
                // console.log(store.getState().auth.isLoggedIn)
                setIsLoggedV(true);
                //console.log(localStorage.setItem("isLogged",true))
                console.log(localStorage.getItem("isLogged"))
                window.location.assign('/home');
                
            }else{
                alert('your email or password is invalid!!!');
            }
          } else {
            
          }
          
        } catch (err) {
          console.log(err);
        }
        //console.log(store.getState().auth.isLoggedIn)
    }
    
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
                            <form onSubmit={ handleSubmit }>
                    
                            <div className="row mt-3">
                                <div className="col text-left">
                                <label htmlFor="first" className="form-label">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    value={email}
                                    className="form-control"
                                    
                                    onChange={e => setEmail(e.target.value)}
                                    
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
                                    value={password}
                                    className="form-control"
                                    
                                    onChange={e => setPassword(e.target.value)}
                                    
                                    type="password"
                                />
                            
                                </div>
                            </div>
                        
                            <div className="row mt-3">
                                <div className="col text-right actionButtons">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={()=>{
                                        resetForm();
                                        setEmail(null);
                                        setPassword(null);
                                    }}
                                >
                                    Clear
                                </Button>

                                <Button
                                    variant="primary"
                                    size="sm"
                                    type='submit'
                                    onClick={ handleSubmit }
                                >
                                    Login
                                </Button>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <br />
                                <div className="col text-right">
                                Don't have an account? <a href="/register">Sign up</a>
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
export function Login(){
    const [isLoggedV, setIsLoggedV] = useState(false);

    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        if (isLogged) {
            setIsLoggedV(true)
            console.log(isLogged);
        }else{
            setIsLoggedV(false)
        }
    }, [isLoggedV]);

    return(<>{isLoggedV ? Logout() : LoginForm()}</>);
}
export default Login;