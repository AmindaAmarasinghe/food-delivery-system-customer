import { Button } from 'react-bootstrap';
import './FoodCard.css'
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function FoodCard({id, title, price, restaurant_id, restaurant_, restaurant_cart, chooseRestaurantCart, compareRestaurant, setPopupOpen, count_}){
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const [open, setOpen] = React.useState(false);
    // const [restaurantCart, setRestaurantCart] = React.useState(restaurant_cart); 
    // const [restaurant, setRestaurant] = React.useState(restaurant_); 

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const addToCart = async()=>{
        
        if(count_==0 || restaurant_cart==null || compareRestaurant()){
          dispatch({type:'ADD_ITEM', payload:{'food_id':id,'title':title, 'price':price, 'order_status':'Added to cart', 'payment_status':'', 'quantity':1}});
          console.log({type:'ADD_ITEM', payload:{"food_id":id,"title":title, "price":price, order_status:'Added to cart',payment_status:'', 'quantity':1}});
          //console.log('restaurant of food item: ', restaurant_);
          await chooseRestaurantCart(restaurant_);
        }else{
          alert("please place the order for items in the cart before adding items from another restaurant");
          setPopupOpen(true)
        }
        handleClose();
    }
    return(<>
        {/* <div className='col-4'></div> */}
        <div className="m-1 p-1" style={{backgroundColor:'transparent', borderRadius:'10px', cursor:'pointer'}} >
            <div className="row d-flex align-items-center"  style={{backgroundColor:"#fab4eb",borderRadius:'20px 0px 0px 0px'}}><img src="img/food1.png" className='p-3' style={{objectFit:"contain"}} /></div>
            <div className="row d-flex align-items-center text-center"  style={{backgroundColor:"#6ff2d4"}}><h5>{title}</h5></div>
            <div className="row d-flex align-items-center p-1"  style={{backgroundColor:"#bc9cf7",borderRadius:'0px 0px 10px 0px',boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 28px 0 rgba(0,0,0,0.19)'}}>
                <div className="col-4 d-flex align-items-center justify-content-center text-white p-1">Rs. {price}</div>
                <div className="col-8 d-flex justify-content-end container"><Button style={{backgroundColor:'#fff', border:'0px', borderRadius:"20px", color:'#000'}} onClick={handleClickOpen}><img src='./img/add_cart.png'  style={{objectFit:"contain", margin:'0px'}} /></Button></div>
                
            </div>
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle>{"Do you want to add this item to cart?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {title} - {price}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
            <Button onClick={addToCart}>Add</Button>
          </DialogActions>
        </Dialog>
        {/* <div className='col-4'></div> */}
    </>);
}
export default FoodCard;