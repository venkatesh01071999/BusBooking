import React from "react"
import UserNav from "../userNav/userNav"
import {withRouter} from "react-router-dom"
import {useEffect,useState} from "react"
import './usercheck.css'
import BusAvailable from "./busesAvailable/busAvailable"
import Jumbotron from "react-bootstrap/Jumbotron"

function UserCheck(props){

        console.log(props) 
        const[fare,changeFare] = useState(false)
        const[ac,changeAC]=useState(false)
        const[seatSort,changeSeatSort]=useState(false)
        const[rate,changeRate] = useState(false)
        const[buses,changeBuses]=useState([])
        const[none,changeNone] = useState(false)
        
        window.onpopstate = e =>{

            props.history.push('/profile')


        } 

        if(!props.location.state){

            props.history.goBack()

        }

        const sorting = (e)=>{

            if(e.target.name === 'fare'){

                changeFare(prevState => !prevState)

            }
            else if(e.target.name === 'ac'){

                changeAC(prevState => !prevState)

            }
            else if(e.target.name === 'seatSort'){

                changeSeatSort(prevState => !prevState)

            }
            else if(e.target.name === 'rate'){

                changeRate(prevState => !prevState)

            }


        }
        
        useEffect(()=>{
            

            var bus = props.location.state.detail.map(item =>{

                
                let time = item[0].arrival.substr(0,item[0].arrival.indexOf(':'))
                time = parseInt(time)
                const curr = new Date().getHours()
                if(time<10){
                    var dur = item[0].arrival.substr(4,item[0].arrival.length)
                }
                else{

                    var dur = item[0].arrival.substr(5,item[0].arrival.length)

                }
                if(dur === 'PM'){

                    time = 24-(12-time)
                    if(time === 24){

                        time=12

                    }    

                }
                if(dur === 'AM' && time === 12 ){

                    time = 0

                }

                if(curr+1<time || (new Date()< props.location.state.journeyDate) )

                {
                    
                    return <BusAvailable  details={item} date={props.location.state.journeyDate} day={props.location.state.journeyDay}/>
                
                }else{

                    return null


                }

            })
            


            bus = bus.filter(item=>{

                    if(item!=null){

                        return item

                    }

            })
            if(bus.length === 0){

                changeNone(true)

            }
            changeBuses(buses.concat(bus))

    },[])

    
    useEffect(()=>{  

       
        var sortedData = []
        
        if(fare === true && seatSort===false && ac===false){

                sortedData = buses.slice().sort((a,b)=>(a.props.details[0].cost>b.props.details[0].cost)?1:-1)
                changeBuses(sortedData)

        }

        else if(ac === true && fare===false && seatSort===false){

            sortedData = buses.slice().sort((a,b)=>(a.props.details[0].typeof<b.props.details[0].typeof)?1:-1)
            changeBuses(sortedData)

        }

        else if(seatSort === true && fare===false && ac==false ){

            sortedData =buses.slice().sort((a,b)=>((35-a.props.details[1])>(35-b.props.details[1]))?-1:1)
            changeBuses(sortedData)
        }

        else if(rate === true && seatSort === false && fare===false && ac==false ){

            sortedData =buses.slice().sort((a,b)=>(a.props.details[0].ratings<b.props.details[0].ratings)?1:-1)
            changeBuses(sortedData)
        }

        else if(fare === true && seatSort===true && ac===false){

            
           sortedData = buses.slice().sort((a,b)=>{

                    if(a.props.details[0].cost>=b.props.details[0].cost){

                        if(a.props.details[0].cost===b.props.details[0].cost){

                            if((35-a.props.details[1])<=(35-b.props.details[1])){

                                    return 1;

                            }else if((35-a.props.details[1])>(35-b.props.details[1])){

                                    return -1;


                            }
                        }else {

                            return 1;


                        }

                    }else{

                        if((35-a.props.details[1])<=(35-b.props.details[1])){

                            return -1;

                    }else if((35-a.props.details[1])>(35-b.props.details[1])){

                            return -1;

                    }
                }
            
            })

            changeBuses(sortedData)
        }
       

        else if(fare === true && seatSort===false && ac===true){

            
            sortedData = buses.slice().sort((a,b)=>{

                    if(a.props.details[0].typeof===b.props.details[0].typeof){

                            if(a.props.details[0].cost>b.props.details[0].cost){

                                    return 1

                            }else{

                                return -1

                            }


                    }else if(a.props.details[0].typeof>b.props.details[0].typeof){

                            return -1

                }else{

                    return 1

                }
            })

            changeBuses(sortedData)
        }

        else if(fare === false && seatSort===true && ac===true){

            
            sortedData = buses.slice().sort((a,b)=>{

                    if(a.props.details[0].typeof===b.props.details[0].typeof){

                            if((35-a.props.details[1])>(35-b.props.details[1])){

                                    return -1

                            }else{

                                return 1

                            }


                    }else if(a.props.details[0].typeof>b.props.details[0].typeof){

                            return -1

                }else{

                    return 1

                }
            })

            changeBuses(sortedData)
        }

        else if(fare === true && seatSort===true && ac===true){

            
           sortedData =  buses.slice().sort((a,b)=>{

                    if(a.props.details[0].typeof===b.props.details[0].typeof){

                            if((35-a.props.details[1])<=(35-b.props.details[1])&&(a.props.details[0].cost>=b.props.details[0].cost)){

                                    return 1

                            }else if((35-a.props.details[1])>=(35-b.props.details[1])&&(a.props.details[0].cost<=b.props.details[0].cost)){

                                return -1

                            }else if((35-a.props.details[1])<=(35-b.props.details[1])&&(a.props.details[0].cost<=b.props.details[0].cost)){

                                return -1
                                
                            }else{

                                return 1

                            }


                    }else if(a.props.details[0].typeof>b.props.details[0].typeof){


                        return -1
                           

                }else{

                    return 1

                }
            })

        changeBuses(sortedData)    

        }
       
        
    },[fare,seatSort,ac,rate])

        
    

        return(

            <div className="user-check">
                    <UserNav className="usercheck-nav"/>
                    {none?
                       
                        <div className="missing-wrapper">
                            <Jumbotron className="missing">
                                <h1>Sorry</h1>
                                <hr></hr>
                                <h4>No Buses available at present!!!Please select Different Date</h4>
                            </Jumbotron>
                        </div>    
                        :
                        <div>
                                <div className="Sort-by">
                                    <Jumbotron className="sort-by">

                                        <h3>Sort By</h3>
                                        <hr></hr>
                                        <input type="checkbox" name="fare" onChange={sorting}></input>
                                        <span className="fare">Fare</span>
                                        <br></br>
                                        <input type="checkbox" name="ac" onChange={sorting}></input>
                                        <span className="fare">Non A/C</span>
                                        <br></br>
                                        <input type="checkbox" name="seatSort" onChange={sorting}></input>
                                        <span className="fare">Seats Available</span>
                                        <br></br>
                                        <input type="checkbox" name="rate" onChange={sorting}></input>
                                        <span className="fare">Rating</span>

                                    </Jumbotron>
                            </div>
                        <div className="bus">
                            <div className="headings">
                                <span className="found">Bus Found:{buses.length}</span>
                                <span className="dept">Departure</span>
                                <span className="dept">Boarding</span>
                                <span className="rating">Rating</span>
                                <span className="fare-head">Fare</span>
                                <span className="seat-head">Seats</span>
                                <span className="seat-head">Type</span>
                            </div>
                            {buses}
                        </div>
                    </div>
                }

            </div>

        )

}

export default UserCheck
