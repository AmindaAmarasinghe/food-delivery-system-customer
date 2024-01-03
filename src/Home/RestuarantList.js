import { React, useState } from 'react'
import data from "./ListData.json"

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
        <ul style={{textDecoration:'none', paddingTop:'50px'}}>
            {filteredData.map((item) => (
                <li  key={item.id}><a href='/restuarant'>{item.text}</a></li>
            ))}
        </ul>
    )
}

export default RestuarantList
