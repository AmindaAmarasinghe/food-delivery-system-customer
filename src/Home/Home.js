
import React from "react";
import "./Home.css";
import  { Link } from 'react-router-dom';

class Home extends React.Component{
    componentDidMount(){
        if(localStorage.getItem('isLogged')){
            window.location.assign('/home')
        }
    }
    render(){
        return(
        <>
        <div className="row" style={{backgroundImage:"url(/img/home.jpg)", backgroundRepeat:'no-repeat', height: '800px'}}>
            <div className="col-md-6 col-sm-12">

            </div>
            <div className="col-md-6 col-sm-12" style={{backgroundColor: 'rgba(237, 76, 186, 0.4)'}}>
                <div className="row d-flex justify-center">
                    <h2 style={{margin:'40px'}}>Welcome to your online food delivery service</h2>
                    <div><img src="./img/welcome_pic.png" alt="" className="w-50" style={{borderRadius:'50px'}}/></div>
                </div>
                <div className="row d-flex justify-center" style={{marginTop:'40px'}}>
                    <div className=""><Link to="/login"><button className="col-12 m-2 buttonCss">Login</button></Link></div>
                </div>
                <div className="row d-flex justify-center" >
                    <div><Link to="/register"><button className="col-12 m-2 buttonCss" >Sign up</button></Link></div>
                </div>
            </div>
        </div>
        </>
        );
    }
}

export default Home;