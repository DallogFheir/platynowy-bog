import parse from "html-react-parser";
import {
  trinketDescriptionData,
  trinketImageData,
  trinketUnlockData,
} from "../../../data/trinketData";
import "./Description.css";

function TrinketDescription({ selectedContent, popup }) {
  // #region PARSING FUNCTIONS
  const parseDescription = (itemId) => {
    const characterLimit = 800;

    const desc = trinketDescriptionData[itemId];
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
      textArray.splice(firstLi, 0, '<ul class="obj-desc">');
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

  const parseUnlock = (unlockToParse) => {
    const nonDeclinable = [
      "???",
      "The Lamb",
      "Delirium",
      "Mother",
      "The Beast",
      "Mom's Heart/It Lives!",
    ];

    let unlockString;
    switch (unlockToParse.method) {
      case "boss":
        unlockString = "pokonanie ";

        let bossName = unlockToParse.boss;

        if (bossName instanceof Array) {
          unlockString += "Isaaca, ???, Szatana i The Lamb";
        } else {
          unlockString += bossName.replace("Satan", "Szatan");

          // add genitival -a
          if (!nonDeclinable.includes(bossName)) {
            unlockString += "a";
          }
        }

        if ("character" in unlockToParse) {
          unlockString += ` jako ${unlockToParse.character}`;
        }
        break;
      case "challenge":
        unlockString = `przejście wyzwania #${unlockToParse.challengeNumber}: ${unlockToParse.challengeName}`;
        break;
      case "other":
        unlockString = trinketUnlockData[selectedContent.id];
        break;
      default:
        throw new Error(`Unknown unlock method: ${unlockToParse.method}`);
    }

    return unlockString;
  };

  const parseSetDrop = (setDropToParse) => {
    const dropTrans = {
      "starting trinket": "trinket startowy",
      polyp: "polipy",
      "Special Shopkeeper": "specjalni Shopkeeperzy",
      "after clearing 3 consecutive floors without taking damage":
        "po przejściu 3 pięter pod rząd bez otrzymania obrażeń",
      urn: "dzbany",
      mushroom: "grzyby",
      "Golden Poop": "Złote Kupy",
    };

    return setDropToParse
      .map((drop) => {
        if (drop in dropTrans) {
          return dropTrans[drop];
        }

        return drop;
      })
      .join(", ");
  };
  //   #endregion

  return (
    <div className="text-center mt-2 text-light desc-container">
      {popup && (
        <img
          src={`data:image/png;base64,${trinketImageData[selectedContent.id]}`}
          alt=""
        />
      )}
      <p className="fs-5 obj-name">
        <u>{selectedContent.name}</u>
      </p>
      <p className="obj-quote">"{selectedContent.quote}"</p>
      <hr />
      {parse(parseDescription(selectedContent.id))}
      <hr />
      <p className="mb-1 obj-prop">
        <span className="obj-info">Id:</span> {selectedContent.id}
      </p>
      {"setDrop" in selectedContent && (
        <p className="obj-prop">
          <span className="obj-info">Ustalony drop: </span> <br />
          {parseSetDrop(selectedContent.setDrop)}
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

export default TrinketDescription;
