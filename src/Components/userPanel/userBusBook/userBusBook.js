import React from "react"
import Seatmap from 'react-seatmap';
import {useState,useEffect} from "react"
import UserNav from "../userNav/userNav"
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import "./userbook.css"

function UserBusBook(props){

        if(!props.location.state){

            props.history.goBack()

        }
         
        const seats = ['A0','A1','A2','A3','A4','B0','B1','B2','B3','B4','C0','C1','C2','C3','C4',
        'D0','D1','D2','D3','D4','E0','E1','E2','E3','E4','F0','F1','F2','F3','F4','G0','G1','G2','G3','G4']

        const reserved = props.location.state.booked
        const [booking,changeBooking] = useState([])
        const [fare,changeFare] = useState(0)
        let type = props.location.state.details[5]
        let cost = props.location.state.details[4]
        cost = parseInt(cost.substr(cost.indexOf(':')+1,cost.length))
        var count = 0
        const selection = (e)=>{

            if(e.target.className === 'seatings'){

                e.target.className = 'reserved'
                e.target.style.backgroundColor = 'green'
                changeBooking(booking.concat(e.target.name))
                changeFare(prevState => prevState+cost)
            }else if(e.target.className === 'reserved'){

                e.target.className = 'seatings'
                e.target.style.backgroundColor = 'white'
                changeBooking(booking.filter(res => res!=e.target.name))
                changeFare(prevState => prevState-cost)
            }                      

        }
       
        const map = seats.map(items=>{
            
           count+=1
           if(count == 2){
            if(reserved.includes(items)){

                return(

                    <input 
                type="button"
                name={items}
                className="seatings"
                style={{marginRight:"20px",backgroundColor:"indianred",cursor:"default"}}

                />
                    
                )
            } else{ 

                return(
                    <input 
                type="button"
                name={items}
                className="seatings"
                style={{marginRight:"20px"}}

                onClick={selection}
                />
                    
                )
            }

           }else if(count==5){
                count=0
                if(reserved.includes(items)){

                        return(

                        <span>
                            <input 
                                type="button"
                                name={items}
                                className="seatings"
                                style={{backgroundColor:"indianred",cursor:"default"}}
                                />
                            <br></br>    
                        </span>
                    )
            }else{
                    return(
                
                        <span>
                        <input 
                            type="button"
                            name={items}
                            className="seatings"
                            onClick={selection}
                            />
                        <br></br>    
                        </span>
                )
            }    
        }else{

            if(reserved.includes(items)){

                return(
            
                
                    <input 
                     type="button"
                     name={items}
                     className="seatings"
                     style={{backgroundColor:"indianred",cursor:"default"}}
                     />
                 
                )

            }else{
                return(
                
                    
                    <input 
                        type="button"
                        name={items}
                        className="seatings"
                        onClick={selection}
                        />
                    
                )   
            }
        }
        
    })

    const selected = booking.map(item=>{

                return <span>{item} </span>

            })

    const payment = ()=>{

            const details = props.location.state.details
            if(booking.length>0){
                
                
                props.history.push({

                    pathname:'/seatConfirm',
                    state:{seats:booking,detail:details,cost:fare,typeOf:type}

                })
            }else{

                alert("Please select seats")

            }
    }        

        
    
        return(
            <div>
                <UserNav/>
                <div className="booking-page">
                    <aside className="booking-card">

                    <Jumbotron>
                        <h1>Seat Bookings</h1>
                        <h3>Selected Seats:</h3>
                        <div style={{height:"15px"}}>

                               {selected}

                        </div>
                        <div style={{height:"25px"}}>

                           Fare: {fare}

                        </div>
                                                    
                        <p>
                            <Button variant="success" style={{marginBottom:"10px"}} onClick={payment}>Proceed to pay</Button>
                        </p>
                    </Jumbotron>

                    </aside>
                    <div className="bus-seats">
                        
                        <div className="seats">

                            <h3>{props.location.state.details[0]}</h3>
                            {map}
                            
                        </div>


                        </div>
                </div>
            </div>

        )
}

export default UserBusBook
