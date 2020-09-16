import React from "react"
import Jumbotron from 'react-bootstrap/Jumbotron'
import "./booking.css"
import UserNav from "../userNav/userNav"
function NoBooking(props){

    return(  

        <div>
            <UserNav/>
            <div className="no-booking">
                <Jumbotron>
                    <h1>Hey {props.email}</h1>
                    <h5>
                        There is no Booking at the present
                    </h5>
                </Jumbotron>
            </div>
      </div>
    )

  }
 
  export default NoBooking
