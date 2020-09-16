import React from "react"
import{useState,useEffect} from "react"
import axios from "axios"
import AdminPanel from "../adminPanel/adminPanel"
import UserPanel from "../userPanel/userHome/userHome"
import "./page.css"

function PageRendering(props){

        const[user,changeUser] = useState("")
        const[isAdmin,changeIsAdmin] = useState(false)
        const[isUser,changeIsUser] = useState(false)
        useEffect(()=>{

            const token = localStorage.getItem("userToken")
            if(token!=null){
                    axios.post("http://localhost:5000/profile",{

                        token:token

                    })
                    .then(res =>{
                        
                        if(res.data.admin === true){

                            changeIsAdmin(true)
                        }else{

                            changeIsUser(true)
                            changeUser(res.data.mail)

                        }

                    })
                    .catch(err =>{

                        
                        if(err.response.status === 400){

                            localStorage.removeItem('userToken')
                            alert("Session expired!Please login again")
                            props.history.push('/')

                        }else if(err.response.status === 401){

                            localStorage.removeItem('userToken')
                            props.history.push('/')

                        }


                    })
                }else{

                    props.history.push('/')


                }   

        },[])

  

        return(

            <div>

                {isAdmin?<AdminPanel/>:isUser?<UserPanel mail={user}/>:<div className="empty"></div>}

            </div>
           
        )

}

export default PageRendering
