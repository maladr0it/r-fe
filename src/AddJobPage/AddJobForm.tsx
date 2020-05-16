import React from "react";
import { useHistory } from "react-router-dom";
import { useFormikContext } from "formik";

import { PrimaryButton, Button } from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import { Select } from "../ui/Select";

const CORE_OPTIONS = [
  {
    label: "wowww",
    value: "wo",
  },
  {
    label: "woww",
    value: "wo434",
  },
];

export const AddJobForm = () => {
  const history = useHistory();
  const formik = useFormikContext();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const handleCancelClick = () => {
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Name" name="name" />
      <Select
        disabled
        className="mt-md"
        label="Cores"
        name="cores"
        options={CORE_OPTIONS}
      ></Select>
      <PrimaryButton className="mt-md" type="submit">
        Submit
      </PrimaryButton>
      <Button className="ml-sm" type="button" onClick={handleCancelClick}>
        Cancel
      </Button>
    </form>
  );
};
