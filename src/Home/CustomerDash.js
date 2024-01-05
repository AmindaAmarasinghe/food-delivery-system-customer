
import React from "react";
import RestuarantList from "./RestuarantList";
import RestuarantCard from "../components/RestaurantCard/RestautantCard"
import "./Home.css";
import FoodCard from "../components/FoodCard/FoodCard"
import { Button } from "react-bootstrap";
import Popup from "../components/Popup/Popup";


class CustomerDash extends React.Component{
    constructor(props) {
        super(props);
        this.state={search:"",restaurant_id:null, restuarant:"Check menus of your favourite restaurants", menu:[], popupOpen:false}
        this.handleChange=this.handleChange.bind(this);
        this.chooseRestaurant=this.chooseRestaurant.bind(this);
        this.dialogOpen=this.dialogOpen.bind(this);
    }
    chooseRestaurant = (title, menuList, restaurant_id) => {
        console.log(menuList)
        this.setState({restuarant: title, menu: menuList, restaurant_id: restaurant_id});
    };
    handleChange(e){
        var lowerCase = e.target.value.toLowerCase();
        this.setState({search: lowerCase});
    }
    dialogOpen(){
        this.setState({popupOpen: true});
    }
    dialogclose(t){
        t.setState({popupOpen: false});
    }
    render(){
        if(!localStorage.getItem('isLogged')){
            window.location.assign('/login');
        }
        if(this.state.popupOpen){
            return(<Popup closeFunction={this.dialogclose} classT={this}/>);
        }
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
                <RestuarantList input={this.state.search} chooseRestaurant={this.chooseRestaurant}/>
                
                <div className="col-3"></div>
                </div>
            </div>
            <div className="col-md-6 col-sm-12" style={{paddingTop:'30px'}}>
                <h4 className="bg-info p-2">{this.state.restuarant}</h4>
                <ul className="row" style={{textDecoration:'none', paddingTop:'50px', textAlign:'left', listStyle:'none'}}>
                    {this.state.menu.map((item) => (
                        <li className="col-3" key={item.id}><div className=""><FoodCard id={item.id} title={item.text} price="Rs. 500" restaurant_id={this.state.restaurant_id}/></div></li>
                    ))}
                </ul>
                <div className="row">
                    <div className="col-9 "></div>
                    <div className="col-1"><Button style={{backgroundColor:"#000", position:"fixed", bottom:'10px', width:'100px', padding: '5px 5px', borderRadius: '60px', fontSize: '15px', textAlign: 'center', boxShadow: '0 8px 26px 0 rgba(0,0,0,0.2), 0 6px 28px 0 rgba(0,0,0,0.19)'}} onClick={this.dialogOpen}><img src="./img/pngegg.png" className="w-100"/></Button></div>
                    <div className="col-2"></div>
                </div>
            </div>
            
        </div>
        </>
        );
    }
}

export default CustomerDash;