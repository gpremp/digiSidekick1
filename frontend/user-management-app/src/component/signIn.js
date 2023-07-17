import { useState } from "react";
import axios from "axios";
import '../static/css/signIn.css';
import { doLogin } from "../auth/login-auth";
import { useNavigate } from "react-router-dom";


function SignIn(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    setFormErrors("")
    const userData = {
      email:email,
      password:password
    }
    axios.post("http://localhost:8080/api/auth", userData).then(
      (response) => {
        console.log(response);
        if(response.data.message==="Invalid Email or Password"){
          setFormErrors("invalid email and password");
        }
        else if(response.data.message==="logged in successfully"){
          console.log(response.data.data);
          doLogin(response.data.data);
          navigate("/dashboard")

        }
      }
    )
  };
return(
    <div>
    <div className="login-form-container">
      <h2>Login</h2>
      <h6>{formErrors}</h6>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
</div>
)
}

export default SignIn;