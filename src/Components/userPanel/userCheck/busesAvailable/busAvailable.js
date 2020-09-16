import React from "react"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import "./bus.css"
import StarRatings from 'react-star-ratings'
import axios from 'axios'
import {withRouter} from "react-router-dom"
import Jumbotron from "react-bootstrap/Jumbotron"

function busAvailable(props){

        const fetch = (e)=>{
            const bus = e.target.parentElement.childNodes[0].childNodes[0].innerText
            
            const fare = e.target.parentElement.childNodes[0].childNodes[4].innerText
            let type = e.target.parentElement.childNodes[0].childNodes[6].innerText
            axios.post("http://localhost:5000/busBook",{

                busName: e.target.parentElement.childNodes[1].innerText,
                From:props.details[0].from,
                to:props.details[0].to,
                type:type,
                date:props.date,
                day:props.day
            })
           .then(res=>{

                let seats = []
                res.data.booked.forEach(item=>{

                    item.forEach(seating =>{

                        seats.push(seating)

                    })

                })
            
            props.history.push({

                pathname:"/bookSeats",
                state:{booked:seats,details:[bus,props.details[0].from,props.details[0].to,props.date,fare,type]}

            })
            

           })


        }
        return(
        
        
            <Jumbotron className="card-bus">
                <div className="details">
                    <div className="title"><h4 style={{float:'left'}}>{props.details[0].name}</h4></div>
                    <span className="departure">{props.details[0].arrival}</span>
                    <div className="div-departure"><span className="departure">{props.details[0].boarding}</span></div>
                    <span className="departure"><StarRatings
                        rating={props.details[0].ratings}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name='rating'
                    /></span>
                    <span className="departure">{props.details[0].cost}</span>
                    <span className="departure">{35-props.details[1]}</span>
                    <span className="departure">{props.details[0].typeof}</span>
                    <br></br>
                </div>
                <Button type="submit" variant="primary" className="bus-fetch" onClick={fetch}>Book</Button>
            </Jumbotron>
            
        )

}

export default withRouter(busAvailable)
