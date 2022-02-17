import { pickupUnlockMethods } from "../../../data/pickupData";
import "./Filters.css";

function TrinketFilters({
  pickupUnlockMethodFilter,
  setPickupUnlockMethodFilter,
}) {
  const unlockMethodsHoverInfo = {
    boss: "boss(y)",
    challenge: "wyzwanie",
    other: "inne sposoby",
  };

  return (
    <div>
      <div>
        <span className="filter-name">Sposób odblokowania:</span>
        {pickupUnlockMethods.map(
          ([unlockMethodName, unlockMethodImage], unlockMethodIdx) => (
            <img
              key={unlockMethodIdx}
              className={[
                "ms-2",
                "mt-1",
                "clickable",
                pickupUnlockMethodFilter === unlockMethodName
                  ? ""
                  : "unselected",
                "pool-info",
              ]
                .join(" ")
                .trim()}
              src={`data:image/png;base64,${unlockMethodImage}`}
              alt=""
              title={unlockMethodsHoverInfo[unlockMethodName]}
              onClick={() => {
                if (pickupUnlockMethodFilter === unlockMethodName) {
                  setPickupUnlockMethodFilter(null);
                } else {
                  setPickupUnlockMethodFilter(unlockMethodName);
                }
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default TrinketFilters;
