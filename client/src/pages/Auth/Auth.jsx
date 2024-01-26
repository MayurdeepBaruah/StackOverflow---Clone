import React, { useState } from "react";
import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
function Auth() {
  const [isSignUp, setisSignUp] = useState(false);
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const dispatch=useDispatch();  //dispatch is use to access the async functions of actions so that the data can be transferred to reducer
  const navigate =useNavigate();  
  const handleSwitch = () => {
    setisSignUp(!isSignUp);
  };
  const handleSubmit =(e) => {                  //capturing the event from below
     e.preventDefault()
     if(!email && !password){
      alert("Enter email and password")
     }
     if(isSignUp){
      if(!name){
        alert("Enter a name to continue")
      }
      dispatch(signup({name, email, password}, navigate))
     } else {
      dispatch(login({email, password}, navigate))
     }
      console.log({name, email, password})
             //authData
  }
  return (
    <section className="auth-section">
      {isSignUp && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignUp && (
          <img src={icon} alt="stack overflow" className="login-logo" />
        )}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              {/* when the input value is changed it is captured by event target */}
              <input type="text" name="name" id="name" onChange={(e)=>{setname(e.target.value)}}/>  
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name="email" id="email" onChange={(e)=>{setemail(e.target.value)}}/>
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignUp && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  Forgot password ?
                </p>
              )}
            </div>
            <input type="password" name="password" id="password" onChange={(e)=>{setpassword(e.target.value)}}/>
            {isSignUp && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                Password must contain atleast eight <br />
                characters, including atleast 1 letter and 1 number
              </p>
            )}
          </label>
          {isSignUp && (
            <label htmlFor="check">
              <input type="checkbox" name="check" id="check" />
              <p style={{ fontSize: "13px" }}>
                Opt-in to receive occasional <br /> product updates, user
                research invitations,
                <br /> company announcements, and digests.
              </p>
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isSignUp ? "Sign up" : "Login"}
          </button>
          {isSignUp && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking "Sign up", you agree to our
              <span style={{ color: "#007ac6" }}>
                terms of <br /> service
              </span>
              , <span style={{ color: "#007ac6" }}> privacy policy </span> and
              <span style={{ color: "#007ac6" }}> cookie policy </span>
            </p>
          )}
        </form>
        <p>
          {isSignUp ? "Already have an account ?" : "Don't have an account ?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
}

export default Auth;
