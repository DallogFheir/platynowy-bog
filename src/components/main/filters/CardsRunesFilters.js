import {
  cardsRunesTypes,
  cardsRunesUnlockMethods,
} from "../../../data/cardsRunesData";
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
  const unlockMethodsHoverInfo = {
    challenge: "wyzwanie",
    other: "inne sposoby",
    "Boss Rush/Hush": "Boss Rush + Hush",
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
      <div>
        <span className="filter-name">Sposób odblokowania:</span>
        {cardsRunesUnlockMethods.map(
          ([unlockMethodName, unlockMethodImage], unlockMethodIdx) => (
            <img
              key={unlockMethodIdx}
              className={[
                "ms-2",
                "mt-1",
                "clickable",
                cardRuneUnlockMethodFilter === unlockMethodName
                  ? ""
                  : "unselected",
                unlockMethodName in unlockMethodsHoverInfo ? "pool-info" : "",
              ]
                .join(" ")
                .trim()}
              src={`data:image/png;base64,${unlockMethodImage}`}
              alt=""
              title={unlockMethodsHoverInfo[unlockMethodName]}
              onClick={() => {
                if (cardRuneUnlockMethodFilter === unlockMethodName) {
                  setCardRuneUnlockMethodFilter(null);
                } else {
                  setCardRuneUnlockMethodFilter(unlockMethodName);
                }
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default CardsRunesFilters;
