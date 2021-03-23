import React from "react";
import { NavLink, useHistory } from "react-router-dom";

const AdminNavbar = () => {
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/admin/login");
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <NavLink className="navbar-brand" to="/admin/jithujiladimittakilaadi">
          Edith CTF
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/jithujiladimittakilaadi">
                Participants
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/admin/jithujiladimittakilaadi/hints"
              >
                Hint
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/jithujiladimittakilaadi/users"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/jithujiladimittakilaadi/instructions"
              >
                Instructions
              </NavLink>
            </li>
          </ul>
          <button className="btn btn-danger ml-auto" onClick={(e) => logout(e)}>
            Logout
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default AdminNavbar;
