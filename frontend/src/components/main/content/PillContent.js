import parse from "html-react-parser";
import { itemImageData } from "../../../data/itemData";
import { pillDescriptionData, pillUnlockData } from "../../../data/pillData";
import "./Content.css";

function PillContent({
  nameFilter,
  pillUnlockMethodFilter,
  pillsStatus,
  pillsContent,
}) {
  const parseDescription = (desc) => {
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

    let text = textArray.join("");

    // convert ** to <em></em>
    text = text.replace(/\*\*(.*?)\*\*/g, "<em>$1</em>");

    return text;
  };

  const filterPills = (pill) => {
    //   NAMES & QUOTES
    const nameLower = pill.name.toLowerCase().replace(/[.'?!-]/g, "");
    const nameFilterLower = nameFilter?.toLowerCase().replace(/[.'?!-]/g, "");

    const nameCondition =
      nameFilter === null
        ? true
        : nameLower.includes(nameFilterLower) ||
          (nameFilterLower.startsWith("are you") &&
            pill.name === "R U a Wizard?");

    // UNLOCK METHOD
    const unlockMethodCondition =
      pillUnlockMethodFilter === null
        ? true
        : "unlock" in pill && pill.unlock.method === pillUnlockMethodFilter;

    return [nameCondition, unlockMethodCondition].every(
      (condition) => condition
    );
  };

  const getUnlock = (pill) => {
    if (!("unlock" in pill)) {
      return "";
    }

    const unlock = pill.unlock;

    switch (unlock.method) {
      case "challenge":
        return `przejście wyzwania #${unlock.challengeNumber}: ${unlock.challengeName}`;
      case "other":
        return pillUnlockData[pill.id];
      default:
        throw new Error(`Unknown unlock method: ${unlock.method}.`);
    }
  };

  return (
    <>
      {(() => {
        switch (pillsStatus) {
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
                <table class="table-pills">
                  <thead>
                    <tr>
                      <th class="table-pills-cell">ID</th>
                      <th class="table-pills-cell">nazwa</th>
                      <th class="table-pills-cell">pigułka zwykła</th>
                      <th class="table-pills-cell">pigułka Horse Pill</th>
                      <th class="table-pills-cell">sposób odblokowania</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pillsContent.filter(filterPills).map((pill, pillIdx) => (
                      <tr class="table-pills-row" key={pillIdx}>
                        <td class="table-pills-cell">{pill.id}</td>
                        <td class="table-pills-cell">
                          <strong>{pill.name}</strong>
                        </td>
                        <td class="table-pills-cell">
                          {parse(
                            parseDescription(
                              pillDescriptionData["normal"][pill.id]
                            )
                          )}
                        </td>
                        <td class="table-pills-cell">
                          {parse(
                            parseDescription(
                              pillDescriptionData["horse"][pill.id]
                            )
                          )}
                        </td>
                        <td class="table-pills-cell">{getUnlock(pill)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            throw new Error("Status is not loading, failed or loaded.");
        }
      })()}
    </>
  );
}

export default PillContent;
