import { cardsRunesTypes } from "../../../data/cardsRunesData";
import "./Filters.css";

function CardsRunesFilters({
  cardRuneTypeFilter,
  setCardRuneTypeFilter,
  cardRuneUnlockMethodFilter,
  setCardRuneUnlockMethodFilter,
}) {
  const cardsRunesTypeHoverInfo = {
    "other card": "inne karty",
    "other rune": "inne runy",
    "Soul Stone": "Soul Stone'y",
    other: "inne",
  };

  return (
    <div>
      <div className="mt-2">
        <span className="filter-name">Typ: </span>
        {cardsRunesTypes.map(
          ([cardsRunesType, cardsRunesTypeImage], cardsRunesTypeIdx) => (
            <img
              key={cardsRunesTypeIdx}
              className={[
                "ms-2",
                "mt-1",
                "clickable",
                cardRuneTypeFilter === cardsRunesType ? "" : "unselected",
                cardsRunesType in cardsRunesTypeHoverInfo ? "pool-info" : "",
              ]
                .join(" ")
                .trim()}
              src={`data:image/png;base64,${cardsRunesTypeImage}`}
              alt=""
              title={cardsRunesTypeHoverInfo[cardsRunesType]}
              onClick={() => {
                if (cardRuneTypeFilter === cardsRunesType) {
                  setCardRuneTypeFilter(null);
                } else {
                  setCardRuneTypeFilter(cardsRunesType);
                }
              }}
            />
          )
        )}
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
}

export default CardsRunesFilters;
