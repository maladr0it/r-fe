import React from "react";
import { useRouteMatch, NavLink } from "react-router-dom";

import * as api from "../services";

import "./JobListItem.css";

interface JobListItemProps extends api.Job {}

export const JobListItem = ({ id, label, results }: JobListItemProps) => {
  const { url } = useRouteMatch();

  return (
    <li>
      <NavLink
        className="JobListItem-link"
        activeClassName="JobListItem-link--active"
        to={`${url}/${id}`}
      >
        <div>{label}</div>
        <div
          className={`JobListItem-status JobListItem-status--${results.status} mt-sm fs-2`}
        >
          {results.status}
        </div>
      </NavLink>
    </li>
  );
};
