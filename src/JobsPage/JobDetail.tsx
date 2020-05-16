import React, { useCallback } from "react";

import * as api from "../services";
import { useService } from "../hooks/useService";
import { useParams } from "react-router-dom";

interface JobDetailProps {
  id: string;
}

export const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  // call every time the ID changes
  const getJob = useCallback(() => api.getJob(id), [id]);
  const { status, data } = useService(getJob);

  return (
    <>
      <h2>Job Detail</h2>
      {status === "loading" && <div>Loading...</div>}
      {status === "idle" && data && (
        <div>
          <div>results:</div>
          {data.results.status === "finished" && (
            <ul>
              {data.results.images.map((image) => (
                <li key={image}>{image}</li>
              ))}
            </ul>
          )}
          {data.results.status === "running" && <div>Job is running...</div>}
        </div>
      )}
    </>
  );
};
