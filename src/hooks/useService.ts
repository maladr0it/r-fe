import { useReducer, useEffect } from "react";

interface ServiceState<T> {
  status: "idle" | "loading" | "error";
  data: T | null;
}

type ServiceAction<T> =
  | {
      type: "request_started";
    }
  | {
      type: "request_succeeded";
      data: T;
    }
  | {
      type: "request_failed";
    };

type Service<T> = () => Promise<T>;

const serviceReducer = <T>(
  state: ServiceState<T>,
  action: ServiceAction<T>,
): ServiceState<T> => {
  switch (action.type) {
    case "request_started": {
      return { ...state, status: "loading" };
    }
    case "request_succeeded": {
      return { ...state, status: "idle", data: action.data };
    }
    case "request_failed": {
      return { ...state, status: "error" };
    }
  }
};

export const useService = <T>(service: Service<T>) => {
  const [state, dispatch] = useReducer<
    (state: ServiceState<T>, action: ServiceAction<T>) => ServiceState<T>
  >(serviceReducer, {
    status: "idle",
    data: null,
  });

  useEffect(() => {
    let cancelled = false;

    const callService = async () => {
      try {
        dispatch({ type: "request_started" });
        const data = await service();
        if (!cancelled) {
          dispatch({ type: "request_succeeded", data });
        }
      } catch {
        if (!cancelled) {
          dispatch({ type: "request_failed" });
        }
      }
    };

    callService();

    return () => {
      cancelled = true;
    };
  }, [service]);

  return state;
};
