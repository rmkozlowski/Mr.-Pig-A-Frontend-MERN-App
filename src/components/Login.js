
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import "./styles/Card.css";
import LoginButton from './LoginButton';
import { GoogleLogin }      from 'react-google-login';
import { gapi } from 'gapi-script';

const baseUrl = "https://mrpigbankers.onrender.com/api";

export function Login({updateUser, users}) {
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 4000);
      return false;
    }
    return true;
  }

  function afterLoginSuccess() {
    navigate("/"); 
  }

  function handleLogin() {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      updateUser(user);
      navigate("/");
    } else {
      navigate("/create-account");
    }
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
    <Card className="card">
    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/img-welcome.jpg`} alt="card image cap" />
      <Card.Body>
        <Card.Title>Please Log In</Card.Title>
          <>
          <Form className="d-flex flex-column align-items-center">
            <br/>
            Email address
            <br />
            <input type="input" className="form-control custom-input-blue" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/><br />

            Password
            <br />
            <input type="password" className="form-control custom-input-blue" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/><br />
            <br />
            {status && <p>{status}</p>}
            
            <div className="d-flex justify-content-between">
              
              <LoginButton buttonText="Login with Google" handleSubmit={updateUser} onClick={handleLogin} afterSuccess={afterLoginSuccess} emailButtonText={"Log in with e-mail"}/>
            </div>
            </Form>
          </>
      </Card.Body>
    </Card>
    </div>
  );
}

export default Login;