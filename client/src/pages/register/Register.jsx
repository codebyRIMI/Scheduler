import './Register.scss';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().min(3).max(15).required('Username is required'),
    password: Yup.string().min(4).max(20).required('Password is required'),
  });

  const onSubmit = (data) => {
    console.log("Data being sent to server:", data);
    axios
      .post("http://localhost:3001/register", data)
      .then((response) => {
        console.log("User registered successfully", response);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error registering the user:", error);
      });
  };

  return (
    <div className="register">
      <div className="register_container">
        <h1>Register</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form className="register_form" onSubmit={handleSubmit}>
              <div className="form_item">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={values.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form_item">
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form_item">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  value={values.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <button type="submit">Register</button>
            </form>
          )}
        </Formik>
        
        <hr />
        <div className="links">
          <a href="http://google.com" target="_blank" rel="noopener noreferrer">
            <GoogleIcon fontSize="large" />
          </a>
          <span>or</span>
          <a href="http://email.com" target="_blank" rel="noopener noreferrer">
            <EmailIcon fontSize="large" />
          </a>
        </div>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
