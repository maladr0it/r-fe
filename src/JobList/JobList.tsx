import React, { useCallback } from "react";

import * as api from "../services";
import { useService } from "../hooks/useService";

export const JobList = () => {
  // the request will never change, set it once at mount
  const getJobs = useCallback(api.getJobs, []);
  const { status, data } = useService(getJobs);

  return (
    <>
      <h1>Job List</h1>
      {console.log(data)}
      {status === "loading" && <div>Loading...</div>}
      {status === "idle" && data && (
        <ul>
          {data.map((job) => (
            <li key={job.id}>{job.name}</li>
          ))}
        </ul>
      )}
      <ul></ul>
    </>
  );
};
