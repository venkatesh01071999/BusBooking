import React from "react"
import Table from 'react-bootstrap/Table'
import "./booking.css"
import UserNav from "../userNav/userNav"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import swal from 'sweetalert'
import axios from "axios"
import Rating from "react-rating"
import Alert from 'react-bootstrap/Alert'
import {useState} from "react"

function Bookings(props){

       
        const todayDate = new Date()
        const det = props.details.length
        const[rate,changeRate] = useState(0)

        const rated = (elem)=>{

            if(rate===0){

                alert("Please select suitable rating")

            }else{

                const travels = elem.target.parentNode.parentNode.parentNode.cells[0].innerHTML
                const from = elem.target.parentNode.parentNode.parentNode.cells[1].innerHTML
                const to = elem.target.parentNode.parentNode.parentNode.cells[2].innerHTML
                const date = elem.target.parentNode.parentNode.parentNode.cells[3].innerHTML
                const coach = elem.target.parentNode.parentNode.parentNode.cells[4].innerHTML
                const user = props.details[det-1]
                const rating = rate
                axios.post("http://localhost:5000/Rating",{

                    travels:travels,
                    from:from,
                    to:to,
                    date:date,
                    coach:coach,
                    user:user,
                    rating:rate
                })
                .then((res)=>{

                    if(res.status){

                       swal("Rated", "Successfully", "success")
                            .then(() => {
                                
                                 window.location.reload()

                              }); 


                    }


                })

            }
        
        }

        const cancellation = (elem)=>{
            var userName = props.details[det-1]
            var busName = elem.target.parentNode.parentNode.cells[0].innerHTML
            var from = elem.target.parentNode.parentNode.cells[1].innerHTML
            var to = elem.target.parentNode.parentNode.cells[2].innerHTML
            var date = elem.target.parentNode.parentNode.cells[3].innerHTML
            var type = elem.target.parentNode.parentNode.cells[4].innerHTML
            var seats =  elem.target.parentNode.parentNode.cells[5].innerHTML.toString()
            seats = seats.replace(/<span>/g,'')
            seats = seats.replace(/<\/span>/g,'')
            seats = seats.split(',') 
            swal({
                title: "Are you sure to cancel the tickets?",
                text: "Once cancelled, you won't be able to revert back!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {

                    axios.post('http://localhost:5000/cancelling',{

                        name:userName,
                        bus:busName,
                        from:from,
                        to:to,
                        date:date,
                        type:type,
                        seats:seats
                    })
                    .then(res=>{

                        if(res.status){

                            swal("Cancellation", "Successfull!", "success")
                            .then(() => {
                                
                                 window.location.reload()

                              });

                        }

                    })
                    
                  
                } 
              });

           
            

        }

        const rating = (value)=>{

            changeRate(value)


        }
        

        const rows = props.details.map((item,i)=>{

            const date = new Date(item[3])
            if(det!=i+1){
            return(

                <tr>
                    <td>{i+1}) {item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[5]}</td>
                    <td>{item[4].map((cet,i)=>{

                        if(i+1 == item[4].length){

                            return <span>{cet}</span>
                        }else{

                            return <span>{cet},</span>
                        }


                    })}</td>
                    <td>{(date.getFullYear()<todayDate.getFullYear())?<Button className="completed" variant="success">Trip completed</Button>:(date.getMonth()+1<todayDate.getMonth()+1)&&(date.getFullYear()===todayDate.getFullYear())?<Button className="completed" variant="success">Trip completed</Button>:(date.getDate()<todayDate.getDate())&&(date.getMonth()+1===todayDate.getMonth()+1)&&(date.getFullYear()===todayDate.getFullYear())?<Button className="completed" variant="success">Trip completed</Button>:(date.getDate()===todayDate.getDate())&&(date.getMonth()+1===todayDate.getMonth()+1)&&(date.getFullYear()===todayDate.getFullYear())?<Button className="completed" variant="primary">Trip Day</Button>:<Button className="over" variant="danger" onClick={cancellation}>Cancel</Button>}</td>
                    <td>{(date.getDate()>=todayDate.getDate())&&(date.getMonth()>=todayDate.getMonth())&&(date.getFullYear()>=todayDate.getFullYear())?<Alert className="alerting" variant="info">Rate us after your trip</Alert>:(item[6]===0)?<div><Rating  onChange={rating}/><br></br><Button variant="warning" onClick={rated}>Rate us</Button></div>:<div><Rating placeholderRating={item[6]} readonly/></div>}</td>
                </tr>
            )
        
            }

        })
        return(


            <div>

                <UserNav/>
                <div className="booking-header"><Jumbotron><h2>Hi!!{props.details[det-1]}...Here is your list of Bookings</h2></Jumbotron></div>
                <div className="booking">    
                    
                   
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>BusName</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Date</th>
                                <th>Coach</th>
                                <th>Seats</th>
                                <th>Cancel Policy</th>
                                <th>Rating</th>
                            </tr>
                        </thead>        
                        <tbody>

                            {rows}

                        </tbody>
                        
                    
                    </Table>    
                </div>
            </div>
        
        )

}

export default Bookings