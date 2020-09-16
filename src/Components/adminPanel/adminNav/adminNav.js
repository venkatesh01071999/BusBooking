import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from "react-bootstrap/Button"
import {withRouter} from "react-router-dom"
import NavLink from "react-bootstrap/esm/NavLink"

function AdminNav(props){


        const logOut = ()=>{

            localStorage.removeItem('userToken')
            props.history.push('/')

        }

        return(

            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/profile">Admin Panel</Navbar.Brand>
                    <NavLink href="/adminSearch">Booking Informations</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            
                        </Nav>
                        <Button onClick={logOut} variant="outline-success">Logout</Button>
                    </Navbar.Collapse>
                </Navbar>

            </div>

        )




}

export default withRouter(AdminNav)
