import React, { useContext } from 'react';
import { UserContext } from '../App';
import { NavLink, useNavigate} from 'react-router-dom';
import './styles/NavBar.css';
import LogoutButton from './LogoutButton';

const baseUrl = "https://mrpigbankers.onrender.com/api";

export function NavBar({ loggedInUser, logOut }) {
  const navigate = useNavigate();

    const handleLogOut = () => {
      logOut();
      navigate('/');
    };

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-custom">
          <NavLink className="navbar-brand" to="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/image-bank-logo-night.png`}
              width="130px"
              alt="Mr.Pig"
              className="logo-image"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            z-index="3"
            color="white"
          >
            <span className="navbar-toggler-icon" z-index="3"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" exact to="/">
                  Home
                </NavLink>
              </li>
              {!loggedInUser ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/create-account"
                    >
                      Create Account
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/login">
                      Log In
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/withdraw">
                      Withdraw
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/deposit">
                      Deposit
                    </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/transfer">
                    Transfer
                  </NavLink>
                </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/all-data">
                        All Data
                      </NavLink>
                    </li>
                  {loggedInUser.isGoogle ? (
                    <LogoutButton logOut={logOut} loggedInUser={loggedInUser} />
                  ) : (
                    <li className="nav-item">
                      <span className="nav-link ml-auto" onClick={handleLogOut}>
                        {loggedInUser.name} | Logout
                      </span>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
}