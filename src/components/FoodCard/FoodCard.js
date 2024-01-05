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

export function FoodCard({id, title, price, restaurant_id}){
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const addToCart = ()=>{
        dispatch({type:'ADD_ITEM', payload:{"food_id":id,"title":title, "price":price, "restaurant_id" : restaurant_id}});
        handleClose();
    }
    return(<>
        {/* <div className='col-4'></div> */}
        <div className=" p-1 m-1" style={{backgroundColor:"#eee", borderRadius:'10px', cursor:'pointer'}} >
            <div className="row d-flex align-items-center container"  style={{}}><img src="img/location.png" className='p-3' style={{objectFit:"contain"}} /></div>
            <div className="row d-flex align-items-center"  style={{backgroundColor:"#793"}}><h4>{title}</h4></div>
            <div className="row d-flex align-items-center"  style={{backgroundColor:"#bbb"}}>
                <div className="col-6 d-flex align-items-center justify-content-center p-1"><h5>{price}</h5></div>
                <div className="col-6 p-2 d-flex justify-content-end"><Button onClick={handleClickOpen}>+</Button></div>
                
            </div>
        </div>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
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