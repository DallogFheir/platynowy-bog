import parse from "html-react-parser";
import {
  cardsRunesDescriptionData,
  cardsRunesImageData,
  cardsRunesUnlockData,
  cardsRunesTypeImages,
} from "../../../data/cardsRunesData";
import "./Description.css";

function CardsRunesDescription({ selectedContent, popup }) {
  // #region PARSING FUNCTIONS
  const parseDescription = (cardRuneId) => {
    const characterLimit = 800;

    const desc = cardsRunesDescriptionData[cardRuneId];
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
          '<p class="obj-desc-short">Naciśnij na ikonę trinketu, żeby zobaczyć pełny opis.</p>'
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
          unlockString += "Boss Rusha i Husha";
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
        unlockString = cardsRunesUnlockData[selectedContent.id];
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
          src={`data:image/png;base64,${
            cardsRunesImageData[selectedContent.id]
          }`}
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
      <p className="obj-prop">
        <span className="obj-info">Wygląd na ziemi: </span>
        <img
          src={
            "data:image/png;base64," +
            (cardsRunesTypeImages[selectedContent.type] === undefined
              ? cardsRunesImageData[selectedContent.id]
              : cardsRunesTypeImages[selectedContent.type])
          }
          alt=""
        />
      </p>
      {"unlock" in selectedContent && (
        <p className="obj-prop">
          <span className="obj-info">Sposób odblokowania: </span> <br />
          {parseUnlock(selectedContent.unlock)}
        </p>
      )}
    </div>
  );
}

export default CardsRunesDescription;
