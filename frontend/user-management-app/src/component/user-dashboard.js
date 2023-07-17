import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { currentUserDetail, isLoggedIn } from "../auth/login-auth";
import { Navigate, useNavigate,Link} from "react-router-dom";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';
import '../static/css/user-dashboard.css';

function UserDashboard (){
    const navigate = useNavigate();
    const isLogged = isLoggedIn();
    console.log(isLogged);
    let token;
    token = currentUserDetail();
    const [persons, setPersons] = useState([]);
    useEffect(() => {
        token = currentUserDetail();
        axios.get("http://localhost:8080/api/person",{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        }).then(
            (res) => {
                console.log(res.data);
                setPersons(res.data)
            }
        )
    }, []);
    if(isLogged){
        return <Navigate to={"/"}/>
    }else{
        token = currentUserDetail();
    }
    console.log(token);
    const newPerson = () => {
        navigate('/dashboard/person')
      }
      const deletePerson = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            axios.delete(`http://localhost:8080/api/person/${id}`,{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            setPersons(persons.filter(obj => {
                return obj._id!==id
            }))
            }
          })
    }

    return(
        <div>
            <Header/>
            <Navbar variant="dark">
        <Container>
          <Navbar.Brand>
            <h4>Person Details</h4>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={newPerson} class="btn btn-success active">Add Person</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11">
                        <div class="card-header">
                            <h3>All Persons</h3>
                        </div>
                        <div class="outer-wrapper">
                        <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <p>Name</p>
                                    </th>
                                    <th>
                                        <p>Age</p>
                                    </th>
                                    <th>
                                        <p>Phone</p>
                                    </th>
                                    <th>
                                        <p>Email</p>
                                    </th>
                                    <th className='action'>
                                        <p>Edit</p>
                                    </th>
                                    <th className='action'>
                                        <p>Delete</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    persons.map(
                                        person =>
                                            <tr key={person.id}>
                                                <td><p>{person.name}</p></td>
                                                <td><p>{person.age}</p></td>
                                                <td><p>{person.phoneNo}</p></td>
                                                <td><p>{person.email}</p></td>
                                                <td className='action'>
                                                    <Link to={'/dashboard/person/update'} state={{ person: person }} class="btn btn-success active"
                                                        role="button" aria-pressed="true">Edit</Link>
                                                </td>
                                                <td className='action'>
                                                <button onClick={(e)=>deletePerson(person._id)} class="btn btn-danger"
                                                         role="button" aria-pressed="true">Delete</button>
                                                </td>
                                            </tr>

                                    )
                                }
                            </tbody>
                        </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard;