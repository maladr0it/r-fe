import React, { useCallback } from "react";
import { useParams } from "react-router-dom";

import * as api from "../services";
import { useService } from "../hooks/useService";
import { Card, CardHeader } from "../ui/Card";

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
      {status === "loading" && (
        <Card className="JobDetail-message">
          <div className="my-md">Loading...</div>
        </Card>
      )}
      {status === "error" && (
        <Card className="JobDetail-message">
          <div className="my-md">Job not found...</div>
        </Card>
      )}
      {status === "idle" && data && (
        <>
          <Card>
            <CardHeader>
              <h2 className="fs-5 fw-bold">{data.label}</h2>
            </CardHeader>
            <div>
              <div className="fs-4">{data.software.application.label}</div>
              <div className="mt-sm color-weak">
                <span>{data.hardware.type.label}</span>
                <span className="ml-md">{data.hardware.cores} cores</span>
              </div>
            </div>
          </Card>

          <Card className="JobDetail-results">
            {data.results.status === "finished" && (
              <>
                <CardHeader>
                  <h3 className="fs-4 fw-bold">Results</h3>
                  <div className="mt-sm color-weak">
                    Completed in {(data.results.duration / 1000).toFixed(2)}{" "}
                    seconds
                  </div>
                </CardHeader>
                <ul className="JobDetail-imageList">
                  {data.results.images.map((image) => (
                    <li className="JobDetail-imageListItem" key={image}>
                      <img
                        className="JobDetail-image"
                        src={image}
                        alt="job result"
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {data.results.status === "in-progress" && (
              <div className="JobDetail-inProgressMessage mt-md">
                Job is running, refresh page to check progress
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
};
