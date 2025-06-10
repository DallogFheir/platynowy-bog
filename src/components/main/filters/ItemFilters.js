import {
  itemCharacters,
  itemBosses,
  itemUnlockMethods,
} from "../../../data/itemData";
import { itemTransformationImageData } from "../../../data/transformationData";
import "./Filters.css";

function ItemFilters({
  itemTypeFilter,
  setItemTypeFilter,
  itemQualityFilter,
  setItemQualityFilter,
  itemRechargeFilter,
  setItemRechargeFilter,
  itemPoolFilter,
  setItemPoolFilter,
  itemTransformationFilter,
  setItemTransformationFilter,
  itemCharacterFilter,
  setItemCharacterFilter,
  itemBossFilter,
  setItemBossFilter,
  itemUnlockMethodFilter,
  setItemUnlockMethodFilter,
  itemTypes,
  itemQualities,
  itemRecharges,
  itemPools,
}) {
  const poolsHoverInfo = {
    "Ultra Secret Room": "Ultra Secret Room",
    "Baby Shop": "sklepy z Adoption Papers",
    "mini-boss": "mini-bossy",
    boss: "konkretny boss",
    Bumbino: "Bumbino po zebraniu 12 centów",
    obstacles: "przeszkody",
    machines: "inne maszyny",
    "starting item": "przedmioty startowe postaci",
    other: "inna",
  };
  const unlockMethodsHoverInfo = {
    challenge: "wyzwania",
    "Donation Machine": "wpłacanie do Donation Machine/Greed Donation Machine",
    other: "inne sposoby",
  };

  return (
    <div>
      <div>
        <span className="filter-name">Typ:</span>
        {itemTypes.map((type, typeIdx) => (
          <button
            key={typeIdx}
            className={[
              "btn",
              "ms-2",
              "mt-1",
              itemTypeFilter.includes(type) ? "btn-light" : "btn-secondary",
            ]
              .join(" ")
              .trim()}
            type="button"
            onClick={() => {
              if (itemTypeFilter.includes(type)) {
                setItemTypeFilter(itemTypeFilter.filter((el) => el !== type));
              } else {
                setItemTypeFilter([...itemTypeFilter, type]);
              }
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mt-2">
        <span className="filter-name">Jakość:</span>
        {itemQualities.map((quality, qualityIdx) => (
          <button
            key={qualityIdx}
            className={[
              "btn",
              "ms-2",
              "mt-1",
              itemQualityFilter.includes(quality)
                ? "btn-light"
                : "btn-secondary",
            ]
              .join(" ")
              .trim()}
            type="button"
            onClick={() => {
              if (itemQualityFilter.includes(quality)) {
                setItemQualityFilter(
                  itemQualityFilter.filter((el) => el !== quality)
                );
              } else {
                setItemQualityFilter([...itemQualityFilter, quality]);
              }
            }}
          >
            {quality}
          </button>
        ))}
        <button
          type="button"
          className="btn ms-2 mt-1 btn-success"
          onClick={() => {
            //   if not all selected, select all
            if (
              itemQualities.filter(
                (quality) => !itemQualityFilter.includes(quality)
              ).length !== 0
            ) {
              setItemQualityFilter([...itemQualities]);
            }
            //   otherwise select none
            else {
              setItemQualityFilter([]);
            }
          }}
        >
          wszystkie
        </button>
      </div>
      <div className="mt-2">
        <span className="filter-name">Czas ładowania:</span>
        {itemRecharges.map((recharge, rechargeIdx) => (
          <button
            key={rechargeIdx}
            className={[
              "btn",
              "ms-2",
              "mt-1",
              itemRechargeFilter.includes(recharge)
                ? "btn-light"
                : "btn-secondary",
            ]
              .join(" ")
              .trim()}
            type="button"
            onClick={() => {
              if (itemRechargeFilter.includes(recharge)) {
                setItemRechargeFilter(
                  itemRechargeFilter.filter((el) => el !== recharge)
                );
              } else {
                setItemRechargeFilter([...itemRechargeFilter, recharge]);
              }
            }}
          >
            {recharge}
          </button>
        ))}
        <button
          type="button"
          className="btn ms-2 mt-1 btn-success"
          onClick={() => {
            //   if not all selected, select all
            if (
              itemRecharges.filter(
                (recharge) => !itemRechargeFilter.includes(recharge)
              ).length !== 0
            ) {
              setItemRechargeFilter([...itemRecharges]);
            }
            //   otherwise select none
            else {
              setItemRechargeFilter([]);
            }
          }}
        >
          wszystkie
        </button>
      </div>
      <div className="mt-2">
        <span className="filter-name">Pula:</span>
        {itemPools.map(([poolName, poolImage], poolIdx) => (
          <img
            key={poolIdx}
            className={[
              "ms-2",
              "mt-1",
              "clickable",
              itemPoolFilter.includes(poolName) ? "" : "unselected",
              poolName in poolsHoverInfo ? "pool-info" : "",
            ]
              .join(" ")
              .trim()}
            src={`data:image/png;base64,${poolImage}`}
            alt=""
            title={poolName in poolsHoverInfo ? poolsHoverInfo[poolName] : ""}
            onClick={() => {
              if (itemPoolFilter.includes(poolName)) {
                setItemPoolFilter(
                  itemPoolFilter.filter((el) => el !== poolName)
                );
              } else {
                setItemPoolFilter([...itemPoolFilter, poolName]);
              }
            }}
          />
        ))}
        <button
          type="button"
          className="btn ms-2 mt-1 btn-success"
          onClick={() => {
            //   if not all selected, select all
            if (
              itemPools.filter(
                ([poolName, _]) => !itemPoolFilter.includes(poolName)
              ).length !== 0
            ) {
              setItemPoolFilter(itemPools.map(([poolName, _]) => poolName));
            }
            //   otherwise select none
            else {
              setItemPoolFilter([]);
            }
          }}
        >
          wszystkie
        </button>
      </div>
      <div className="mt-2">
        <span className="filter-name">Transformacja:</span>
        {itemTransformationImageData.map(
          ([transformationName, transformationImage], transformationIdx) => (
            <img
              key={transformationIdx}
              className={[
                "ms-2",
                "mt-1",
                "clickable",
                itemTransformationFilter === transformationName
                  ? ""
                  : "unselected",
              ]
                .join(" ")
                .trim()}
              src={`data:image/png;base64,${transformationImage}`}
              alt=""
              onClick={() => {
                if (itemTransformationFilter === transformationName) {
                  setItemTransformationFilter(null);
                } else {
                  setItemTransformationFilter(transformationName);
                }
              }}
            />
          )
        )}
      </div>
      <div className="mt-2">
        <span className="filter-name">Postać odblokowująca:</span>
        {itemCharacters.map(([characterName, characterImage], characterIdx) => (
          <img
            key={characterIdx}
            className={[
              "ms-2",
              "mt-1",
              "clickable",
              itemCharacterFilter === characterName ? "" : "unselected",
            ]
              .join(" ")
              .trim()}
            src={`data:image/png;base64,${characterImage}`}
            alt=""
            onClick={() => {
              if (itemCharacterFilter === characterName) {
                setItemCharacterFilter(null);
              } else {
                setItemCharacterFilter(characterName);
                setItemUnlockMethodFilter(null);
              }
            }}
          />
        ))}
      </div>
      <div className="mt-2">
        <span className="filter-name">Boss odblokowujący:</span>
        {itemBosses.map(([bossName, bossImage], bossIdx) => (
          <img
            key={bossIdx}
            className={[
              "ms-2",
              "mt-1",
              "clickable",
              itemBossFilter === bossName ? "" : "unselected",
              bossName === "other" ? "pool-info" : "",
            ]
              .join(" ")
              .trim()}
            src={`data:image/png;base64,${bossImage}`}
            alt=""
            title={bossName === "other" ? "inny" : ""}
            onClick={() => {
              if (itemBossFilter === bossName) {
                setItemBossFilter(null);
              } else {
                setItemBossFilter(bossName);
                setItemUnlockMethodFilter(null);
              }
            }}
          />
        ))}
      </div>
      <div className="mt-2">
        <span className="filter-name">Inny sposób odblokowania:</span>
        {itemUnlockMethods.map(
          ([unlockMethodName, unlockMethodImage], unlockMethodIdx) => (
            <img
              key={unlockMethodIdx}
              className={[
                "ms-2",
                "mt-1",
                "clickable",
                itemUnlockMethodFilter === unlockMethodName ? "" : "unselected",
                "pool-info",
              ]
                .join(" ")
                .trim()}
              src={`data:image/png;base64,${unlockMethodImage}`}
              alt=""
              title={unlockMethodsHoverInfo[unlockMethodName]}
              onClick={() => {
                if (itemUnlockMethodFilter === unlockMethodName) {
                  setItemUnlockMethodFilter(null);
                } else {
                  setItemUnlockMethodFilter(unlockMethodName);
                  setItemCharacterFilter(null);
                  setItemBossFilter(null);
                }
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ItemFilters;
