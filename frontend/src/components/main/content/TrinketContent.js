import "./Content.css";
import { trinketImageData, trinketColorData } from "../../../data/trinketData";
import { itemImageData } from "../../../data/itemData";

function TrinketContent({
  sortOption,
  filterOption,
  nameFilter,
  trinketUnlockMethodFilter,
  trinketSetDropFilter,
  trinketsStatus,
  trinketsContent,
  setSelectedContent,
  colors,
  popup,
  setPopup,
}) {
  const filterTrinkets = (trinket) => {
    //   NAMES & QUOTES
    const nameLower = trinket.name.toLowerCase().replace(/[.']/g, "");
    const quoteLower = trinket.quote.toLowerCase().replace(/[.']/g, "");
    const nameFilterLower = nameFilter?.toLowerCase().replace(/[.']/g, "");

    const nameCondition =
      nameFilter === null
        ? true
        : nameLower.includes(nameFilterLower) ||
          quoteLower.includes(nameFilterLower);

    // UNLOCK METHOD
    const unlockMethodCondition =
      trinketUnlockMethodFilter === null
        ? true
        : "unlock" in trinket &&
          trinket.unlock.method === trinketUnlockMethodFilter;

    // SET DROP
    const setDropCondition = trinketSetDropFilter ? "setDrop" in trinket : true;

    return [nameCondition, unlockMethodCondition, setDropCondition].every(
      (condition) => condition
    );
  };

  return (
    <>
      {(() => {
        switch (trinketsStatus) {
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
                {trinketsContent
                  .sort(
                    sortOption === "wg ID"
                      ? (a, b) => a.id - b.id
                      : (a, b) => {
                          //   sort by color first, then by ID
                          const colorSort =
                            colors.indexOf(trinketColorData[a.id]) -
                            colors.indexOf(trinketColorData[b.id]);

                          return colorSort === 0 ? a.id - b.id : colorSort;
                        }
                  )
                  .filter(filterOption === "usuń" ? filterTrinkets : () => true)
                  .map((trinket, trinketIdx) => (
                    <img
                      key={trinketIdx}
                      src={`data:image/png;base64,${
                        trinketImageData[trinket.id]
                      }`}
                      alt=""
                      className={[
                        "me-1",
                        "clickable",
                        !filterTrinkets(trinket) ? "unselected" : "",
                      ].join(" ")}
                      onMouseOver={() => {
                        setSelectedContent(trinket);
                      }}
                      onMouseOut={() => {
                        //   only set selected back to null if popup is not up
                        // otherwise it will trigger
                        !popup && setSelectedContent(null);
                      }}
                      onClick={() => {
                        setSelectedContent(trinket);
                        setPopup(true);
                      }}
                    />
                  ))}
              </div>
            );
          default:
            throw new Error("Status is not loading, failed or loaded.");
        }
      })()}
    </>
  );
}

export default TrinketContent;
