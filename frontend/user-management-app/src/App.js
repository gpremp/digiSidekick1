import React from 'react';
import './App.css';
import Bgimg from './static/image/backgroundImg.jpg'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './component/home';
import SignUp from './component/signup';
import UserDashboard from './component/user-dashboard';
import AddPerson from './component/add-person';
import UpdatePerson from './component/update-person';


function App() {
  return (
    <div style={{ backgroundImage: `url(${Bgimg})`,top: 0, left: 0, width: '100%', height: '100%' }}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='signup' element={<SignUp/>}/>
    <Route path='dashboard' element={<UserDashboard/>}/>
    <Route path='dashboard/person' element={<AddPerson/>}/>
    <Route path='dashboard/person/update' element={<UpdatePerson/>}/>
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
