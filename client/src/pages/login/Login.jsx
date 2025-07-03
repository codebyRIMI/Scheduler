import './Login.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { useState } from 'react';

const Login = () => {
  const { setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  // Define state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/register/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
          status: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="login">
      <div className="login_container">
        <h2>Welcome Back!</h2>
        <p className="subtitle">Login to continue</p>

        <div className="login_form">
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" onClick={login}>Login</button>
        </div>

        <div className="register_link">
          <span>Don't have an account? </span>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
