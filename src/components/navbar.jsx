import React from "react";
import { Link, NavLink } from "react-router-dom";
function NavBar({ user }) {
  return (
    <nav
      id="navBar"
      className="navbar navbar-expand-md bg-dark navbar-dark sticky-top"
    >
      <Link className="navbar-brand" to="/">
        Ephemeral Mind
      </Link>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navb"
        aria-expanded="true"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {
        /* User is not logged in */
        !user && (
          <div id="navb" className="navbar-collapse collapse hide">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <i className="fa fa-sign-in" aria-hidden="true"></i> Login
                </NavLink>
              </li>
            </ul>
          </div>
        )
      }

      {
        /* User is logged in */
        user && (
          <div id="navb" className="navbar-collapse collapse hide">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/journal">
                  Journal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/weight">
                  Weight Loss
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/undefined">
                  Food Consumption
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/undefined">
                  Spending
                </NavLink>
              </li>
            </ul>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/me">
                  <i className="fa fa-user-circle" aria-hidden="true"></i> My
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        )
      }
    </nav>
  );
}

export default NavBar;
