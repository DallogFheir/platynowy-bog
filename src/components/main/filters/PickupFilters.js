import { pickupUnlockMethods, pickupTypes } from "../../../data/pickupData";
import "./Filters.css";

function TrinketFilters({
  pickupTypeFilter,
  setPickupTypeFilter,
  pickupUnlockMethodFilter,
  setPickupUnlockMethodFilter,
}) {
  const unlockMethodsHoverInfo = {
    boss: "boss(y)",
    challenge: "wyzwanie",
    other: "inne sposoby",
  };

  const typeHoverInfo = {
    heart: "serca",
    coin: "monety",
    key: "klucze",
    bomb: "bomby",
    battery: "baterie",
    chest: "skrzynki",
    sack: "sakiewki",
  };

  return (
    <div>
      <div>
        <span className="filter-name">Typ:</span>
        {pickupTypes.map(([typeName, typeImage], typeIdx) => (
          <img
            key={typeIdx}
            className={[
              "ms-2",
              "mt-1",
              "clickable",
              pickupTypeFilter === typeName ? "" : "unselected",
              "pool-info",
            ]
              .join(" ")
              .trim()}
            src={`data:image/png;base64,${typeImage}`}
            alt=""
            title={typeHoverInfo[typeName]}
            onClick={() => {
              if (pickupTypeFilter === typeName) {
                setPickupTypeFilter(null);
              } else {
                setPickupTypeFilter(typeName);
              }
            }}
          />
        ))}
      </div>
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
