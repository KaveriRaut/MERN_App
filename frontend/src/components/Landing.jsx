import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Landing.css';


function Landing() {

    const navigate = useNavigate();
    
  return (
       <>
      <div class="intro">
        <h1>The Keeper &nbsp;&nbsp;&nbsp;<br/>App &nbsp;&nbsp;</h1>
        <p>keep your notes handy....&nbsp;&nbsp;</p> <br/>
            <Button onClick={ ()=> navigate("login")}>Login</Button>
            <Button onClick={ ()=> navigate("register")}>Register</Button>
      </div>
     </>
  );
}

export default Landing;


