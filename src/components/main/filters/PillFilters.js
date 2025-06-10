import { pillUnlockMethods } from "../../../data/pillData";
import "./Filters.css";

function PillFilters({ pillUnlockMethodFilter, setPillUnlockMethodFilter }) {
  const unlockMethodsHoverInfo = {
    challenge: "wyzwanie",
    other: "inne sposoby",
  };

  return (
    <div>
      <div>
        <span className="filter-name">Sposób odblokowania:</span>
        {pillUnlockMethods.map(
          ([unlockMethodName, unlockMethodImage], unlockMethodIdx) => (
            <img
              key={unlockMethodIdx}
              className={[
                "ms-2",
                "mt-1",
                "clickable",
                pillUnlockMethodFilter === unlockMethodName ? "" : "unselected",
                "pool-info",
              ]
                .join(" ")
                .trim()}
              src={`data:image/png;base64,${unlockMethodImage}`}
              alt=""
              title={unlockMethodsHoverInfo[unlockMethodName]}
              onClick={() => {
                if (pillUnlockMethodFilter === unlockMethodName) {
                  setPillUnlockMethodFilter(null);
                } else {
                  setPillUnlockMethodFilter(unlockMethodName);
                }
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default PillFilters;
