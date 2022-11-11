import parse from "html-react-parser";
import {
  itemDescriptionData,
  itemImageData,
  itemUnlockData,
  poolOrder,
} from "../../../data/itemData";
import "./Description.css";

function ItemDescription({
  itemPools,
  itemTransformationImageData,
  selectedContent,
  popup,
}) {
  // #region PARSING FUNCTIONS
  const parseDescription = (itemId) => {
    const characterLimit = 800;

    const desc = itemDescriptionData[itemId];
    const paragraphs = desc.split("\n");
    const textArray = [];
    let firstLiYetToGet = true;
    let thereAreLis = false;
    let firstLi;
    let lastLi;

    //   convert * to <li>s
    for (const [idx, p] of paragraphs.entries()) {
      if (p.startsWith("* ")) {
        thereAreLis = true;

        textArray.push(`<li>${p.replace("* ", "")}</li>`);

        if (firstLiYetToGet) {
          firstLi = idx;
          firstLiYetToGet = false;
        }
        lastLi = idx;
      } else {
        textArray.push(`<p class="obj-desc">${p}</p>`);
      }
    }

    if (thereAreLis) {
      textArray.splice(firstLi, 0, '<ul class="obj-desc p-0">');
      textArray.splice(lastLi + 2, 0, "</ul>");
    }

    let text;
    // if desc isn't in popup, cut down to 600 characters
    if (!popup) {
      let characterCount = 0;
      const cutTextArray = [];
      for (const textFrag of textArray) {
        characterCount += textFrag.length;

        if (characterCount <= characterLimit) {
          cutTextArray.push(textFrag);
        } else {
          break;
        }
      }

      if (cutTextArray.length !== textArray.length) {
        cutTextArray.push(
          '<p class="obj-desc-short">Naciśnij na ikonę przedmiotu, żeby zobaczyć pełny opis.</p>'
        );
      }

      text = cutTextArray.join("");
    } else {
      text = textArray.join("");
    }

    // convert ** to <em></em>
    text = text.replace(/\*\*(.*?)\*\*/g, "<em>$1</em>");

    return text;
  };

  const parseRechargeTime = (rechargeTimeToParse) => {
    const rechargeTimeTrans = {
      unlimited: "nielimitowany",
      "one time use": "jednorazowego użytku",
      other: "inny",
    };

    if (Number.isInteger(rechargeTimeToParse.amount)) {
      if (rechargeTimeToParse.unit === "rooms") {
        return rechargeTimeToParse.amount;
      } else {
        return `${rechargeTimeToParse.amount} s`;
      }
    } else {
      return rechargeTimeTrans[rechargeTimeToParse.amount];
    }
  };

  const parsePools = (poolsToParse) => {
    const pools = [];
    for (const poolType in poolsToParse) {
      switch (poolType) {
        case "normal":
        case "beggars":
        case "chests":
        case "other":
          pools.push(...poolsToParse[poolType]);
          break;
        case "greedMode":
          pools.push(...poolsToParse.greedMode.map((pool) => `Greed ${pool}`));
          break;
        case "miniBoss":
          pools.push("mini-boss");
          break;
        case "startingItem":
          pools.push("starting item");
          break;
        case "boss":
          if (poolsToParse.boss.includes("Bumbino")) {
            pools.push("Bumbino");
          }

          if (poolsToParse.boss.filter((el) => el !== "Bumbino").length !== 0) {
            pools.push("boss");
          }
          break;
        case "obstacles":
          pools.push(poolType);
          break;
        case "machines":
          if (poolsToParse["machines"].includes("Crane Game")) {
            pools.push("Crane Game");
          }

          const machinesWithoutCraneGame = poolsToParse["machines"].filter(
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

    pools.sort((a, b) => poolOrder.indexOf(a) - poolOrder.indexOf(b));
    return pools;
  };

  const parseUnlock = (unlockToParse) => {
    const nonDeclinable = [
      "???",
      "The Lamb",
      "Delirium",
      "Mother",
      "The Beast",
      "Mom's Heart",
      "Mom's Heart/It Lives!",
      "Baby Plum",
    ];
    const bossTrans = {
      Angel: "Anioła",
      all: "wszystkich bossów",
      "all Harbingers": "wszystkich Jeźdźców Apokalipsy",
      "all 7 Deadly Sins": "wszystkich 7 Grzechów Głównych",
      Mom: "Mamy",
      "a Harbinger": "Jeźdźca Apokalipsy",
    };

    let unlockString;
    switch (unlockToParse.method) {
      case "boss":
        unlockString = "pokonanie ";

        let bossName = unlockToParse.boss;
        if (bossName in bossTrans) {
          bossName = bossTrans[bossName];
        }
        unlockString += bossName.replace("Satan", "Szatan");

        // add genitival -a
        if (
          !(unlockToParse.boss in bossTrans) &&
          !nonDeclinable.includes(bossName)
        ) {
          unlockString += "a";
        }

        if ("character" in unlockToParse) {
          let characterName = unlockToParse.character;

          if (characterName === "all") {
            characterName = "wszystkie postaci";
          } else if (characterName === "all non-tainted") {
            characterName = "wszystkie niesplamione postaci";
          }

          unlockString += ` jako ${characterName}`;
        }

        if ("numberOfTimes" in unlockToParse) {
          unlockString += ` ${unlockToParse.numberOfTimes} razy`;
        }

        if (unlockToParse.mode === "Hard Mode") {
          unlockString += " na Hard Modzie";
        }

        break;
      case "challenge":
        unlockString = `przejście wyzwania #${unlockToParse.challengeNumber}: ${unlockToParse.challengeName}`;
        break;
      case "other":
        unlockString = itemUnlockData[selectedContent.id];
        break;
      case "Donation Machine":
      case "Greed Donation Machine":
        unlockString = `wpłacenie ${unlockToParse.amount} monet do ${unlockToParse.method}`;
        break;
      default:
        throw new Error(`Unknown unlock method: ${unlockToParse.method}`);
    }

    return unlockString;
  };
  //   #endregion

  return (
    <div className="text-center mt-2 text-light desc-container">
      {popup && (
        <img
          src={`data:image/png;base64,${itemImageData[selectedContent.id]}`}
          alt=""
        />
      )}
      <p className="fs-5 obj-name">
        {/* sometimes show wrong name for Monster Manua/el */}
        <u>
          {selectedContent.name === "Monster Manual"
            ? Math.floor(Math.random() * 10) >= 6
              ? "Monster Manuel"
              : "Monster Manual"
            : selectedContent.name}
        </u>
      </p>
      {selectedContent.quote && (
        <p className="obj-quote">"{selectedContent.quote}"</p>
      )}
      <hr />
      {parse(parseDescription(selectedContent.id))}
      <hr />
      <p className="mb-1 obj-prop">
        <span className="obj-info">Id:</span> {selectedContent.id}
      </p>
      {selectedContent.quality !== undefined && (
        <p className="mb-1 obj-prop">
          <span className="obj-info">Jakość: </span>
          {selectedContent.quality}
        </p>
      )}
      <p className="mb-1 obj-prop">
        <span className="obj-info">Typ: </span>
        {selectedContent.type === "active" ? "aktywny" : "pasywny"}
      </p>
      {selectedContent.type === "active" && (
        <p className="mb-1 obj-prop">
          <span className="obj-info">Czas ładowania: </span>
          {parseRechargeTime(selectedContent.rechargeTime)}
        </p>
      )}
      <p>
        <span className="obj-info">Pula: </span>
        {parsePools(selectedContent.pool).map((pool, poolIdx) => (
          <img
            key={poolIdx}
            src={`data:image/webp;base64,${
              itemPools.filter(([poolName, _]) => poolName === pool)[0][1]
            }`}
            alt=""
            className="me-1"
          />
        ))}
      </p>
      {selectedContent.transformation && (
        <p>
          <span className="obj-info">Transformacja: </span>
          {selectedContent.transformation.map((trans, transIdx) => (
            <img
              key={transIdx}
              src={`data:image/png;base64,${
                itemTransformationImageData.filter(
                  ([transName, _]) => transName === trans
                )[0][1]
              }`}
              alt=""
            />
          ))}
        </p>
      )}
      {"unlock" in selectedContent && (
        <p className="obj-prop">
          <span className="obj-info">Sposób odblokowania: </span> <br />
          {parseUnlock(selectedContent.unlock)}
        </p>
      )}
    </div>
  );
}

export default ItemDescription;
