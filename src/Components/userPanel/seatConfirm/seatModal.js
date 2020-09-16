import React from "react"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import UserNav from "../userNav/userNav"
import Button from "react-bootstrap/Button"
import "./seat.css"
import swal from 'sweetalert'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

function SeatModal(props){

   
        var date = ''
        var day = ''
        var month =''
        var year = ''
        date = props.detail.location.state.detail[3]
        day = new Date(date).getDate()
        if(day<10){

            day=('0'+day).toString()

        }
        month = (new Date(date).getMonth()+1)
        if(month<10){

            month =('0'+month).toString()

        }
        year = new Date(date).getFullYear().toString()
        date = year+'-'+month+'-'+day  

        const seats = props.detail.location.state.seats.map(item=>{

            return(

                <span>{item} </span>

            )

        })

        const done = ()=>{

            const email = localStorage.getItem('userToken')
            axios.post('http://localhost:5000/booked',{

                person:email,
                travels:props.detail.location.state.detail[0],
                coach:props.detail.location.state.typeOf,
                from:props.detail.location.state.detail[1],
                to:props.detail.location.state.detail[2],
                journey:date,
                seat:props.detail.location.state.seats
            })
            .then(res=>{

               if(res){

                swal("Congratulations!", "Booking Successful", "success")
                .then(()=>{

                    props.history.push('/profile')

                })

               }


            })
            .catch(err=>{

                if(err.response.status === 400){

                    localStorage.removeItem('userToken')
                    alert('Session expired')
                    props.history.push('/')

                }else if(err.response.status===500){

                    swal("Server error", "Your booking is not complete!Please try again", "error")
                    .then(()=>{

                        props.history.push('/profile')

                    })

                }


            })

        }

        return(

            <div>           
            <UserNav />
                <div className="seat-confirm">
                
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Confirm Booking</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Travels: {props.detail.location.state.detail[0]}({props.detail.location.state.typeOf})</ListGroupItem>
                            <ListGroupItem>From: {props.detail.location.state.detail[1]}</ListGroupItem>
                            <ListGroupItem>To: {props.detail.location.state.detail[2]}</ListGroupItem>
                            <ListGroupItem>Date: {date}</ListGroupItem>
                            <ListGroupItem>Seats: {seats}</ListGroupItem>
                            <ListGroupItem>Total: {props.detail.location.state.cost}</ListGroupItem>
                        </ListGroup>
                        <Button variant="success" type="submit" onClick={done}>Confirm Booking</Button>
                    </Card>
            </div>
     

            </div>
        )
        
    }

export default withRouter(SeatModal)