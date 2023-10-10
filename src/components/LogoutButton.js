import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { GoogleLogout }      from 'react-google-login';

const baseUrl = "https://mrpigbankers.onrender.com/api";

const clientId = '276155384556-2drgoi8ep89s00oh77nh1t75eosr45gq.apps.googleusercontent.com';

function LogoutButton(props) {
    const navigate = useNavigate();
    const onSuccess = () => {
        alert('Logged out successfully! Come back again, soon!');
        console.log('Logged out successfully');
        props.logOut();
        navigate('/'); 
      };
      
    return (
        <div id="logOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={`${props.loggedInUser.name} | Logout`}
                onLogoutSuccess={onSuccess}
                className="custom-google-logout-button"
            />
        </div>
    )
}

export default LogoutButton;