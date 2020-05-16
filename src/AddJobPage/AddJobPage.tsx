import React from "react";

import { Page, PageHeader, PageContent } from "../ui/Page";
import { Card } from "../ui/Card";

import { AddJobForm } from "./AddJobForm";

export const AddJobPage = () => {
  return (
    <Page>
      <PageHeader>
        <h1>Add Job</h1>
      </PageHeader>
      <PageContent>
        <Card className="my-md">
          <AddJobForm />
        </Card>
      </PageContent>
    </Page>
  );
};
