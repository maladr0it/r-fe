import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import * as api from "../services";
import { useService } from "../hooks/useService";

import { JobListItem } from "./JobListItem";
import { Card } from "../ui/Card";
import { PrimaryButton } from "../ui/Button/PrimaryButton";

import "./JobList.css";

export const JobList = () => {
  const history = useHistory();
  // the request will never change, set it once on mount
  const getJobs = useCallback(api.getJobs, []);
  const { status, data } = useService(getJobs);

  const handleAddClick = () => {
    history.push("/add");
  };

  return (
    <Card className="JobList-container my-md">
      {status === "loading" && (
        <div className="JobList-message">Loading...</div>
      )}
      {status === "idle" && data && (
        <ul className="JobList">
          {data.map((job) => (
            <JobListItem key={job.id} {...job} />
          ))}
        </ul>
      )}
      <PrimaryButton
        className="JobList-addButton mt-md"
        onClick={handleAddClick}
      >
        Add job
      </PrimaryButton>
    </Card>
  );
};
