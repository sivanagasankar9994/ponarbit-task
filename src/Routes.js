import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Users from "./components/Users";
import Sample from "./components/Sample";
import User from "./components/User";

const Routes = () => {
  return (
    <BrowserRouter>
      {/* <Menu /> */}
      <Switch>
        <Route path="/" exact component={Users} />
        {/* <Route path="/" exact component={Sample} /> */}
        <Route path="/user/:id" exact component={User} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
