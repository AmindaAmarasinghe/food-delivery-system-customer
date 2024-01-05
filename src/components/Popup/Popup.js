import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {store} from '../../index';
import { useDispatch, useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup({closeFunction, classT}) {
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [itemList, setItemList] = React.useState(store.getState('items'));
  const [response, setResponse] = React.useState("");
  const [status, setStatus] = React.useState("Delivered");
  const [ordered, setOrdered] = React.useState(true);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const placeOrder = async () => {

    try{
      const {items} = itemList;
      let messageBody=JSON.stringify({
        email: localStorage.getItem('email'),
        orders: items
      });
      console.log(messageBody);

      let res = await fetch("http://localhost:8080/api/v1/placeOrder", {
        method: "POST",
        body: messageBody,
        mode:'cors',
            headers:{
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            }
            });

      let resJson = await res.json();
      if (res.status === 200) {
        console.log(resJson.key);
        console.log(localStorage.getItem("isLogged"))
        if(resJson.key==="success"){
          setResponse("Order was placed successfully!!!");
          setOrdered(true);
            
        }else{
          setResponse("something went wrong!!!");
          alert('something went wrong!!!');
        }
      } else {
        setResponse("something went wrong!!!");
        alert("something went wrong!!! \n Application is not responding");
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  const selectItem = (title, price) => {
    setSelectedItem({"title":title, "price":price});
  };
  const deleteItem = () => {
    //dispatch({type:'REMOVE_ITEM', index:1});
    console.log('delete clicked')
  };
  const handleClose = () => {
    closeFunction(classT);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Food Cart
            </Typography>
            {(!ordered) && <Button autoFocus color="inherit" onClick={placeOrder}>
              Place an order
            </Button>}
          </Toolbar>
        </AppBar>
        {(itemList.items.length==0) && <h5 className='text-center p-4'>No food items to display</h5>}
        <List>
        {itemList.items.map((item) => (
          <>
          <ListItem button>
            <ListItemText onClick={selectItem} primary={item.title} secondary={item.price} />{
            (!ordered) && <img style={{cursor:'pointer'}} onClick={deleteItem} src='./img/trash.png' />}
            {(ordered) && <>status: {(status==="Ordered") && <Button className='bg-warning col-2 text-white' style={{marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >Ordered</Button>}
            {(status==="Approved") && <Button className='bg-info col-2 text-white' style={{marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >Approved</Button>}
            {(status==="Processing") && <Button className='bg-primary col-2 text-white' style={{marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >Processing</Button>}
            {(status==="On Delivery") && <Button className='bg-info col-2 text-white' style={{marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >On Delivery</Button>}
            {(status==="Delivered") && <Button className='bg-success col-2 text-white' style={{marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >Delivered</Button>}</>}
          </ListItem>
          <Divider />
          </>
        ))} 
        </List>
        <h4 className='bg-info text-center'>{response}</h4>
        
      </Dialog>
    </React.Fragment>
  );
}