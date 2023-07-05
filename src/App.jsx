import React, { useContext } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import {BrowserRouter, Navigate, Outlet, Route, Router, Routes} from "react-router-dom";
import { Authcontext } from "./context/Authcontext";


const App = () =>{
  const {currentUser} = useContext(Authcontext);
  console.log(currentUser)

  const ProtectedRoute = ({children}) =>{
    return (
      currentUser ? <Outlet/> : <Login/>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" Component={()=>{return(<ProtectedRoute><Home/></ProtectedRoute>)}}>
          <Route path="/" Component={Home}/>
          <Route path="/login" Component={Login}/>
          </Route>
          <Route path="/signup" Component={Signup}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;