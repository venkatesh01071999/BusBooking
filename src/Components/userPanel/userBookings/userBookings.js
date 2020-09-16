import React from "react"
import axios from "axios"
import{useState,useEffect} from "react"
import Bookings from './Bookings'
import NoBooking from "./noBooking"

function UserBooking(){

        const[bookings,changeBookings] = useState([])
        useEffect(()=>{

            axios.post('http://localhost:5000/myBooking',{

                user:localStorage.getItem('userToken')
            })
            .then(res=>{
            
              

                changeBookings(res.data)

            

            })


        },[])


       

        return(

            <div>

                {bookings.length>0?bookings.length===1?<NoBooking email={bookings[0]}/>:<Bookings details={bookings} />:<></>}



            </div>


        )

}

export default UserBooking