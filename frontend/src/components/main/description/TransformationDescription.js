import parse from "html-react-parser";
import {
  transformationDescriptionData,
  transformationImageData,
} from "../../../data/transformationData";
import { itemImageData } from "../../../data/itemData";
import { trinketImageData } from "../../../data/trinketData";
import "./Description.css";

function TransformationDescription({ selectedContent, popup }) {
  const parseDescription = (transformationId) => {
    const characterLimit = 800;

    const desc = transformationDescriptionData[transformationId];
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
          '<p class="obj-desc-short">Naciśnij na ikonę transformacji, żeby zobaczyć pełny opis.</p>'
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

  return (
    <div className="text-center mt-2 text-light desc-container">
      {popup && (
        <img
          src={`data:image/png;base64,${
            transformationImageData[selectedContent.id]
          }`}
          alt=""
        />
      )}
      <p className="fs-5 obj-name">
        {/* sometimes show wrong name for Monster Manua/el */}
        <u>{selectedContent.name}</u>
      </p>
      <hr />
      {parse(parseDescription(selectedContent.id))}
      <hr />
      <p className="mb-1 obj-prop">
        <span className="obj-info">Id:</span> {selectedContent.id}
      </p>
      <p className="mb-1 obj-prop">
        <span className="obj-info">Przedmioty:</span>{" "}
        {selectedContent.items((itemId) => (
          <img src={itemImageData[itemId]} alt="" />
        ))}
      </p>
      {"trinkets" in selectedContent && (
        <p className="mb-1 obj-prop">
          <span className="obj-info">Trinkety:</span>{" "}
          {selectedContent.trinkets((trinketId) => (
            <img src={trinketImageData[trinketId]} alt="" />
          ))}
        </p>
      )}
      {"pills" in selectedContent && (
        <p className="mb-1 obj-prop">
          <span className="obj-info">Pigułki:</span>{" "}
          {selectedContent.pills.map((pill) => (
            <p>{pill}</p>
          ))}
        </p>
      )}
    </div>
  );
}

export default TransformationDescription;
