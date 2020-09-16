import React from "react"
import AdminNav from "./adminNav/adminNav"
import Jumbotron from 'react-bootstrap/Jumbotron'
import "./admin.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FileBase from "react-file-base64"
import axios from "axios"
import {Link} from "react-router-dom"
class AdminPanel extends React.Component{

        constructor(){

            super()
            this.state ={

                bus:"",
                from:"",
                to:"",
                type:"",
                days:"",
                arrival:"",
                price:0,
                board:"",
                photo:null,
                success:false,
                mistake:false,
                server:false
            }
        this.change = this.change.bind(this) 
        this.submit = this.submit.bind(this)   

        }

        change(f){
            if(f.type === "image/png" || f.type === "image/jpeg"){

                this.setState({

                    photo:f.base64.toString()
                })

            }else{
            const{name,value} = f.target
            this.setState({
                [name]:value
            })
        }

        }

       submit(e){

            this.setState({

                success:false,
                mistake:false

            })
            e.preventDefault()
            axios.post('http://localhost:5000/admin',{

                bus:this.state.bus,
                fromCity:this.state.from,
                toCity:this.state.to,
                type:this.state.type,
                day:this.state.days,
                arrivalTime:this.state.arrival,
                board:this.state.board,
                price:this.state.price,
                photo:this.state.photo
            })
            .then(res =>{

                if(res){

                    this.setState({success:true})


                }


            })

            .catch(err =>{

                if(err.response.status === 400){

                    this.setState({mistake:true})


                }else if(err.response.status === 500){

                    this.setState({server:true})

                }


            })

       }
        
        render(){

            return(

                <div className="admin-panel">

                    <AdminNav />
                    <div className="main-card">
                        <Jumbotron >
                        {this.state.server?<div className="error" variant="danger">Server error! Please try again</div>
                            :this.state.mistake?<div className="error" variant="danger">That bus is already added</div>
                            :this.state.success?<div className="success" >Sucessfully added!!!</div>
                            :<></>}
                            <Form onSubmit={this.submit}>
                                <Form.Text className="text-muted">
                                    Enter the bus details
                                </Form.Text>
                                <Form.Group>
                                    <Form.Label>Bus Name</Form.Label>
                                    <Form.Control  required  type="text" name="bus" placeholder="Enter BusName" onChange={this.change}/>
                                    
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type="text"  required placeholder="From" name="from"  onChange={this.change}/>
                                    
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="text"  required placeholder="To" name="to"  onChange={this.change} />
                                </Form.Group> 
                                <Form.Group>
                                    <Form.Label>Bus Type</Form.Label>
                                    <Form.Control type="text"  required placeholder="A/C or Non A/C" name="type"  onChange={this.change} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Working Days</Form.Label>
                                    <Form.Control type="text"  required placeholder="All day or specific day" name="days"  onChange={this.change} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Arrival Time</Form.Label>
                                    <Form.Control type="text"  required placeholder="9:30PM" name="arrival"  onChange={this.change} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Boarding Point</Form.Label>
                                    <Form.Control type="text"  required placeholder="Gandhipuram" name="board"  onChange={this.change} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text"  required placeholder="500" name="price"  onChange={this.change} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form>
                            
                        </Jumbotron>
                    </div>



                </div>            




        )
        }



}

export default AdminPanel