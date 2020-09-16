import React from 'react';
import './App.css';
import logIn from "./Components/logIn/logIn"
import signUp from "./Components/signUp/signUp"
import {Switch,Route,BrowserRouter} from "react-router-dom"
import pageRendering from "./Components/PageRendering/pageRendering"
import userCheck from "./Components/userPanel/userCheck/userCheck"
import busBook from './Components/userPanel/userBusBook/userBusBook'
import seatConfirm from "./Components/userPanel/seatConfirm/seatConfirm"
import userBookings from "./Components/userPanel/userBookings/userBookings"
import adminSearch from "./Components/adminPanel/adminSearch/adminSearch"
import adminBook from "./Components/adminPanel/adminBook/adminBook"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (

    <div>
        <BrowserRouter>
          <Switch>
              <Route exact path = "/" component={logIn} />
              <Route  path = "/signUp" component={signUp} />
              <Route path="/profile" component={pageRendering}/>
              <Route path="/userCheck" component={userCheck}/>
              <Route path="/bookSeats" component={busBook}/>
              <Route path="/seatConfirm" component={seatConfirm}/>
              <Route path="/userHistory" component={userBookings}/>
              <Route path="/adminSearch" component={adminSearch}></Route>
              <Route path="/bookedSearch" component={adminBook}></Route>
          </Switch>
        </BrowserRouter>    
    </div>
    );
}

export default App;
