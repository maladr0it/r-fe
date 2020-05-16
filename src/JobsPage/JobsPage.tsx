import React from "react";
import { Route, useParams, useRouteMatch } from "react-router-dom";

import "./JobsPage.css";
import { JobList } from "./JobList";
import { JobDetail } from "./JobDetail";

export const JobsPage = () => {
  const { path } = useRouteMatch();

  return (
    <main className="JobsPage">
      <header className="JobsPage-header">
        <h1>Jobs</h1>
      </header>
      <div className="JobsPage-listPane">
        <JobList />
      </div>
      <div className="JobsPage-detailPane">
        <Route path={`${path}/:id`}>
          <JobDetail />
        </Route>
      </div>
    </main>
  );
};
