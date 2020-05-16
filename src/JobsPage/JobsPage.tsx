import React from "react";
import { Route, useParams, useRouteMatch } from "react-router-dom";

import { Page, PageHeader, PageContent } from "../ui/Page";

import "./JobsPage.css";
import { JobList } from "./JobList";
import { JobDetail } from "./JobDetail";

export const JobsPage = () => {
  const { path } = useRouteMatch();

  return (
    <Page>
      <PageHeader className="JobsPage-header">
        <h1>Jobs</h1>
      </PageHeader>
      <PageContent className="JobsPage-content">
        <div className="JobsPage-listPane">
          <JobList />
        </div>
        <div className="JobsPage-detailPane">
          <Route path={`${path}/:id`}>
            <JobDetail />
          </Route>
        </div>
      </PageContent>
    </Page>
  );
};
