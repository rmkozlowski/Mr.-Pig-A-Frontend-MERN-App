import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { GoogleOAuthProvider } from '@react-oauth/google'; // import GoogleOAuthProvider
import { Home } from './components/Home';
import { CreateAccount } from './components/CreateAccount';
import { Deposit } from './components/Deposit';
import { Withdraw } from './components/Withdraw';
import { Transfer } from './components/Transfer';
import { AllData } from './components/AllData';
import { Login } from './components/Login';
import { useEffect, useState, createContext } from 'react';
import { googleLogout } from '@react-oauth/google';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from './firebase.js';
import { gapi } from 'gapi-script';
import {useGoogleLogin} from 'react-google-login';

// Parent style for main area of app: centers subcomponents
import './components/styles/App.css';

//client ID for Google
const clientId = '276155384556-2drgoi8ep89s00oh77nh1t75eosr45gq.apps.googleusercontent.com';
//const baseUrl = "http://localhost:9090/api";
const baseUrl = "https://mrpigbankers.onrender.com";

export const UserContext = createContext(null);

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);

  //Google Auth Login
    // OAuth2, gapi = Google API
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: clientId,
          scope: ''
        })
      };
  
      gapi.load('client', start);
    });
  
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        setLoggedInUser(JSON.parse(user));
      }
    }, []);
    
    // CREATE (user)
    async function addUser(user) {
      try {
        const response = await fetch(`${baseUrl}/create-account`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        console.log("Sign up status: ", response.status);
        if (response.status === 400) {
          throw response;
        }
        const userData = await response.json();
        console.log(userData);
        setLoggedInUser(userData);
        return false;
      }
      catch (err) {
        if (err.status === 400) {
          const message = await err.json();
          console.log("Error: ", message);
          return message;
        }
      }
    }
  
    function logOut() {
      setLoggedInUser(null);
      localStorage.removeItem("user");
    }
  
      // UPDATE (user)
      async function updateUser(user) {
        try {
        const response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        console.log("Login status: ", response.status);
        if (response.status === 400) {
          throw response;
        }
        const userData = await response.json();
        console.log(userData);
        setLoggedInUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return false;
        } 
        catch (err) {
          if (err.status === 400) {
            const message = await err.json();
            console.log("Error: ", message);
            return message;
          }
        }
      }
  
    // UPDATE (user balance)
    function updateUserBalance(user) {
      const updatedUsers = users.map(u => {
        if (u.email === user.email) {
          return user;
        }
        return u;
      });
      setUsers(updatedUsers);
    }

  return (
    <div className="App">
      <BrowserRouter>
      <GoogleOAuthProvider clientId="276155384556-2drgoi8ep89s00oh77nh1t75eosr45gq.apps.googleusercontent.com">
        <UserContext.Provider value={{users:[]}}>
        <NavBar loggedInUser = {loggedInUser} logOut = {logOut} />
          <br />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-account" element={<CreateAccount addUser={addUser} />} />
            <Route path="/login" element={<Login updateUser={updateUser} users={users}/>} />
            <Route path="/deposit" element={<Deposit updateUser={updateUser} loggedInUser = {loggedInUser} updateUserBalance={updateUserBalance} />} />
            <Route path="/withdraw" element={<Withdraw updateUser={updateUser} loggedInUser = {loggedInUser} updateUserBalance={updateUserBalance} />} />
            <Route path="/transfer" element={<Transfer updateUser={updateUser} loggedInUser = {loggedInUser} setLoggedInUser = {setLoggedInUser} updateUserBalance={updateUserBalance} />} />
            <Route path="/all-data" element={<AllData users= {users} />} />
          </Routes>
          <br />
        </UserContext.Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}
  

export {App} ;

