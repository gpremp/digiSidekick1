import Header from "./Header";
import { useState } from "react";
import '../static/css/add-person.css';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate,useLocation,Navigate } from "react-router-dom";
import { currentUserDetail, isLoggedIn } from "../auth/login-auth";

function UpdatePerson(){
    const navigate = useNavigate();
    const isLogged = isLoggedIn();
    let token;
  
  const [formErrors, setFormErrors] = useState({});
  const location = useLocation();
  const person = location.state.person;
  console.log(person)
  const [personDetails, setPersonDetails] = useState({...person});
  let isSubmit = true;

   // Define an event handler for the input change
   const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  if(isLogged){
    return <Navigate to={"/"}/>
   }else{
    token = currentUserDetail();
   }

  const handleSubmit = (event) => {
    event.preventDefault();
    isSubmit = true;
    setFormErrors(validate(personDetails));
    if(isSubmit){
      axios.put(`http://localhost:8080/api/person/${person._id}`, personDetails,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
      }).then(
      (response) => {
        console.log(response.data.message)
        const errors = {};
        if(response.data.message==="Person update successfully"){
          Swal.fire("Success!", "Person update successfully!", "success");
          navigate("/dashboard")
        }
        else{
          errors.email = response.data.message;
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
    if(isSentenceValid(values.name)){
      isSubmit = false;
        errors.name = "*Number not allowed";
    }
    if (!values.email.match(emailformat)) {
      isSubmit = false;
      errors.email = "Email is not valid!";
    }
    if (values.age<0) {
      isSubmit = false;
      errors.age = "age is in nagative";
    }
    if (values.phoneNo.length!==10) {
        console.log(values.phoneNo.length)
        isSubmit = false;
        errors.phoneNo = "Phone number shoule be 10 digit";
      }
    return errors;
  };
    return(
        <div>
            <Header/>
            <div className="form-container">
      <h2>Person Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={personDetails.name}
            onChange={handleChange}
            required
          />
          <h6>{formErrors.name}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={personDetails.age}
            onChange={handleChange}
            required
          />
          <h6>{formErrors.age}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
           type="number"
            name="phoneNo"
            placeholder="Enter your phone number"
            value={personDetails.phoneNo}
            onChange={handleChange}
            required
          />
          <h6>{formErrors.phoneNo}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={personDetails.email}
            onChange={handleChange}
            required
          />
          <h6>{formErrors.email}</h6>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
        </div>
    )
}
export default UpdatePerson;