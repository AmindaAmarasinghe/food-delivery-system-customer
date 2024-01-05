import { React, useState } from 'react'
import data from "./ListData.json"
import RestuarantCard from '../components/RestaurantCard/RestautantCard';

function RestuarantList(props) {
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul style={{textDecoration:'none', paddingTop:'50px', listStyle:"none"}}>
            {filteredData.map((item) => (
                <li  key={item.id}><RestuarantCard id={item.id} title={item.text} address="address" rating={4.5} chooseRestaurant={props.chooseRestaurant}/></li>
            ))}
        </ul>
    )
}

export default RestuarantList
