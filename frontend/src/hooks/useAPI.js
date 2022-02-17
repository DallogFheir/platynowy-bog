import { useState, useEffect } from "react";

function useAPI(resource, typeState) {
  const [leftPage, setLeftPage] = useState(true);
  const [status, setStatus] = useState("start");
  const [content, setContent] = useState(null);

  //   whenever typeState changes, page was left
  useEffect(() => {
    setLeftPage(true);
  }, [typeState, setLeftPage]);

  useEffect(() => {
    const fetchResource = async () => {
      setLeftPage(false);

      try {
        setStatus("loading");
        const res = await fetch(`/api/${resource}`);

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
    };

    const typeStateTrans = {
      przedmioty: "items",
      trinkety: "trinkets",
      znajdźki: "pickups",
    };

    // retry fetching if page was left, fetching failed previously (or is first one), and resource is current
    if (
      leftPage &&
      (status === "failed" || status === "start") &&
      typeStateTrans[typeState] === resource
    ) {
      fetchResource();
    }
  }, [resource, typeState, leftPage, setLeftPage, status]);

  return [content, status];
}

export default useAPI;
