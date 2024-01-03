import Button from 'react-bootstrap/Button';
import React from "react";
import  { Navigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state={fname:null, lname:null, email:localStorage.getItem("email"), city:null, errors:[]}
        // Listen to storage event
        window.addEventListener('storage', (e) => this.storageChanged(e));

        // Bind this to storageChanged()
        this.storageChanged = this.storageChanged.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFnameChange=this.handleFnameChange.bind(this);
        this.handleLnameChange=this.handleLnameChange.bind(this);
        this.handleCityChange=this.handleCityChange.bind(this);
        this.resetForm=this.resetForm.bind(this);
    }
    storageChanged(e) {
        if(e.key === 'isLoggedIn') {
            this.setState({isLoggedIn: e.newValue})
        }
    }
    async componentDidMount() {
        this.setState({fname: "first name", lname: "last name", city: "city"})
        try {
            let email = localStorage.getItem('email')
            let res = await fetch("http://localhost:8080/api/v1/getCustomer?email="+email, {
                method: "GET",
                mode:'cors',
                headers:{
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                }
            });
    
            let resJson = await res.json();
            if (res.status === 200) {
                this.setState({fname: resJson.fname, lname: resJson.lname, city: resJson.city})

            } else {

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    handleFnameChange(event){
        this.setState({fname: event.target.value});
    }
    handleLnameChange(event){
        this.setState({lname: event.target.value});
    }
    handleCityChange(event){
        this.setState({city: event.target.value});
    }
    async resetForm(){
        this.setState({fname: "first name", lname: "last name", city: "city"})
    
    }
    
    async handleSubmit(event){
    
        try{
            event.preventDefault();
            let messageBody=JSON.stringify({
                fname: this.state.fname,
                lname: this.state.lname,  
                city: this.state.city,
                email: localStorage.getItem("email")
            });
            console.log(messageBody);

            let res = await fetch("http://localhost:8080/api/v1/editCustomer", {
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
                    window.location.assign('/home');

            } else {

            }
            
        } catch (err) {
            console.log(err);
        }
        
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
                        <p class="text-center h1 fw-bold mb-5 mt-4">Edit profile</p>
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
                                Save
                            </Button>
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

export default Profile;
