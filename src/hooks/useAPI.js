import { useEffect, useState } from "react";

import { cardsRunes } from "../apiData/cardsRunes";
import { items } from "../apiData/items";
import { pickups } from "../apiData/pickups";
import { pills } from "../apiData/pills";
import { transformations } from "../apiData/transformations";
import { trinkets } from "../apiData/trinkets";

const apiResourceToDataTrans = {
  "cards-runes": cardsRunes,
  items: items,
  pickups: pickups,
  pills: pills,
  transformations: transformations,
  trinkets: trinkets,
};

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

      setStatus("loading");

      let data = null;
      if (resource === "pickups") {
        const magicGroupIds = [
          41, 50, 60, 360, 51, 53, 52, 54, 55, 56, 57, 58, 390,
        ];
        data = [];

        Object.values(apiResourceToDataTrans[resource]).forEach((pickups) => {
          if (magicGroupIds.includes(pickups.groupId)) {
            data.push(pickups);
          } else {
            data = [...data, ...Object.values(pickups)];
          }
        });
      } else {
        data = Object.values(apiResourceToDataTrans[resource]);
      }

      if (resource === "transformations") {
        data.forEach((transformation) => {
          if (!("id" in transformation)) {
            transformation.id = 14;
          }
        });
      }

      setContent(data);
      setStatus("loaded");
    };

    const typeStateTrans = {
      przedmioty: "items",
      trinkety: "trinkets",
      pigułki: "pills",
      "karty/runy": "cards-runes",
      transformacje: "transformations",
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
