import React from "react"
import "./login.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import bus from "../route.png"
import GoogleLogin from 'react-google-login'
import ReCAPTCHA from "react-google-recaptcha"


function LogIn(props){

    const[email,changeEmail] = useState("")
    const[password,changePassword] = useState("")
    const[error,changeError] = useState(false)
    const[server,changeServer] = useState(false)
    const[unauth,changeUnAuth] = useState(false)
    const[captcha,changeCaptcha]= useState('')
    useEffect(() => {
        
        if(localStorage.getItem("userToken")!=null){

            props.history.push('/profile')

        }
        
        
    }, [])


    const change = (e) =>{

        if(e.target.name === "email"){

            changeEmail(e.target.value)

        }else if(e.target.name === "password"){

            changePassword(e.target.value)


        }
    
    }

    const submit = (f)=>{

        f.preventDefault()
        if(captcha!=''){
            axios.post("http://localhost:5000/",{

                email:email,
                password:password,
                captch:captcha

            })
            .then(res =>{

                localStorage.setItem("userToken",res.data.token)
                props.history.push('/profile')


            })
            .catch(err =>{

                if(err.response.status === 400){

                    changeError(true)

                }else if(err.response.status === 500){

                    changeServer(true)

                }else if(err.response.status === 401){

                    changeUnAuth(true)

                }

            })
        }

    }

    const responseGoogle = (response) => {
        
            axios.post('http://localhost:5000/oauth/google/signIn',{


                "access_token":response.accessToken

            })
            .then(res=>{

                localStorage.setItem("userToken",res.data.token)
                props.history.push('/profile')


            })
            .catch(err =>{

                if(err.response.status === 400){

                    changeError(true)
                    setTimeout(()=>{

                        props.history.push('/signUp')


                    },3000)

                }else if(err.response.status === 500){

                    changeServer(true)

                }else if(err.response.status === 401){

                    changeUnAuth(true)

                }

            })

      }

    const onChange = (value)=>{

        changeCaptcha(value)     

      }
      
    return(

        <div className="login">
            <img src={bus} style={{width:"100px",height:"80px"}}></img>
            <h1>Welcome to Route bus</h1>
            {error?<div className="error-1">Your Account is not registered with us!!Please Sign Up</div>
                  :server?<div className="error-1">Server error Please Try again</div>
                  :unauth?<div className="error-1">Access Denied</div>:<></>
            } 
            <div className="login-form">
               
            <Form onSubmit={submit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="email-input" required name="email" type="email" placeholder="Enter email" onChange={change} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" required placeholder="Password" onChange={change} />
                </Form.Group>
                <br></br>
                <ReCAPTCHA 
                    sitekey="6LcK07oZAAAAAMWnNM4MPREuVXM0RXB2z0yPrGLG"
                    onChange={onChange}
                />
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
            </div>
            <GoogleLogin
                clientId="193849107452-3kh3pc4onetu5mvr9eiuq9mfhune11uq.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <br></br>
            <Link className="sign-up" style={{color:"blue"}} to='/signUp'>

                Sign Up

            </Link>

        </div>
    )
}


export default LogIn