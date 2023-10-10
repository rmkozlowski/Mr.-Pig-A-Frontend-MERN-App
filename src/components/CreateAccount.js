// CreateAccount.js
import React, {useState, useEffect, useContext} from "react";
import { Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./styles/Card.css";
import LoginButton from './LoginButton';

const baseUrl = "https://mrpigbankers.onrender.com";

export function CreateAccount({addUser, setLoggedInUser}) {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  //const ctx = useContext(UserContext);
  useEffect(() => {
    fetch(`${baseUrl}/users`)
      .then(res => res.json())
      .then(users => setUsers(users))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "104078153668-cqkljommcb3a2jmb13irs35mmptk5unb.apps.googleusercontent.com",
        callback: signUpWithGoogle,
      });
      window.google.accounts.id.renderButton(document.getElementById("googleButton"), {
        theme: "outline",
        text: "sign_up",
        shape: "rectangular",
      });
    }
  }, []);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: please enter your " + label);
      setTimeout(() => setStatus(""), 4000);
      return false;
    }
    if (label==="password" && field.length < 8) {
      setStatus("Error: " + label + " must be at least 8 characters");
      setTimeout(() => setStatus(""), 4000);
      return false;
    }
    return true;
  }

  async function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
  
    const error = await addUser({ name, email, password });
    if (error) {
      console.log("Create account component: ", error);
      setStatus(error.message);
    } else {
      setShow(false); // shows else block
      navigate("/"); // Navigate to the transaction page
    }
  }
  
  async function signUpWithGoogle(response) {
    console.log("response", response);
    setShow(false);
    setLoggedInUser({ name: "Guest", email: "Guest e-mail", _id: "Guest id" });
    navigate("/"); // Navigate to the transaction page
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  function afterCreateAccountSuccess() {
    setShow(false);
  }


  return (
    <div style={{display: "flex", justifyContent: "center"}}>
    <Card className='card'>
    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/img-account.jpg`} alt="card image cap" />
      <Card.Body>
        <Card.Title>Create an Account<br/><br/></Card.Title>
        { show ? (
          <>
          <Form className="d-flex flex-column align-items-center">
            Name
            <br />
            <input type="input" className="form-control custom-input-blue" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.currentTarget.value)}/><br />
            Email address
            <br />
            <input type="input" className="form-control custom-input-blue" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/><br />

            Password
            <br />
            <input type="password" className="form-control custom-input-blue" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/><br />
            <br />
            {status && <p>{status}</p>}
            <div className="button-container">
              <LoginButton buttonText="Sign up with Google" handleSubmit={addUser} onClick={handleCreate} afterSuccess={afterCreateAccountSuccess} emailButtonText={"Sign up with e-mail"}/>
            </div>
          </Form>
          </>
        ) : (
          <>
            <br />
            <h6>Hooray! Your account has been created.</h6>
            <br />

            <Link to="/login">
            <button type="button" className="btn btn-light">
              Log In
            </button>
            </Link>
            <button className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
            
          </>
        )}
      </Card.Body>
    </Card>
    </div>
  );
}
