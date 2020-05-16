import React from "react";
import { useFormik, FormikProvider } from "formik";

import { Page, PageHeader, PageContent } from "../ui/Page";
import { Card } from "../ui/Card";

import { AddJobForm } from "./AddJobForm";

interface FormValues {
  name: string;
  softwareId: string;
  applicationId: string;
  hardwareId: string;
  cores: string;
}

const INITIAL_VALUES = {
  name: "",
  softwareId: "",
  applicationId: "",
  hardwareId: "",
  cores: "",
};

export const AddJobPage = () => {
  const formik = useFormik<FormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values) => console.log(values),
  });

  return (
    <Page>
      <PageHeader>
        <h1>Add Job</h1>
      </PageHeader>
      <PageContent>
        <Card className="my-md">
          <FormikProvider value={formik}>
            <AddJobForm />
          </FormikProvider>
        </Card>
      </PageContent>
    </Page>
  );
};
