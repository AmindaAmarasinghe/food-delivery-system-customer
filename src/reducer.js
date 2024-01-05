import {store} from './index.js';
const Login = 'Login';
export const login = () => {
  return {
    type: Login,
    payload: ''
  };
};
const initCartState = { 
  items:[]
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
    case 'REMOVE_ITEM': {
      console.log(state.items)
      // return {
      //   ...state.items.slice(0, action.index),
      //   ...state.items.slice(action.index + 1)
      // }
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