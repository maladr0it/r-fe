import React, { useCallback } from "react";
import { useParams } from "react-router-dom";

import * as api from "../services";
import { useService } from "../hooks/useService";

import "./JobDetail.css";

export const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  // call every time the ID changes
  // this is a redundant API call as we already have all the data we need from fetching the job
  // list, but this would more accurately simulate the behaviour of a production app
  const getJob = useCallback(() => api.getJob(id), [id]);
  const { status, data } = useService(getJob);

  return (
    <div className="JobDetail-container">
      {status === "loading" && <div>Loading...</div>}
      {status === "idle" && data && (
        <div>
          <h2>{data.label}</h2>
          {data.results.status === "finished" && (
            <>
              <div>results:</div>
              <div>Completed in {data.results.duration} minutes</div>
              <ul className="JobDetail-imageList">
                {data.results.images.map((image) => (
                  <li key={image}>
                    <img className="JobDetail-image" src={image} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {data.results.status === "running" && <div>Job is running...</div>}
        </div>
      )}
    </div>
  );
};
