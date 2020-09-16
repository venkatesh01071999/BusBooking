import React from "react"
import AdminNav from "../adminNav/adminNav"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {useState,useEffect} from "react"
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button"
import {withRouter} from "react-router-dom"
import axios from 'axios'
import Table from "react-bootstrap/Table"
import "./adminsearch.css"

function AdminSearch(props){

    const[optionsBus,changeOptionsBus] = useState('')
    const[busName,changeBusName] = useState('Travels')
    const[optionsFrom,changeOptionsFrom] = useState('')
    const[optionsTo,changeOptionsTo] = useState('')
    const[type,changeType]=useState(['AC','NON AC'])
    const[types,changeTypes] = useState('Type')
    const[optFrom,changeOptFrom] = useState('From')
    const[optTo,changeOptTo] = useState('To')
    const[booking,changeBooking]=useState([])
    const[date,changeDate] = useState(new Date())

    useEffect(()=>{

        axios.get('http://localhost:5000/admin/adminSearch')
        .then(res =>{

            changeBooking(res.data.bookings)
            changeOptionsBus(res.data.travels)
            changeOptionsFrom(res.data.from)
            changeOptionsTo(res.data.to)
        })

    },[])

    

    const changeBus =(e)=>{

       changeBusName(e.value)

    }
    const changeFrom = (e)=>{

        changeOptFrom(e.value)        

    }

    const changeTo = (e)=>{

        changeOptTo(e.value)

    }

    const change = (dates)=>{

        changeDate(dates)

    }

    const changeTyp = (e)=>{

        changeTypes(e.value)

    }

    if(booking.length>0){
        var rows = booking.map((item,no)=>{

            let seats = JSON.parse(item.Seats)
            return(
            <tr>
                <td>{no+1}</td>
                <td>{item.BusName}</td>
                <td>{item.From}</td>
                <td>{item.To}</td>
                <td>{item.Date}</td>
                <td>{item.bookedBy}</td>
                <td>{seats.map((cet,i)=>{
    
                    if(i+1 == seats.length){
    
                        return <span>{cet}</span>
                    }else{
    
                        return <span>{cet},</span>
                    } 
        
    
                })}</td>
            </tr>
            )
     })

    }
    return(

        <div>
            <AdminNav/>
            <div className="admin-travelling">
                <Jumbotron className="admin-search">
                    <h1>Search Details</h1>
                    <form>
                        <Dropdown required options={optionsBus} onChange={changeBus}  value={busName} placeholder="Select an option" />
                        <p></p>
                        <Dropdown required options={optionsFrom} onChange={changeFrom} value={optFrom} placeholder="Select an option" />
                        <p></p>
                        <Dropdown required options={optionsTo} onChange={changeTo} value={optTo} placeholder="Select an option" />
                        <p></p>
                        <Dropdown required options={type} onChange={changeTyp} value={types} placeholder="Select an option" />
                        <p></p>
                        <DatePicker required selected={date} onChange={change}/>
                        <p>
                            <Button variant="primary" type="submit">Bookings</Button>
                        </p>
                    </form>
                </Jumbotron>
                    {
                    booking.length>0?
                    <div>    
                        
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Travels</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Date</th>
                                    <th>Booked By</th>
                                    <th>Seats</th>
                                </tr>
                            </thead>        
                            <tbody>

                                {rows}

                            </tbody>
                            
                        
                        </Table>    
                    </div>
                    :<></>
                }
            </div>


        </div>


    )

}

export default withRouter(AdminSearch)