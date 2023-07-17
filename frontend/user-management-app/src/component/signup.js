import { useState } from "react";
import axios from "axios";
import '../static/css/signup.css';
import Header from "./Header";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    let isSubmit = true;

    // Define an event handler for the input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      isSubmit = true;
      console.log(userData);
      setFormErrors(validate(userData));
      if(isSubmit){
        axios.post("http://localhost:8080/api/user", userData).then(
        (response) => {
          console.log(response.data.message)
          const errors = {};
          if(response.data.message==="User created successfully"){
            Swal.fire("Success!", "User Added successfully!", "success");
            navigate("/")
          }
          else if(response.data.message==="User with given email already Exist!"){
            errors.password = "User with given email already Exist!";
            setFormErrors(errors);
          }
          else{
            errors.password = response.data.message;
            setFormErrors(errors);
          }
         
        }
      )
      }
    };
    function isSentenceValid(sentence) {
        const words = sentence.split(' ');
      
        return words.some((word) => /\d/.test(word));
      }
    const validate = (values) => {
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const errors = {};
        if (!values.name) {
          isSubmit = false;
          errors.name = "Name is required!";
        }
        if(isSentenceValid(values.name)){
          isSubmit = false;
            errors.name = "*Number not allowed";
        }
        if (!values.email.match(emailformat)) {
          isSubmit = false;
          errors.email = "Email is not valid!";
        }
        if (!values.password) {
          isSubmit = false;
          errors.password = "Password is required";
        }
        return errors;
      };
    return(
        <div>
            <Header/>
            <div className="signup-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <h6>{formErrors.name}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <h6>{formErrors.email}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <h6>{formErrors.password}</h6>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
        </div>
    )
}

export default SignUp;