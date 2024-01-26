import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../Avatar/Avatar";
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setCurrenUser } from "../../actions/currentUser";


function Navbar() {
  //var user = JSON.parse(localStorage.getItem("Profile")); //getting data from local storage
  var user = useSelector((state)=>(state.currentUserReducer)) //getting data from reducer or redux 
  const dispatch=useDispatch();
  const navigate =useNavigate();
  useEffect(()=>{
    const token = user?.token
    if(token){
      const decodedToken = jwtDecode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        handleLogout();
      }
    }
    dispatch(setCurrenUser(JSON.parse(localStorage.getItem("Profile"))))  // continuously getting data from redux
  },[dispatch])
  const handleLogout = () => {
    dispatch({ type: "LOGOUT"})
    navigate("/")
    dispatch(setCurrenUser(null))
  }
  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="search-icon" />
        </form>
        {user === null ? (
          <Link to="/Auth" className="nav-item nav-links">
            Log in
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="7px"
              borderRadius="50%"
              color="white"
            >
              <Link to={`/Users/${user?.result?._id}`} style={{ color: "white", textDecoration: "none" }}>
                {user?.result?.name?.charAt(0).toUpperCase()}
              </Link>
            </Avatar>
            <button className="nav-item nav-links" onClick={handleLogout}>Log out</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
