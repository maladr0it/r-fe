const API_URL = "http://localhost:4000/api";

interface Software {
  id: string;
  label: string;
  info: string;
  applications: {
    id: string;
    label: string;
    image: string;
  }[];
}

interface Hardware {
  type: {
    id: string;
    label: string;
  };
  cores: number;
}

type Result =
  | {
      status: "finished";
      duration: number;
      images: string[];
    }
  | {
      // asssume there is a 'running' status, and no results (images) are available at this point
      status: "running";
    };

interface Job {
  id: string;
  name: string;
  software: {
    type: {
      id: string;
      label: string;
    };
    application: {
      id: string;
      label: string;
    };
  };
  hardware: Hardware;
  results: Result[];
}

export const getJobs = async () => {
  const resp = await fetch(`${API_URL}/jobs`);
  const data = (await resp.json()) as { jobs: Job[] };
  return data.jobs;
};

export const getJob = async (id: string) => {
  const resp = await fetch(`${API_URL}/jobs/${id}`);
  const data = (await resp.json()) as Job;
  return data;
};

export const getSoftware = async () => {
  const resp = await fetch(`${API_URL}/software`);
  const data = (await resp.json()) as { options: Software[] };
  return data.options;
};

export const getHardware = async () => {
  const resp = await fetch(`${API_URL}/hardware`);
  const data = (await resp.json()) as { options: Hardware[] };
  return data.options;
};
