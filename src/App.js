import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Form from "./components/Form";
import AdminDashboard from "./components/Admin";
import Error404 from "./components/Error404";
import FinalPage from "./components/FinalPage";
import NoEntry from "./components/NoEntry";

import "./styles/style.css";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/user/:id' component={Form} />
          <Route
            path='/admin/jithujiladimittakilaadi'
            component={AdminDashboard}
          />
          <Route path='/finalpage' component={FinalPage} />
          <Route path='/noentrybro' component={NoEntry} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
