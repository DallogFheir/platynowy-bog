import { useState, useEffect, useCallback } from "react";

function useAPI(resource, typeState) {
  const [status, setStatus] = useState("loading");
  const [content, setContent] = useState(null);

  const fetchResource = useCallback(async () => {
    //   only fetch if status is not loaded
    if (status !== "loaded") {
      try {
        const res = await fetch(`http://localhost:5000/api/${resource}`);

        if (res.ok) {
          const data = await res.json();
          setContent(data);
          setStatus("loaded");
        } else {
          setStatus("failed");
        }
      } catch (e) {
        setStatus("failed");
      }
    }
  }, [resource, status]);

  //   retry fetching if type state changes to current resource
  useEffect(() => {
    const typeStateTrans = {
      przedmioty: "items",
    };

    if (typeStateTrans[typeState] === resource) {
      fetchResource();
    }
  }, [resource, fetchResource, typeState]);

  return [content, status];
}

export default useAPI;
