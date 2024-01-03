// AppContext.jsx
import React, {
    createContext,
    useContext, useRef,
    useState,
  } from 'react';
  import Proptypes from 'prop-types';
  
  const AppContext = createContext();
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
  
    if (!context) {
      throw Error(
        'useAppContext must be used in AppContextProvider',
      );
    }
  
    return context;
  };
  
  export const AppContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const isLoggedInRef = useRef(false);
    isLoggedInRef.current = isLoggedIn;

    const login = () => {
        setIsLoggedIn(true)
    };
    
    const logout = () => {
        setIsLoggedIn(false)
    };
    
    return (
      <AppContext.Provider value={{ isLoggedIn, 
        login, 
        logout  }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  AppContextProvider.propTypes = {
    children: Proptypes.node.isRequired,
  };
  