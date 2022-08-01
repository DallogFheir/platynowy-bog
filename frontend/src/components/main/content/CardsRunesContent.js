import "./Content.css";
import {
  cardsRunesImageData,
  cardsRunesColorData,
} from "../../../data/cardsRunesData";
import { itemImageData } from "../../../data/itemData";

function CardsRunesContent({
  sortOption,
  filterOption,
  nameFilter,
  cardRuneTypeFilter,
  cardRuneUnlockMethodFilter,
  cardsRunesStatus,
  cardsRunesContent,
  setSelectedContent,
  colors,
  popup,
  setPopup,
}) {
  const filterCardsRunes = (cardRune) => {
    // NAMES & QUOTES
    const nameLower = cardRune.name.toLowerCase().replace(/[.']/g, "");
    const quoteLower = cardRune.quote.toLowerCase().replace(/[.']/g, "");
    const nameFilterLower = nameFilter?.toLowerCase().replace(/[.']/g, "");

    const nameCondition =
      nameFilter === null
        ? true
        : nameLower.includes(nameFilterLower) ||
          quoteLower.includes(nameFilterLower);

    // TYPES
    let type = cardRune.type;

    const otherCardTrans = [
      "credit card",
      "chance card",
      "Card Against Humanity",
      "Holy Card",
      "uno",
    ];
    if (otherCardTrans.includes(type)) {
      type = "other card";
    }

    const otherTrans = ["Dice Shard", "Emergency Contact", "Cracked Key"];
    if (otherTrans.includes(type)) {
      type = "other";
    }

    const typeCondition =
      cardRuneTypeFilter === null ? true : type === cardRuneTypeFilter;

    return [nameCondition, typeCondition].every((condition) => condition);
  };

  return (
    <>
      {(() => {
        switch (cardsRunesStatus) {
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
                {cardsRunesContent
                  .sort(
                    sortOption === "wg ID"
                      ? (a, b) => a.id - b.id
                      : (a, b) => {
                          //   sort by color first, then by ID
                          const colorSort =
                            colors.indexOf(cardsRunesColorData[a.id]) -
                            colors.indexOf(cardsRunesColorData[b.id]);

                          return colorSort === 0 ? a.id - b.id : colorSort;
                        }
                  )
                  .filter(
                    filterOption === "usuń" ? filterCardsRunes : () => true
                  )
                  .map((cardRune, cardRuneIdx) => (
                    <img
                      key={cardRuneIdx}
                      src={`data:image/png;base64,${
                        cardsRunesImageData[cardRune.id]
                      }`}
                      alt=""
                      className={[
                        "me-1",
                        "clickable",
                        !filterCardsRunes(cardRune) ? "unselected" : "",
                      ]
                        .join(" ")
                        .trim()}
                      onMouseOver={() => {
                        setSelectedContent(cardRune);
                      }}
                      onMouseOut={() => {
                        //   only set selected back to null if popup is not up
                        // otherwise it will trigger
                        !popup && setSelectedContent(null);
                      }}
                      onClick={() => {
                        setSelectedContent(cardRune);
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

export default CardsRunesContent;
