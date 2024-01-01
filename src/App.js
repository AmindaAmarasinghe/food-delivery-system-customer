import logo from './logo.svg';
import './App.css';
import NavBar from './Header/NavBar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import RegisterForm from './signup/RegisterForm';
import LoginForm from './login/LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import ForgotPassword from './login/ForgotPassword';
import PasswordReset from './login/PasswordReset';
import CustomerDash from './Home/CustomerDash';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <NavBar />
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="home" element={<CustomerDash />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="forgot_pwd" element={<ForgotPassword />} />
            <Route path="reset_pwd" element={<PasswordReset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
