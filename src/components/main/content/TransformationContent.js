import "./Content.css";
import {
  transformationImageData,
  transformationColorData,
} from "../../../data/transformationData";
import { itemImageData } from "../../../data/itemData";

function TransformationContent({
  sortOption,
  filterOption,
  nameFilter,
  transformationsStatus,
  transformationsContent,
  colors,
  setSelectedContent,
  popup,
  setPopup,
}) {
  const filterTransformations = (transformation) => {
    const nameLower = transformation.name.toLowerCase().replace(/[.']/g, "");
    const nameFilterLower = nameFilter?.toLowerCase().replace(/[.']/g, "");

    return nameFilter === null ? true : nameLower.includes(nameFilterLower);
  };

  return (
    <>
      {(() => {
        switch (transformationsStatus) {
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
                {transformationsContent
                  .sort(
                    sortOption === "wg ID"
                      ? (a, b) => a.id - b.id
                      : (a, b) => {
                          //   sort by color first, then by ID
                          const colorSort =
                            colors.indexOf(transformationColorData[a.id]) -
                            colors.indexOf(transformationColorData[b.id]);

                          return colorSort === 0 ? a.id - b.id : colorSort;
                        }
                  )
                  .filter(
                    filterOption === "usuń" ? filterTransformations : () => true
                  )
                  .map((transformation, transformationIdx) => (
                    <img
                      key={transformationIdx}
                      src={`data:image/png;base64,${
                        transformationImageData[transformation.id]
                      }`}
                      alt=""
                      className={[
                        "me-1",
                        "clickable",
                        !filterTransformations(transformation)
                          ? "unselected"
                          : "",
                      ]
                        .join(" ")
                        .trim()}
                      onMouseOver={() => {
                        setSelectedContent(transformation);
                      }}
                      onMouseOut={() => {
                        //   only set selected back to null if popup is not up
                        // otherwise it will trigger
                        !popup && setSelectedContent(null);
                      }}
                      onClick={() => {
                        setSelectedContent(transformation);
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

export default TransformationContent;
