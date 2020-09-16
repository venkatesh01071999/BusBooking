import React from "react"
import "./signup.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState} from "react"
import {Link} from "react-router-dom"
import GoogleLogin from 'react-google-login'
import axios from "axios"
import bus from "../route.png"

function SignUp(props){

    const[email,changeEmail] = useState("")
    const[password,changePassword] = useState("")
    const[server,changeServer] = useState(false)
    const[taken,changeTaken] = useState(false) 
    const[google,changeGoogle] = useState(false)
    const[success,changeSuccess] = useState(false)
    

    const change = (e) =>{

        if(e.target.name === "email"){

            changeEmail(e.target.value)

        }else if(e.target.name === "password"){

            changePassword(e.target.value)


        }
    
    }

    const submit = (f)=>{

        changeServer(false)
        changeTaken(false)
        f.preventDefault()
        axios.post("http://localhost:5000/signUp",{

            email:email,
            password:password

        })
        .then(res =>{

            changeSuccess(true)
            setTimeout(()=>{

                    props.history.push('/')

            },2000)

        } )
        .catch(err =>{

            if(err.response.status === 400){

                changeTaken(true)

            }else if(err){

                changeServer(true)

            }


        })
     

    }

    const responseGoogle = (response) => {
        
            axios.post('http://localhost:5000/oauth/google/signUp',{

                 "access_token":response.accessToken


            })
            .then(res =>{

                if(res.data.created){

                    changeSuccess(true)
                    setTimeout(()=>{

                            props.history.push('/')

                    },3000)

                }else{

                    changeTaken(true)


                }

            })
            .catch(err=>{

                changeServer(true)

            })

  }

    return(

        <div className="signup">
            <img src={bus} style={{width:"100px",height:"80px"}}></img>
            {server?<div className="error" variant="danger">Server error! Please try again</div>
            :taken?<div className="error" variant="danger">You are already registered with us!!</div>
            :success?<div className="success" >Sucessfully registered!!</div>
            :<></>}
            <div className="signup-form">
            <Form onSubmit={submit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="email-input" name="email" type="email" placeholder="Enter email" onChange={change} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={change} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            </div>
            <GoogleLogin
                clientId="193849107452-3kh3pc4onetu5mvr9eiuq9mfhune11uq.apps.googleusercontent.com"
                buttonText="Sign up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <br></br>
            <Link className="sign-up" to='/'>

                Log In

            </Link>

        </div>
    )
}


export default SignUp