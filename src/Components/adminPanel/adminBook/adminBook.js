import React from "react"
import UserNav from '../adminNav/adminNav'
import Table from "react-bootstrap/Table"

function AdminBook(props){

    let data = props.location.state.booking
    data.forEach(item=>{

        item[1] = JSON.parse(item[1])

    })
    
    const rows = data.map((item,no)=>{

       
       return(
        <tr>
            <td>{no}</td>
            <td>{item[0]}</td>
            <td>{item[1].map((cet,i)=>{

                if(i+1 == item[1].length){

                    return <span>{cet}</span>
                }else{

                    return <span>{cet},</span>
                } 
    

            })}</td>
        </tr>
        )
    })

    return(

        <div>
            <UserNav/>
            <div className="booking">    
                    
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Booked By</th>
                                <th>Seats</th>
                            </tr>
                        </thead>        
                        <tbody>

                            {rows}

                        </tbody>
                        
                    
                    </Table>    
                </div>
        </div>


    )

}

export default AdminBook