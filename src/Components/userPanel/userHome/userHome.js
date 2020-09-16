import React from "react"
import UserNav from "../userNav/userNav"
import "./userhome.css"
import {useState,useEffect} from "react"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Jumbotron from 'react-bootstrap/Jumbotron'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {withRouter} from "react-router-dom"

function UserHome(props){

    const email = props.mail
    const name = email.substring(0,email.lastIndexOf("@")) 
    const[optionsFrom,changeOptionsFrom] = useState('')
    const[optionsTo,changeOptionsTo] = useState('')
    const[optFrom,changeOptFrom] = useState('From')
    const[date,changeDate] = useState(new Date())
    const[day,changeDay] = useState(new Date().getDay())
    const[optTo,changeOptTo] = useState('To')
    
    useEffect(()=>{

        axios.get("http://localhost:5000/locations")
        .then(res =>{

            changeOptionsFrom(res.data.from)
            changeOptionsTo(res.data.to)
        })

    },[])

    const changeFrom = (e)=>{

            changeOptFrom(e.value)        

    }

    const changeTo = (e)=>{

        changeOptTo(e.value)

    }

    const change = (dates)=>{
        
        changeDate(dates)
        changeDay(dates.getDay())
    }

    const submit = (e) =>{

        e.preventDefault()
        console.log(date)
        if(optFrom=='From' || optTo=='To'){

            alert('Please select the locations')

        }
        else{

            axios.post("http://localhost:5000/Search",{

                    reqFrom:optFrom,
                    reqTo:optTo,                
                    journey:date,
                    day:day
            })
            .then(res =>{

                
                if(res.data.success){

                    props.history.push({

                        pathname:"/userCheck",
                        state:{goTo:res.data.success,detail:res.data.details,journeyDate:date,journeyDay:day}

                    })

                        

                    } else{

                    alert("No Buses available in the selected route")

                }

            })
            .catch(err =>{

                if(err.response.status === 400){

                    alert('Choose correct date')

                }

            })

        }
    }

    return(

        <div className="user-home">
            <UserNav/>
            <div className="travelling">
                <Jumbotron>
                    <h3>Welcome back {name}</h3>
                    <form onSubmit={submit}>
                        <Dropdown required options={optionsFrom} onChange={changeFrom} value={optFrom} placeholder="Select an option" />
                        <p></p>
                        <Dropdown required options={optionsTo} onChange={changeTo} value={optTo} placeholder="Select an option" />
                        <p></p>
                        <DatePicker required selected={date} onChange={change}/>
                        <p>
                            <Button variant="primary" type="submit">Search</Button>
                        </p>
                    </form>
                </Jumbotron>
            </div>         



        </div>




    )



}

export default withRouter(UserHome)