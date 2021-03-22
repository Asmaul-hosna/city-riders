import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  
} from "react-router-dom";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import Login from './component/Login/Login';
import ServiceArea from './component/ServiceArea/ServiceArea';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const UserContext= createContext();


function App(props) {
  const [loggedInUser,setLoggedInUser]=useState({})
  return (
     
        <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
          <h3>email:{loggedInUser.email}</h3>
          <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
        <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
          </Route>
          <PrivateRoute path="/serviceArea">
            <ServiceArea></ServiceArea>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
          </Switch>
        </Router>
        </UserContext.Provider>
        
       
      
      
      
       
        

       
  
  );
}

export default App;
