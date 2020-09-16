import React from "react"
import {useEffect,useState} from "react"
import SeatModal from "./seatModal"


function SeatConfirm(props){

        
        console.log(props)
        const[show,changeShow] = useState(false)
        useEffect(()=>{

            if(!props.location.state){
                
                props.history.goBack()
            }else{

                
                changeShow(true)
                window.onpopstate = e =>{

                        props.history.goBack()
                } 
                
            }
        

        },[])
        

        return(
         
            <div>
                
                {show?<SeatModal detail={props}/>:<></>}

            </div>

        )

}

export default SeatConfirm