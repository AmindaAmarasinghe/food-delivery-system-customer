import React, { useState, useEffect } from "react"
import './NavBar.css';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
//import { useAppContext } from '../AppContext';
//import {store} from '../index.js';
import { connect } from 'react-redux';

export function RenderAuthButton (){
  const auth = useSelector(state => state.auth);
  //const { isLoggedInRef, login, logout } = useAppContext();
  //const logged = useSelector(() => store.getState().auth.isLoggedIn);
  const [isLoggedV, setIsLoggedV] = useState(false);
  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    if (isLogged) {
      setIsLoggedV(true)
      console.log(isLogged);
    }
  }, [isLoggedV]);
  console.log(isLoggedV)
  if (isLoggedV) {
    return (
    <div className="row">
      <div className="col-6 ">
      <Link to="/profile" style={{textDecoration:"none"}}>
      <div className="row d-flex justify-content-end">
        <div className="col-6"><img
        src="/img/profile.png"
        class="img-fluid"
        alt=""
        width={'70px'}
        /></div>
      <div className="col-4 d-flex justify-left align-items-center text-white"><h5>{localStorage.getItem('username')}</h5></div>
      </div></Link></div>
      <div className="col-2 d-flex justify-left align-items-center "><Link to="/login" style={{textDecoration:"none"}}><div className="col-2 text-white"><img src="./img/logout.png" width={'30px'} /></div></Link></div>
    </div>
    );
  } else {
    return <></>;
  }
}

const NavBar=()=>{
  
  return (
    <>
      <nav className="row pt-3 pb-3"
          style={{ backgroundColor: "#111", borderRadius: "0 0 0 0"}}>
        {/* <div className="navbar-container"> */}
          <a className=" col-md-6 col-sm-12 col-lg-4 text-white" style={{ cursor: "pointer",textDecoration: "none"}}>
            <div className="row" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <div className=" col-3 col-md-3 d-flex justify-center"><img src="./img/logo-removebg-preview.png" className="w-100 brand" style={{marginLeft:"20px"}} alt="" /></div>
              <div className=" col-md-9 col-sm-12 col-12"><Link to="/home" style={{textDecoration:"none"}}><h2 className=" text-white text-center" >Food Delivery</h2></Link></div>
            </div>
          </a>
          <div className="col-md-6 col-lg-8" style={{alignContent:"center", position:"relative"}}>
          {/* <ul className={!this.state.click ? "nav-menu active" : "nav-menu" } style={{backgroundColor:"#333",margin: '0', position: "absolute",
          top: "50%",
          transform: "translateY(-50%)"}}>
            <li className="nav-item">
              <a
                href="home"
                className={
                  this.props.page_no == 1
                    ? "nav-links current-page"
                    : "nav-links"
                }
                onClick={() => this.closeMenu(1)}
              >
                HOME
              </a>
            </li>


            <li className="nav-item">
              <a
                href="/login"
                className={
                  this.props.page_no == 2
                    ? "nav-links current-page"
                    : "nav-links"
                }
                onClick={() => this.closeMenu(2)}
              >
                Login
              </a>
            </li>


            <li className="nav-item">
              <a
                href="/register"
                className={
                  this.props.page_no == 3
                    ? "nav-links current-page"
                    : "nav-links"
                }
                onClick={() => this.closeMenu(3)}
              >
                Sign up
              </a>
            </li>


            </ul> */}
            <div className="row">
              <div className="col-4"></div>
              <div className="col-2"></div>
              <div className="col-6">
                {RenderAuthButton()}
              </div>
            </div>
          </div>
        
        {/* </div> */}

        

      </nav>
    </>
  );
  
}
export default NavBar;