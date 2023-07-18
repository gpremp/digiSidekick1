import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { isLoggedIn,isLogOut } from '../auth/login-auth';
function Header(){
    const navigate = useNavigate();
    let isLogin = isLoggedIn();
    const logout=()=>{
      isLogOut();
      navigate('/')
    }
    const Login = () =>{
      if(isLogin){
        return(
          <>
          <Button onClick={()=>navigate('/')} class="btn btn-success active">SignIn</Button>
          <Button onClick={()=>navigate('/signup')} class="btn btn-success active">SignUp</Button>
          </>
        )
     }else{
      return(
        <>
        <Button onClick={()=>navigate('/dashboard')} class="btn btn-success active">Dashboard</Button>
        <Button onClick={logout} class="btn btn-success active">logout</Button>
        </>
      )
      
     }
    }
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              User Management App
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Login/>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default Header;