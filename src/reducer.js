import {store} from './index.js';
const Login = 'Login';
export const login = () => {
  return {
    type: Login,
    payload: ''
  };
};
const initCartState = { 
  items:[],
  ordered_items:[]
};
export default function cartReducer(state = initCartState, action) {
  // The reducer normally looks at the action type field to decide what happens
  
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'ADD_ITEM': {
      console.log(state.items)
      return {
        ...state, items: [...state.items, action.payload]//payload is a food item
      }
    }
    case 'ORDER': {
      state.items.forEach(item=>{
        item['order_id']=action.payload.order_id
      })
      return {
        ...state, ordered_items: [...state.ordered_items,...state.items], items:[]
      }
    }
    case 'CLEAR': {
      return {
        ...state, ordered_items: []
      }
    }
    case 'UPDATE_ORDER': {
      console.log(action.payload.order_id)
      if(action.payload.order_id==='undefined'){
        return;
      }
      return {
          ...state,
          ordered_items: state.ordered_items.map(item => item.order_id === action.payload.order_id ? {
              ...item,
              'order_status': action.payload.order_status
            } : item)
      }
      // const indexU = state.ordered_items.map((item)=>item.order_id==action.payload.order_id)
      // console.log(indexU)
      // return { 
      //   ...state, 
      //   ordered_items: [
      //     ...state.ordered_items.slice(0,indexU),
      //     {'food_id':state.ordered_items[indexU].food_id,'order_id':state.ordered_items[indexU].order_id, 'title':state.ordered_items[indexU].title, 'price':state.ordered_items[indexU].price, 'order_status': action.payload.order_status, 'payment_status':'','quantity':1 },
      //    ...state.ordered_items.slice(indexU+1)
      //   ]
      // }
    }

    case 'UPDATE_ITEM': {
      console.log(action)
      const indexU = state.ordered_items.findIndex(item=>item.food_id===action.payload.food_id)
      return { 
        ...state, 
        ordered_items: [
          ...state.ordered_items.slice(0,indexU),
          {'food_id':action.payload.food_id,'title':action.payload.title, 'price':action.payload.price, 'order_status': action.payload.order_status, 'payment_status':'','quantity':1 },
         ...state.ordered_items.slice(indexU+1)
        ]
      }
    }
    case 'REMOVE_ITEM': {
      const indexU = state.items.findIndex(item=>item.food_id===action.payload.food_id)
      return { 
        ...state, 
        items: [
          ...state.items.slice(0,indexU),
          ...state.items.slice(indexU+1)
        ]
      }
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}
export function appReducer(state = store.getState(), action) {
    // The reducer normally looks at the action type field to decide what happens
    
    switch (action.type) {
      // Do something here based on the different types of actions
      case 'Login': {
        console.log(state.auth.isLoggedIn)
        return {
          ...state,
          auth: { isLoggedIn: true}
            
        }
      }
      case 'Logout': {
        
        return {
          ...state,
          auth: { isLoggedIn: false}
            
        }
      }
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }