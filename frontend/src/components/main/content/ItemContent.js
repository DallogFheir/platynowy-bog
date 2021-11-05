import "./Content.css";
import {
  itemImageData,
  itemColorData,
  dInfinitySprites,
} from "../../../data/itemData";

function ItemContent({
  sortOption,
  filterOption,
  nameFilter,
  itemTypeFilter,
  itemQualityFilter,
  itemRechargeFilter,
  itemPoolFilter,
  itemsStatus,
  itemsContent,
}) {
  const itemColors = [
    "multicolor",
    "white",
    "faded-white",
    "light-purple",
    "purple",
    "light-blue",
    "blue",
    "light-green",
    "green",
    "yellow",
    "gold",
    "orange",
    "pink",
    "red",
    "light-brown",
    "brown",
    "grey",
    "black",
  ];

  const filterItems = (item) => {
    // NAMES & QUOTES
    const birthrightQuotes = [
      "???",
      "More options",
      "Stronger spirit",
      "Rage up",
      "Forever cursed",
      "Wide breath",
      "Come back stronger",
      "Temporary DMG up",
      "Better destiny",
      "Unchained",
      "Conserve your faith",
      "What's yours is mine",
      "Inventory up",
      "HP up!",
      "Salvage",
      "Poop up",
      "Unstoppable force",
      "Stronger sneeze",
      "Eternal",
      "Extra life",
      "Money money money",
      "Recall",
    ];

    // ignore apostrophes and dots
    const nameLower = item.name.toLowerCase().replace(/[.']/g, "");
    const quoteLower = item.quote.toLowerCase().replace(/[.']/g, "");
    const nameFilterLower = nameFilter?.toLowerCase().replace(/[.']/g, "");
    const filterCondition =
      nameFilter === null
        ? true
        : nameLower.includes(nameFilterLower) ||
          quoteLower.includes(nameFilterLower) ||
          //   include Birthright quotes
          (item.name === "Birthright" &&
            birthrightQuotes.some((quote) =>
              quote.toLowerCase().includes(nameFilterLower)
            )) ||
          // include ManuEL for Monster Manual
          (item.name === "Monster Manual" &&
            "monster manuel".includes(nameFilterLower)) ||
          // include Humbling for Humbleing Bundle
          (item.name === "Humbleing Bundle" &&
            "humbling bundle".includes(nameFilterLower));

    // TYPE
    const typeTrans = {
      passive: "pasywny",
      active: "aktywny",
    };
    const typeCondition = itemTypeFilter.includes(typeTrans[item.type]);

    // QUALITY
    const qualityCondition = itemQualityFilter.includes(item.quality);

    // RECHARGE TIME
    let rechargeCondition;

    const rechargeTrans = {
      "one time use": "jednorazowego użytku",
      unlimited: "nielimitowany",
      other: "inny",
    };

    if (item.type === "active") {
      const rechargeTime = Number.isInteger(item.rechargeTime.amount)
        ? item.rechargeTime.unit === "rooms"
          ? item.rechargeTime.amount
          : "czasowy"
        : rechargeTrans[item.rechargeTime.amount];

      rechargeCondition = itemRechargeFilter.includes(rechargeTime);
    } else {
      rechargeCondition = true;
    }

    // POOLS
    const pools = [];
    for (const poolType in item.pool) {
      switch (poolType) {
        case "normal":
        case "beggars":
        case "chests":
        case "other":
          pools.push(...item.pool[poolType]);
          break;
        case "Greed Mode":
          pools.push(...item.pool["Greed Mode"].map((pool) => `Greed ${pool}`));
          break;
        case "mini-boss":
        case "boss":
        case "starting item":
        case "obstacles":
          pools.push(poolType);
          break;
        case "machines":
          if (item.pool["machines"].includes("Crane Game")) {
            pools.push("Crane Game");
          }

          const machinesWithoutCraneGame = item.pool["machines"].filter(
            (machine) => machine !== "Crane Game"
          );

          if (machinesWithoutCraneGame.length !== 0) {
            pools.push("machines");
          }
          break;
        default:
          throw new Error(`Pool is of unknown type: ${poolType}.`);
      }
    }

    const poolCondition = itemPoolFilter.some((pool) => pools.includes(pool));

    return [
      filterCondition,
      typeCondition,
      qualityCondition,
      rechargeCondition,
      poolCondition,
    ].every((condition) => condition);
  };

  return (
    <>
      {(() => {
        switch (itemsStatus) {
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
                {Object.values(itemsContent)
                  .sort(
                    sortOption === "wg ID"
                      ? (a, b) => a.id - b.id
                      : (a, b) => {
                          //   sort by color first, then by ID
                          const colorSort =
                            itemColors.indexOf(itemColorData[a.id]) -
                            itemColors.indexOf(itemColorData[b.id]);

                          return colorSort === 0 ? a.id - b.id : colorSort;
                        }
                  )
                  .filter(filterOption === "usuń" ? filterItems : () => true)
                  .map((item, itemIdx) => (
                    <img
                      key={itemIdx}
                      src={
                        //   random sprite for D Infinity
                        item.name === "D Infinity"
                          ? `data:image/png;base64,${
                              dInfinitySprites[
                                Math.floor(
                                  Math.random() * dInfinitySprites.length
                                )
                              ]
                            }`
                          : `data:image/png;base64,${itemImageData[item.id]}`
                      }
                      alt=""
                      className={[
                        "me-1",
                        "clickable",
                        !filterItems(item) ? "unselected" : "",
                        item.name === "Dark Bum" ? "dark-bum" : "",
                      ].join(" ")}
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

export default ItemContent;
