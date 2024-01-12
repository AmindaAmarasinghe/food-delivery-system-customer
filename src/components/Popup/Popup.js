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
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FeedbackForm from './FeedbackForm.js'

import {store} from '../../index';
import { useDispatch, useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart({closeFunction, classT, restaurantCart, restaurantCartId}) {
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const itemList = useSelector((data) => data);
  const [response, setResponse] = React.useState("");
  const [ordered, setOrdered] = React.useState(false);
  const dispatch = useDispatch();
  const [messages, setMessages] = React.useState([]);

  
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(itemList.ordered_items)
  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        let response = await fetch('http://localhost:8080/api/v1/getStatus');
        if (response.ok) {
          let data = await response.json();
          //dispatch({type:'UPDATE_ORDER', payload:{'order_id':1,'order_status':'DELIVERED'}})
          //setMessages(data);
          
          console.log(data)
          if(data.length>0){
            await data.map(entry=>{
              var orderIdnumb = entry.orderId.match(/\d/g);
              orderIdnumb = orderIdnumb.join("")
               console.log({type:'UPDATE_ORDER', payload:{'order_id':parseInt(orderIdnumb),'order_status':entry.status}})
               dispatch({type:'UPDATE_ORDER', payload:{'order_id':parseInt(orderIdnumb),'order_status':entry.status}})
            });
          }
          // await data.map(entry=>{
          //   if(entry!==null)
          //   {
              
          //     dispatch({type:'UPDATE_ITEM', payload:{'food_id':entry.food_id,'title':entry.title, 'price':entry.price, 'restaurant_id' : entry.restaurant_id, 'order_status':entry.order_status}})
          //   }
          // })
          
        } else {
          console.error('Failed to fetch status');
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      }
      console.log(itemList)
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);  // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const changeStatus=(food_id, status)=>{
    console.log(food_id, status)
    itemList.items.forEach(item => {if(item['food_id']===food_id){
      dispatch({type:'UPDATE_ITEM', payload:{'food_id':item.food_id,'title':item.title, 'price':item.price, 'order_status':status}})

    }})
  }
  const placeOrderedItem = async (item, order_id) => {
    console.log("item ordering: ",item)
    let orderItemMessageBody=JSON.stringify({
      order_id: order_id,
      food_id: item.food_id,
      price: item.price,
      title: item.title,
      quantity: item.quantity,
      payment_status: item.payment_status,
      order_status: 'Ordered'
    });
    let res = await fetch("http://localhost:8080/api/v1/setOrderedItem", {
      method: "POST",
      body: orderItemMessageBody,
      mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    });
    console.log(res)
    if (res.status === 200) {
      
    }else{

    }
  }
  const placeOrder = async () => {
    let order_id=null;
    try{

      //order creation
      let orderMessageBody=JSON.stringify({
        customer_id: localStorage.getItem('customer_id').toString(),
        restaurant_id:restaurantCartId,
      });
      console.log(orderMessageBody)
      let resOrder = await fetch("http://localhost:8080/api/v1/setOrder", {
        method: "POST",
        body: orderMessageBody,
        mode:'cors',
          headers:{
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
          }
      });
      
      if (resOrder.status === 200) {
        let data = await resOrder.json();
        console.log(data);
        order_id = data;
        
        const {items} = itemList;
        console.log(itemList.items)
        items.forEach( (item) =>  {
          item.order_status = 'Ordered';
          placeOrderedItem(item, order_id);
        });
        
        setOrdered(true)
        setResponse(""); 

        await dispatch({type:'ORDER',payload:{'order_id':order_id}})
        console.log('After placing an order ',itemList);
        setOpen(false);
        setOpen(true);
        try{
          let messageBody=JSON.stringify({
              restaurant_id:"RST-"+'001',
              customer:
              {
                id:"CST-"+localStorage.getItem('customer_id').toString(),
                name:localStorage.getItem('username'),
                longitude:localStorage.getItem('longitude'),
                latitude:localStorage.getItem('latitude'),
                contact:"0725678945"
              },
              orders: {
                order_id: "ORD-"+order_id.toString(),
                items:JSON.stringify(itemList.items)
              },
              timestamp: Date.now()
                
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
            
            
            if (res.status === 200) {
              setOrdered(true)
              // itemList.items.forEach((item) => {
              setResponse(""); 
              //   dispatch({type:'UPDATE_ITEM', payload:{'food_id':item.food_id,'title':item.title, 'price':item.price, 'order_status':'Ordered'}})
            
              
      
            } else {
              setResponse("something went wrong!!!");
              alert("something went wrong!!! \nApplication is not responding");
              itemList.items.forEach((item) => item.order_status = 'Added to cart');
            }
            
          } catch (err) {
            console.log(err);
            setResponse("something went wrong!!!");
          }
      }else{

      }
    }catch(err){

    }
    
  };
  const selectItem = (title, price) => {
    setSelectedItem({"title":title, "price":price});
    
  };
  const deleteItem = (e) => {
    dispatch({type:'REMOVE_ITEM', payload:{'food_id':1}});
    console.log(e.target.dataset)
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
              
              {(itemList.items.length>0) && <Chip
                avatar={<Avatar alt="Natacha" src="img/location.png" />}
                label={restaurantCart}
                variant="outlined" style={{marginLeft:'100px', color:'#fff'}}
              />}
            </Typography>
            {(!ordered) && (itemList.items.length>0) && <Button autoFocus color="inherit" onClick={placeOrder}>
              Place an order
            </Button>}
          </Toolbar>
        </AppBar>
        {(itemList.items.length==0) && <h5 className='text-center p-4'>No food items to order</h5>}
        
        <List>
        {itemList.items.map((item) => (
          <>
          <ListItem button>
            <ListItemText primary={item.title} secondary={item.price}  />
            {<img style={{cursor:'pointer'}} onClick={deleteItem} data-id={item.id}  src='./img/trash.png' />}
            </ListItem>
          <Divider />
          </>
        ))} 
        </List>
        <h5 className='text-center p-4 bg-info'>Your past orders</h5>
        <List>
        {itemList.ordered_items.map((item) => (
          <>
          <ListItem button>
            <ListItemText primary={item.title} secondary={"Rs. "+item.price}  />
            {<>{(item.order_status==="Ordered" || item.order_status==="ORDERED") && <Button className='col-2 text-dark' style={{backgroundColor:'#e17ff5', marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >Ordered</Button>}
            {(item.order_status==="Approved"  || item.order_status==="ACCEPTED") && <Button className='col-2 text-dark' style={{backgroundColor:'#7fe5f5', marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >Approved</Button>}
            {(item.order_status==="Processing" || item.order_status==="PROCESSING") && <Button className='bg-primary col-2 text-white' style={{marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >Processing</Button>}
            {(item.order_status==="On Delivery" || item.order_status==="ON DELIVERY") && <Button className='col-2 text-dark' style={{backgroundColor:'#baf57f', marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >On Delivery</Button>}
            {(item.order_status==="Delivered" || item.order_status==="DELIVERED") && <Button className='bg-success col-2 text-white' style={{marginLeft:'10px', boxShadow: '0 1px 26px 0 rgba(0,0,0,0.2), 0 1px 28px 0 rgba(0,0,0,0.19)'}} >Delivered</Button>}</>}
          </ListItem>
          <Divider />
          </>
        ))} 
        </List>
        
        <h4 className='bg-warning text-center'>{response}</h4>
        <h4 className='bg-warning text-center'>{messages}</h4>

      </Dialog>
      
    </React.Fragment>
  );
}