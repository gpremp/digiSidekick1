import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { currentUserDetail, isLoggedIn } from "../auth/login-auth";
import { Navigate, useNavigate,Link} from "react-router-dom";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";

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

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Age',
            selector: row => row.age,
        },
        {
            name: 'Phone',
            selector: row => row.phoneNo,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Action',
            selector: row => <><Link to={'/dashboard/person/update'} state={{ person: row }} class="btn btn-success active"
            role="button" aria-pressed="true">Edit</Link>
            <button onClick={(e)=>deletePerson(row._id)} class="btn btn-danger"
            role="button" aria-pressed="true">Delete</button></>
        },
        
    ];

    const tableStyle = {
        rows: {
            style: {
                backgroundColor: 'grey',
            },
        },
        headRow: {
            style: {
                fontSize: '27px',
                color: 'white',
                backgroundColor: '#878282',
			minHeight: '52px',
			borderBottomWidth: '1px',
			borderBottomColor: 'white',
			borderBottomStyle: 'solid',
            },
        },
        pagination: {
            style: {
                color: 'white',
                fontSize: '13px',
                minHeight: '56px',
                backgroundColor: '#878282',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'white',
            },
        }    
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

      <div className="container" style={{ overflow:'auto' }}>
                <div className="row justify-content-center">
                    <div className="col-11">
                        <div class="card-header">
                            <h3>All Persons</h3>
                        </div>
                        <DataTable
                         columns={columns}
                         data={persons}
                         customStyles={tableStyle}
                         pagination
                        />
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserDashboard;