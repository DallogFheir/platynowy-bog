import { trinketUnlockMethods } from "../../../data/trinketData";
import "./Filters.css";

function TrinketFilters({
  trinketUnlockMethodFilter,
  setTrinketUnlockMethodFilter,
  trinketSetDropFilter,
  setTrinketSetDropFilter,
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
        {trinketUnlockMethods.map(
          ([unlockMethodName, unlockMethodImage], unlockMethodIdx) => (
            <img
              key={unlockMethodIdx}
              className={[
                "ms-2",
                "mt-1",
                "clickable",
                trinketUnlockMethodFilter === unlockMethodName
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
                if (trinketUnlockMethodFilter === unlockMethodName) {
                  setTrinketUnlockMethodFilter(null);
                } else {
                  setTrinketUnlockMethodFilter(unlockMethodName);
                }
              }}
            />
          )
        )}
      </div>
      <div className="mt-2">
        <span className="filter-name">Ustalony drop:</span>
        <button
          className={[
            "btn",
            "ms-2",
            "mt-1",
            !trinketSetDropFilter ? "btn-light" : "btn-secondary",
          ]
            .join(" ")
            .trim()}
          type="button"
          onClick={() => {
            setTrinketSetDropFilter((prev) => !prev);
          }}
        >
          tak
        </button>
      </div>
    </div>
  );
}

export default TrinketFilters;
