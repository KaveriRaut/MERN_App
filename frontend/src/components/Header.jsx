import React, { useEffect } from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import './Header.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("jsonwebtoken")){
      navigate("/login");
    }
  },[])
  
  const handleLogout = (event) => {
    localStorage.removeItem("jsonwebtoken");
  }

  return (
    <header>
      <h1>
      <nav className="navbar navbar-expand-sm">
        <Link to="/home" style={{textDecoration: 'inherit', color:'inherit'}}>
        <HighlightIcon></HighlightIcon>
        Keeper
        </Link>
      <div class="navbar-nav">
        <h4><Link className="link" to="/home">Home</Link></h4>
        <h4><Link className="link" to="/create">Create</Link></h4>
        <h4><Link className="link" to="/display">Display</Link></h4>
        <h4><Link className="link" to="/" onClick={handleLogout}>Logout</Link></h4>
      </div>
      </nav>
      </h1>
    </header>
  );
}

export default Header;
