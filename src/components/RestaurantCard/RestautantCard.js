import { useState } from 'react';
import './RestaurantCard.css';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

export function RestuarantCard({id, title, address, menuList, chooseRestaurant}){
    const [menu, setMenu] = useState(menuList)

    const getMenuItems = async (e)=>{
        console.log(menu)
        try {
            
            let res = await fetch("http://localhost:8080/api/v1/restaurant?id="+id, {
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

            } else {
                //alert('Something went wrong!!!');
                
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            //alert('Something went wrong!!!');
        }
        // await setMenu([{
        //     "id": 1,
        //     "text": "sprite"
        // }, {
        //     "id": 2,
        //     "text": "Red bull"
        // }, {
        //     "id": 3,
        //     "text": "tea bun"
        // }, {
        //     "id": 4,
        //     "text": "coca cola"
        // }, {
        //     "id": 5,
        //     "text": "pizza"
        // }, {
        //     "id": 6,
        //     "text": "fried rice"
        // }, {
        //     "id": 7,
        //     "text": "kottu"
        // }]);
        //console.log(menu)
        await chooseRestaurant(title, menu, id);
    }
    return(<>
    <div className="row p-1 m-1" style={{backgroundColor:"#eee", borderRadius:'10px', cursor:'pointer',boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 28px 0 rgba(0,0,0,0.19)'}} onClick={getMenuItems}>
        <div className="col-4 d-flex align-items-center container"  style={{}}><img src="img/restaurantIcon.png" style={{objectFit:"contain"}} /></div>
        <div className="col-8"  style={{backgroundColor:"#96faf0"}}>
            <div className="row d-flex align-items-center p-1"><h4 style={{color:'#a60d2c'}}>{title}</h4></div>
            <div className="row p-2">{address}</div>
            
        </div>
    </div>
    </>);
}
export default RestuarantCard;