import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import { Page, PageHeader, PageContent } from "../ui/Page";
import { Card } from "../ui/Card";

import "./JobsPage.css";
import { JobList } from "./JobList";
import { JobDetail } from "./JobDetail";

export const JobsPage = () => {
  const { path } = useRouteMatch();

  return (
    <Page>
      <PageHeader>
        <h1>Jobs</h1>
      </PageHeader>
      <PageContent className="JobsPage-content">
        <JobList />
        <Switch>
          <Route path={`${path}/:id`}>
            <JobDetail />
          </Route>
          {/* if there is no item id, display this fallback*/}
          <Route path="/">
            <Card className="my-md">
              <div className="JobsPage-message my-md">
                Select a job from the left
              </div>
            </Card>
          </Route>
        </Switch>
      </PageContent>
    </Page>
  );
};
