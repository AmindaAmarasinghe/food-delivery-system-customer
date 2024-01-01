import Button from 'react-bootstrap/Button';
import React from "react";

class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={email:null};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        
    }
    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    async handleSubmit(event) {
        //alert('Form was submitted');
        try{
          event.preventDefault();
          let messageBody=JSON.stringify({
            email: this.state.email
          });
          console.log(messageBody);

          let res = await fetch("http://localhost:8080/api/v1/reset_password_otp", {
            method: "POST",
            body: messageBody,
            mode:'cors',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            }
          });
          console.log(messageBody);
          let resJson = await res.json();
          if (res.status === 200) {
            console.log(resJson.key);
            if(resJson.is_successful==="true"){
                let otp=resJson.code;
                window.location.assign('/reset_pwd?otp='+otp+"&email="+this.state.email);
            }
          } else {

          }
          
        } catch (err) {
          console.log(err);
        }
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
                        <p>Please enter the email address that you used to register, and we will send you a link to reset your password via Email.</p>
                        <form onSubmit={this.handleSubmit}>
                   
                        <div className="row mt-3">
                            <div className="col text-left">
                            
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
                        <div className="row mt-3">
                            <br />
                            <div className="col text-right">
                            return to <a href="/reset_pwd">Sign in</a>
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

export default ForgotPassword;