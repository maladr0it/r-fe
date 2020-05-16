import React, { useCallback } from "react";

import * as api from "../services";
import { useService } from "../hooks/useService";

import "./JobList.css";
import { JobListItem } from "./JobListItem";
import { Card } from "../ui/Card";

export const JobList = () => {
  // the request will never change, set it once on mount
  const getJobs = useCallback(api.getJobs, []);
  const { status, data } = useService(getJobs);

  return (
    <Card className="JobList-container">
      {status === "loading" && <div>Loading...</div>}
      {status === "idle" && data && (
        <ul className="JobList">
          {data.map((job) => (
            <JobListItem key={job.id} {...job} />
          ))}
        </ul>
      )}
      <button className="mt-md">Add job</button>
    </Card>
  );
};
