import React, { useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import * as api from "../services";
import { useService } from "../hooks/useService";

interface JobListItemProps extends api.Job {}

const JobListItem = ({
  id,
  name,
  software,
  hardware,
  results,
}: JobListItemProps) => {
  const { url } = useRouteMatch();

  return (
    <li>
      <Link to={`${url}/${id}`}>
        <div>{name}</div>
        <div>{results.status}</div>
        <div>{}</div>
        {results.status === "finished" && (
          <div>
            <div>duration: {results.duration}</div>
          </div>
        )}
      </Link>
    </li>
  );
};

export const JobList = () => {
  // the request will never change, set it once at mount
  const getJobs = useCallback(api.getJobs, []);
  const { status, data } = useService(getJobs);

  return (
    <>
      <h2>Job List</h2>
      {status === "loading" && <div>Loading...</div>}
      {status === "idle" && data && (
        <ul>
          {data.map((job) => (
            <JobListItem key={job.id} {...job} />
          ))}
        </ul>
      )}
    </>
  );
};
