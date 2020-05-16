import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";

import * as api from "../services";
import { useService } from "../hooks/useService";
import { LoadingButton, Button } from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import { Select } from "../ui/Select";

import "./AddJobForm.css";

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

export const AddJobForm = () => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting">(
    "idle",
  );

  const history = useHistory();

  const formik = useFormik<FormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit: async (values) => {
      // convert cores from string to number
      const { cores, ...rest } = values;

      setSubmitStatus("submitting");
      const newJob = await api.addJob({ cores: parseInt(cores, 10), ...rest });
      history.replace(`jobs/${newJob.id}`);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const handleCancelClick = () => {
    history.goBack();
  };

  const formFilled = Object.values(formik.values).every((value) => value);

  // as it cannot change, we only need to get software list once on mount
  const getSoftware = useCallback(api.getSoftware, []);
  const { data: softwareOptions } = useService(getSoftware);

  const getApplications = (softwareId: string) => {
    return softwareOptions?.find((item) => softwareId === item.id)
      ?.applications;
  };

  // as it cannot change, we only need to get the hardware list once on mount
  const getHardware = useCallback(api.getHardware, []);
  const { data: hardwareOptions } = useService(getHardware);

  const getCores = (hardwareId: string) => {
    const maxCores = hardwareOptions?.find((item) => hardwareId === item.id)
      ?.max;

    if (maxCores) {
      return Array.from({ length: maxCores }, (_, i) => i + 1);
    }
  };

  // clear the applicationId field if the softwareId field is changed
  useEffect(() => {
    formik.setFieldValue("applicationId", "");
  }, [formik.setFieldValue, formik.values.softwareId]);

  // clear the cores field if the hardwareId field is changed
  useEffect(() => {
    formik.setFieldValue("cores", "");
  }, [formik.setFieldValue, formik.values.hardwareId]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <div className="AddJobForm-inputs">
          <TextInput label="Job name*" name="name" autoComplete="off" />
        </div>
        <div className="AddJobForm-inputs mt-md">
          <Select
            label="Software category*"
            name="softwareId"
            disabled={softwareOptions === null}
            options={softwareOptions?.map((item) => ({
              label: item.label,
              value: item.id,
            }))}
          />
          <Select
            label="Application*"
            name="applicationId"
            disabled={!formik.values.softwareId}
            options={getApplications(formik.values.softwareId)?.map((item) => ({
              label: item.label,
              value: item.id,
            }))}
          />
        </div>
        <div className="AddJobForm-inputs mt-md">
          <Select
            label="Hardware*"
            name="hardwareId"
            disabled={hardwareOptions === null}
            options={hardwareOptions?.map((item) => ({
              label: item.label,
              value: item.id,
            }))}
          />
          <Select
            label="Cores*"
            name="cores"
            disabled={!formik.values.hardwareId}
            options={getCores(formik.values.hardwareId)?.map((num) => ({
              label: num.toString(),
              value: num.toString(),
            }))}
          ></Select>
        </div>
        <LoadingButton
          className="mt-md"
          type="submit"
          loading={submitStatus === "submitting"}
          disabled={!formFilled}
        >
          Submit
        </LoadingButton>
        <Button className="ml-sm" type="button" onClick={handleCancelClick}>
          Cancel
        </Button>
      </form>
    </FormikProvider>
  );
};
