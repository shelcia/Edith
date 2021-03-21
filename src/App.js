import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Form from "./pages/Form";
import Error404 from "./pages/Error404";
import FinalPage from "./pages/FinalPage";
import NoEntry from "./pages/NoEntry";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import AllUsers from "./admin/Users";

import "./styles/style.css";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/user/:id" component={Form} />
          <Route path="/finalpage" component={FinalPage} />
          <Route path="/noentrybro" component={NoEntry} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route
            exact
            path="/admin/jithujiladimittakilaadi"
            component={AdminDashboard}
          />
          <Route
            exact
            path="/admin/jithujiladimittakilaadi/users"
            component={AllUsers}
          />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

// REACT_APP_HEROKU_LINK = https://edith-club-backend.herokuapp.com/

export default App;
