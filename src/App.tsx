import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { JobsPage } from "./JobsPage";
import { AddJobPage } from "./AddJobPage";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/jobs" />
        <Route path="/jobs">
          <JobsPage />
        </Route>
        <Route path="/add">
          <AddJobPage />
        </Route>
      </Switch>
    </Router>
  );
};
