import { useState } from 'react';
import './RestaurantCard.css';

export function RestuarantCard({id, title, address, rating, chooseRestaurant}){
    const [menu, setMenu] = useState([])

    const getMenuItems = async (e)=>{
        
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
        await setMenu([{
            "id": 1,
            "text": "sprite"+id
        }, {
            "id": 2,
            "text": "Red bull"
        }, {
            "id": 3,
            "text": "tea bun"
        }, {
            "id": 4,
            "text": "coca cola"
        }, {
            "id": 5,
            "text": "pizza"
        }, {
            "id": 6,
            "text": "fried rice"
        }, {
            "id": 7,
            "text": "kottu"
        }]);
        console.log(menu)
        await chooseRestaurant(title, menu, id);
    }
    return(<>
    <div className="row p-1 m-1" style={{backgroundColor:"#eee", borderRadius:'10px', cursor:'pointer'}} onClick={getMenuItems}>
        <div className="col-4 d-flex align-items-center container"  style={{}}><img src="img/restuarant.jpeg" style={{objectFit:"contain"}} /></div>
        <div className="col-8"  style={{backgroundColor:"#bbb"}}>
            <div className="row d-flex align-items-center p-1"><h3>{title}</h3></div>
            <div className="row p-2">{address}</div>
            <div className='row p-2'>{rating}</div>
        </div>
    </div>
    </>);
}
export default RestuarantCard;