import { useMemo } from "react";
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
  itemTransformationFilter,
  itemCharacterFilter,
  itemBossFilter,
  itemUnlockMethodFilter,
  itemsStatus,
  itemsContent,
  colors,
  setSelectedContent,
  popup,
  setPopup,
}) {
  const dInfinitySprite = useMemo(
    () => dInfinitySprites[Math.floor(Math.random() * dInfinitySprites.length)],
    []
  );

  const filterItems = (item) => {
    // NAMES & QUOTES
    const birthrightQuotes = [
      "???",
      "More options",
      "Limit breaker + HP up",
      "Better arcades + luck up",
      "Belial incarnate",
      "Stronger spirit",
      "Forever cursed",
      "Rage up",
      "Wide breath",
      "Come back stronger",
      "Temporary DMG up",
      "Better destiny",
      "Offensive formation",
      "Coin up",
      "Regurgitate",
      "Unchained",
      "Conserve your faith",
      "What's yours is mine",
      "Inventory up",
      "HP up!",
      "Salvage",
      "Extended darkness",
      "Poop up",
      "Coagulate",
      "Unstoppable force",
      "Stronger sneeze",
      "Superposition",
      "Eternal",
      "Extra life",
      "Conjoined",
      "Money money money",
      "Torment",
      "Recall",
      "Artifact",
      "It's not yours",
    ];

    // ignore apostrophes and dots
    const nameLower = item.name.toLowerCase().replace(/[.']/g, "");
    const quoteLower = item.quote.toLowerCase().replace(/[.']/g, "");
    const nameFilterLower = nameFilter?.toLowerCase().replace(/[.']/g, "");
    const nameCondition =
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
        case "greedMode":
          pools.push(...item.pool.greedMode.map((pool) => `Greed ${pool}`));
          break;
        case "miniBoss":
          pools.push("mini-boss");
          break;
        case "startingItem":
          pools.push("starting item");
          break;
        case "boss":
          if (item.pool.boss.includes("Bumbino")) {
            pools.push("Bumbino");
          }

          if (item.pool.boss.filter((el) => el !== "Bumbino").length !== 0) {
            pools.push("boss");
          }
          break;
        case "obstacles":
          pools.push("obstacles");
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

    // TRANSFORMATIONS
    const transformationCondition =
      itemTransformationFilter === null
        ? true
        : "transformation" in item
        ? item.transformation.includes(itemTransformationFilter)
        : false;

    // CHARACTER TO UNLOCK ITEM
    const characterCondition =
      itemCharacterFilter === null
        ? true
        : "unlock" in item && "character" in item.unlock
        ? item.unlock.character === itemCharacterFilter
        : false;

    // BOSS TO UNLOCK ITEM
    let bossCondition;
    if (itemBossFilter === null) {
      bossCondition = true;
    } else {
      if ("unlock" in item && "boss" in item.unlock) {
        let bossName = item.unlock.boss;

        // end bosses
        if (
          [
            "Mom's Heart",
            "Mom's Heart/It Lives!",
            "Isaac",
            "???",
            "Satan",
            "The Lamb",
            "Boss Rush",
            "Hush",
            "Mega Satan",
            "Delirium",
            "Mother",
            "The Beast",
            "Ultra Greed",
            "Ultra Greedier",
          ].includes(bossName)
        ) {
          // translate Mom's Heart to Mom's Heart/It Lives!
          if (bossName === "Mom's Heart") {
            bossName = "Mom's Heart/It Lives!";
          }

          bossCondition = itemBossFilter === bossName;
        } else {
          // boss other than end bosses
          bossCondition = itemBossFilter === "other";
        }
      } else {
        bossCondition = false;
      }
    }

    // OTHER UNLOCK METHOD
    const unlockMethodCondition =
      itemUnlockMethodFilter === null
        ? true
        : "unlock" in item &&
          item.unlock.method.replace("Greed ", "") === itemUnlockMethodFilter;

    return [
      nameCondition,
      typeCondition,
      qualityCondition,
      rechargeCondition,
      poolCondition,
      transformationCondition,
      characterCondition,
      bossCondition,
      unlockMethodCondition,
    ].every((condition) => condition);
  };

  return (
    <>
      {(() => {
        switch (itemsStatus) {
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
                {itemsContent
                  .sort(
                    sortOption === "wg ID"
                      ? (a, b) => a.id - b.id
                      : (a, b) => {
                          //   sort by color first, then by ID
                          const colorSort =
                            colors.indexOf(itemColorData[a.id]) -
                            colors.indexOf(itemColorData[b.id]);

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
                          ? `data:image/png;base64,${dInfinitySprite}`
                          : `data:image/png;base64,${itemImageData[item.id]}`
                      }
                      alt=""
                      className={[
                        "me-1",
                        "clickable",
                        !filterItems(item) ? "unselected" : "",
                        item.name === "Dark Bum" ? "dark-bum" : "",
                      ]
                        .join(" ")
                        .trim()}
                      onMouseOver={() => {
                        setSelectedContent(item);
                      }}
                      onMouseOut={() => {
                        //   only set selected back to null if popup is not up
                        // otherwise it will trigger
                        !popup && setSelectedContent(null);
                      }}
                      onClick={() => {
                        setSelectedContent(item);
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

export default ItemContent;
