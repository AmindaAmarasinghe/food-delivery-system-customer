
import React, { useState } from "react";
import RestuarantList from "./RestuarantList";
import RestuarantCard from "../components/RestaurantCard/RestautantCard"
import "./Home.css";
import FoodCard from "../components/FoodCard/FoodCard"
import { Button } from "react-bootstrap";
import Popup from "../components/Popup/Popup";
import { Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

export function CustomerDash(){
   
    const [search, setSearch]=useState("");
    const [restaurant_id, setRestaurant_id]=useState(null)
    const [restaurant, setRestaurant]= useState("Check menus of your favourite restaurants") //selected restaurant
    const [restaurantCart, setRestaurantCart] = React.useState(null); //restaurant corresponding to the cart
    const [menu, setMenu] = useState([])
    const [popupOpen, setPopupOpen] = useState(false)
    const count = useSelector((data) => data.items.length);

    const chooseRestaurant = (title, menuList, restaurant_id) => {
        //console.log('selected restaurant: ', title);
        setRestaurant(title);
        setMenu(JSON.parse(menuList));
        setRestaurant_id(restaurant_id);

    };
    const chooseRestaurantCart=(name)=>{
        setRestaurantCart(name);
        //console.log('selected restaurant: ', restaurant);
        // console.log('selected restaurantCart: ', restaurantCart);
        // console.log('comparing: ',compareRestaurant())
    }
    const compareRestaurant=()=>{
        if(restaurant===restaurantCart){
            return true;
        }else{
            return false;
        }
    }
    const handleChange=(e)=>{
        var lowerCase = e.target.value.toLowerCase();
        setSearch(lowerCase);
    }
    const dialogOpen=()=>{
        setPopupOpen(true);
    }
    const dialogclose=(t)=>{
        setPopupOpen(false);
    }

    if(!localStorage.getItem('isLogged')){
        window.location.assign('/login');
    }
    if(popupOpen){
        return(<Popup closeFunction={dialogclose} restaurantCart={restaurantCart} classT={this}/>);
    }

    return(
    <>
    <div className="row" style={{ backgroundRepeat:'no-repeat', height: '800px'}}>
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
                value={search}
                onChange={handleChange}
                
            />
            <RestuarantList input={search} chooseRestaurant={chooseRestaurant} />
            
            <div className="col-3"></div>
            </div>
        </div>
        <div className="col-md-6 col-sm-12" style={{paddingTop:'30px'}}>
            <h4 className="bg-info p-2" style={{boxShadow: '0 8px 6px 0 rgba(0,0,0,0.2), 0 6px 8px 0 rgba(0,0,0,0.19)'}}>{restaurant}</h4>
            {(menu.length==0) && <div className="row d-flex justify-content-center"><img className="col-8" src="img/food_shop.avif"></img><h5 className="m-4 text-success">Top rated restaurats are here</h5><img className="col-8" src="img/Restaurants.png" /></div>}
            <ul className="row" style={{textDecoration:'none', paddingTop:'50px', textAlign:'left', listStyle:'none'}}>
                {menu.map((item) => (
                    <li className="col-3" key={item['id']}><div className=""><FoodCard id={item['id']} title={item['title']} price={item['price']} restaurant_id={restaurant_id} restaurant_={restaurant} restaurant_cart={restaurantCart} chooseRestaurantCart={chooseRestaurantCart} compareRestaurant={compareRestaurant} setPopupOpen={setPopupOpen} count_={count}/></div></li>
                ))}
            </ul>
            <div className="row">
                <div className="col-9 "></div>
                <div className="col-1">
                        
                        
                    <Button style={{backgroundColor:'transparent', border:'#f5a422', position:"fixed", bottom:'10px', width:'100px', padding: '5px 5px', borderRadius: '60px', fontSize: '15px', textAlign: 'center', boxShadow: '0 8px 26px 0 rgba(0,0,0,0.2), 0 6px 28px 0 rgba(0,0,0,0.19)'}} onClick={dialogOpen}>
                    <div style={{position:'absolute'}}><Badge count={count} offset={[80, 0]}></Badge></div><img src="./img/pngegg.png" className="w-100"/>
                    </Button>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
        
    </div>
    </>
    );
    
}

export default CustomerDash;