import { delay } from "./utils";

const API_URL = "http://localhost:4000/api";
// add fake latency to test loading states
const FAKE_LATENCY = 500;

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

type Results =
  | {
      status: "finished";
      duration: number;
      images: string[];
    }
  | {
      // asssume there is a 'running' status, and no results (images) are available at this point
      status: "running";
    };

export interface Job {
  id: string;
  label: string;
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
  results: Results;
}

export const getJobs = async () => {
  await delay(FAKE_LATENCY);
  const resp = await fetch(`${API_URL}/jobs`);

  // the /jobs api returns 'name' rather than 'label', unlike /job/:id
  // convert it to use 'label' for consistency
  // ideally this would be changed on the back-end
  const data = (await resp.json()) as { jobs: (Job & { name: string })[] };

  const result: Job[] = data.jobs.map((job) => {
    const { name, ...rest } = job;
    return { label: name, ...rest };
  });

  return result;
};

export const getJob = async (id: string) => {
  await delay(FAKE_LATENCY);
  const resp = await fetch(`${API_URL}/jobs/${id}`);
  const data = (await resp.json()) as Job;
  return data;
};

export const getSoftware = async () => {
  await delay(FAKE_LATENCY);
  const resp = await fetch(`${API_URL}/software`);
  const data = (await resp.json()) as { options: Software[] };
  return data.options;
};

export const getHardware = async () => {
  await delay(FAKE_LATENCY);
  const resp = await fetch(`${API_URL}/hardware`);
  const data = (await resp.json()) as { options: Hardware[] };
  return data.options;
};
