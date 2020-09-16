import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from "react-bootstrap/Button"
import {withRouter} from "react-router-dom"
import bus from "./route.png"
import "./usernav.css"
function UserNav(props){



        const logOut = ()=>{

            localStorage.removeItem('userToken')
            props.history.push('/')

        }

        return(

            <div className="user-nav">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="http://localhost:3000/profile"><img src={bus} style={{width:"90px",height:"50px"}}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="http://localhost:3000/profile" className="links">Home</Nav.Link>
                            <Nav.Link href="http://localhost:3000/userHistory"className="links">Bookings</Nav.Link>
                        </Nav>
                        <Button onClick={logOut} variant="outline-success">Logout</Button>
                    </Navbar.Collapse>
                </Navbar>

            </div>

        )




}
export default withRouter(UserNav)