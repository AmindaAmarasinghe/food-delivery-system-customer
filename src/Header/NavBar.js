import React, { Component } from "react"
import './NavBar.css';
import { Link } from "react-router-dom";
class NavBar extends Component {
  state = {
    click: true,
  };

  handleMenu = () => {
    this.setState({ click: !this.state.click });
  };

  closeMenu = (page_num) => {
    this.setState({ click: true});
  };


  render() {
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
            </div>
          
          {/* </div> */}

          

        </nav>
      </>
    );
  }
}
export default NavBar;