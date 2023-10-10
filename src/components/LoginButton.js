import React from 'react';
import { useNavigate }        from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const baseUrl = "https://mrpigbankers.onrender.com/api";


const clientId = '276155384556-2drgoi8ep89s00oh77nh1t75eosr45gq.apps.googleusercontent.com';

function LoginButton(props) {
  const navigate = useNavigate(); 

  const onSuccess = async (res) => {
    if (res && res.porgileObj) {
    console.log('Login Success! Current user:', res.profileObj);
    await props.handleSubmit({name: res.profileObj.givenName, email: res.profileObj.email, password: res.profileObj.googleId, isGoogle: true});
    props.afterSuccess();

   navigate('/');
  } else {
    console.log('Login failed! res: ', res);
  }
};

  const onFailure = (res) => {
    console.log('Login failed! res: ', res);
  };

  return (
    <div id="logInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText={props.buttonText}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        className="custom-google-login-button"
      />
    <button type="button" className="btn btn-light" onClick={props.onClick}>
      {props.emailButtonText}
    </button>
    </div>
  );
}

export default LoginButton;