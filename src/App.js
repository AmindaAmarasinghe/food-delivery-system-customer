import logo from './logo.svg';
import './App.css';
import NavBar from './Header/NavBar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import RegisterForm from './signup/RegisterForm';
import Login from './login/LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import ForgotPassword from './login/ForgotPassword';
import PasswordReset from './login/PasswordReset';
import { AppContextProvider } from './AppContext';
import CustomerDash from './Home/CustomerDash';
import Profile from './Home/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppContextProvider>
      <NavBar />
      
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="home" element={<CustomerDash />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="forgot_pwd" element={<ForgotPassword />} />
            <Route path="reset_pwd" element={<PasswordReset />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
      
      </AppContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
