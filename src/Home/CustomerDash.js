
import React from "react";
import RestuarantList from "./RestuarantList";
import "./Home.css";


class CustomerDash extends React.Component{
    constructor(props) {
        super(props);
        this.state={search:""}
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
        var lowerCase = e.target.value.toLowerCase();
        this.setState({search: lowerCase});
    }
    render(){
        return(
        <>
        <div className="row" style={{backgroundImage:"url(/img/home.jpg)", backgroundRepeat:'no-repeat', height: '800px'}}>
            <div className="col-md-6 col-sm-12 d-flex justify-center pt-5" style={{backgroundColor: 'rgba(237, 76, 186, 0.4)'}}>
                <div className="col-3"></div>
                <div className="col-6 text-left">
                <label htmlFor="search" className="form-label">
                    Find Restuarant
                </label>
                <input
                    id="search"
                    name="search"
                    className="form-control"
                    value={this.state.search}
                    onChange={this.handleChange}
                    
                />
                <RestuarantList input={this.state.search} />
                <div className="col-3"></div>
                </div>
            </div>
            <div className="col-md-6 col-sm-12">

            </div>
            
        </div>
        </>
        );
    }
}

export default CustomerDash;