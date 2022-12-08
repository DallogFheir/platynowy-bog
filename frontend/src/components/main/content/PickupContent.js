import "./Content.css";
import { pickupImageData, pickupColorData } from "../../../data/pickupData";
import { itemImageData } from "../../../data/itemData";

function PickupContent({
  sortOption,
  filterOption,
  nameFilter,
  pickupTypeFilter,
  pickupUnlockMethodFilter,
  pickupsStatus,
  pickupsContent,
  setSelectedContent,
  colors,
  popup,
  setPopup,
}) {
  const filterPickups = (pickup) => {
    //   NAMES & QUOTES
    const nameLower = pickup.name.toLowerCase().replace(/[.']/g, "");
    const quoteLower =
      "quote" in pickup ? pickup.quote.toLowerCase().replace(/[.']/g, "") : "";
    const nameFilterLower = nameFilter?.toLowerCase().replace(/[.']/g, "");

    const nameCondition =
      nameFilter === null
        ? true
        : nameLower.includes(nameFilterLower) ||
          quoteLower.includes(nameFilterLower);

    // TYPE
    const typeTrans = {
      10: "heart",
      20: "coin",
      30: "key",
      40: "bomb",
      41: "bomb",
      42: "bomb",
      90: "battery",
    };

    const typeCondition =
      pickupTypeFilter === null
        ? true
        : typeTrans[pickup.groupId] === pickupTypeFilter;

    // UNLOCK METHOD
    const unlockMethodCondition =
      pickupUnlockMethodFilter === null
        ? true
        : "unlock" in pickup &&
          pickup.unlock.method === pickupUnlockMethodFilter;

    return [nameCondition, unlockMethodCondition, typeCondition].every(
      (condition) => condition
    );
  };

  return (
    <>
      {(() => {
        switch (pickupsStatus) {
          case "start":
          case "loading":
            return (
              <p className="text-center mt-2 fs-5">
                <img
                  src={`data:image/png;base64,${itemImageData[66]}`}
                  alt=""
                />
                <span className="ms-2 me-2">Wczytywanie danych...</span>
                <img
                  src={`data:image/png;base64,${itemImageData[66]}`}
                  alt=""
                />
              </p>
            );
          case "failed":
            return (
              <p className="text-center mt-2 fs-5">
                <img
                  src={`data:image/png;base64,${itemImageData[729]}`}
                  alt=""
                />
                <span className="ms-2 me-2">Nie udało się wczytać danych</span>
                <img
                  src={`data:image/png;base64,${itemImageData[729]}`}
                  alt=""
                />
              </p>
            );
          case "loaded":
            return (
              <div>
                {pickupsContent
                  .sort(
                    sortOption === "wg ID"
                      ? (a, b) => {
                          return a.groupId === b.groupId
                            ? a.id - b.id
                            : a.groupId - b.groupId;
                        }
                      : (a, b) => {
                          //   sort by color first, then by ID
                          const colorSort =
                            colors.indexOf(pickupColorData[a.groupId][a.id]) -
                            colors.indexOf(pickupColorData[b.groupId][b.id]);

                          return colorSort === 0
                            ? a.groupId === b.groupID
                              ? a.id - b.id
                              : a.groupID - b.groupID
                            : colorSort;
                        }
                  )
                  .filter(filterOption === "usuń" ? filterPickups : () => true)
                  .map((pickup, pickupIdx) => {
                    console.log(pickup);
                    return (
                      <img
                        key={pickupIdx}
                        src={`data:image/png;base64,${
                          pickupImageData[pickup.groupId][
                            pickup.id === undefined ? 0 : pickup.id
                          ]
                        }`}
                        alt=""
                        className={[
                          "me-1",
                          "clickable",
                          !filterPickups(pickup) ? "unselected" : "",
                        ]
                          .join(" ")
                          .trim()}
                        onMouseOver={() => {
                          setSelectedContent(pickup);
                        }}
                        onMouseOut={() => {
                          //   only set selected back to null if popup is not up
                          // otherwise it will trigger
                          !popup && setSelectedContent(null);
                        }}
                        onClick={() => {
                          setSelectedContent(pickup);
                          setPopup(true);
                        }}
                      />
                    );
                  })}
              </div>
            );
          default:
            throw new Error("Status is not loading, failed or loaded.");
        }
      })()}
    </>
  );
}

export default PickupContent;
