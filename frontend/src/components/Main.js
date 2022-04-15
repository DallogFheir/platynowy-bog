import useAPI from "../hooks/useAPI";
import useLocalStorage from "../hooks/useLocalStorage";
import ItemDescription from "./main/description/ItemDescription";
import ItemContent from "./main/content/ItemContent";
import ItemFilters from "./main/filters/ItemFilters";
import TrinketContent from "./main/content/TrinketContent";
import TrinketFilters from "./main/filters/TrinketFilters";
import "./Main.css";
import TrinketDescription from "./main/description/TrinketDescription";
import TransformationContent from "./main/content/TransformationContent";
import TransformationDescription from "./main/description/TransformationDescription";

function Main({
  sortOption,
  typeOption,
  filterOption,
  nameFilter,
  selectedContent,
  setSelectedContent,
  popup,
  setPopup,
  itemPools,
  itemTransformationImageData,
}) {
  //   API STATES
  const [itemsContent, itemsStatus] = useAPI("items", typeOption);
  const [trinketsContent, trinketsStatus] = useAPI("trinkets", typeOption);
  const [transformationsContent, transformationsStatus] = useAPI(
    "transformations",
    typeOption
  );

  //   VARIABLES
  const itemTypes = ["pasywny", "aktywny"];
  const itemQualities = [0, 1, 2, 3, 4];
  const itemRecharges = [
    1,
    2,
    3,
    4,
    6,
    12,
    "czasowy",
    "nielimitowany",
    "jednorazowego użytku",
    "inny",
  ];

  const colors = [
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

  // #region FILTERS
  const [itemTypeFilter, setItemTypeFilter] = useLocalStorage(
    "itemTypeFilter",
    itemTypes
  );
  const [itemQualityFilter, setItemQualityFilter] = useLocalStorage(
    "itemQualityFilter",
    itemQualities
  );
  const [itemRechargeFilter, setItemRechargeFilter] = useLocalStorage(
    "itemRechargeFilter",
    itemRecharges
  );
  const [itemPoolFilter, setItemPoolFilter] = useLocalStorage(
    "itemPoolFilter",
    itemPools.map(([poolName, _]) => poolName)
  );
  const [itemTransformationFilter, setItemTransformationFilter] =
    useLocalStorage("itemTransformationFilter", null);
  const [itemCharacterFilter, setItemCharacterFilter] = useLocalStorage(
    "itemCharacterFilter",
    null
  );
  const [itemBossFilter, setItemBossFilter] = useLocalStorage(
    "itemBossFilter",
    null
  );
  const [itemUnlockMethodFilter, setItemUnlockMethodFilter] = useLocalStorage(
    "itemUnlockMethodFilter",
    null
  );

  const [trinketUnlockMethodFilter, setTrinketUnlockMethodFilter] =
    useLocalStorage("trinketUnlockMethodFilter", null);
  const [trinketSetDropFilter, setTrinketSetDropFilter] = useLocalStorage(
    "trinketSetDropFilter",
    false
  );
  // #endregion

  //   FIX TO WORK WITH BOOTSTRAP'S COLLAPSE
  const [filtersFolded, setFiltersFolded] = useLocalStorage(
    "filtersFolded",
    false
  );

  const isHoverable = window.matchMedia("(hover: hover)").matches;

  return (
    <main className="container-fluid text-light">
      <div className="row">
        <div
          className={[
            "d-none",
            "col-md-3",
            "desc-container",
            isHoverable ? "d-md-block" : "",
          ]
            .join(" ")
            .trim()}
        >
          <div className="desc">
            {/* show description if popup isn't up */}
            {selectedContent &&
              !popup &&
              (() => {
                switch (typeOption) {
                  case "przedmioty":
                    return (
                      <ItemDescription
                        itemPools={itemPools}
                        itemTransformationImageData={
                          itemTransformationImageData
                        }
                        selectedContent={selectedContent}
                        popup={popup}
                      />
                    );
                  case "trinkety":
                    return (
                      <TrinketDescription
                        selectedContent={selectedContent}
                        popup={popup}
                      />
                    );
                  case "transformacje":
                    return (
                      <TransformationDescription
                        selectedContent={selectedContent}
                        popup={popup}
                      />
                    );
                  default:
                    throw new Error(`Unknown type option: ${typeOption}`);
                }
              })()}
          </div>
        </div>
        <div
          className={[isHoverable ? "col-md-9" : "col-12", "items"].join(" ")}
        >
          <div className="mt-2">
            <div className="fold-btn-container">
              <p className="text-center fs-5 title">
                {typeOption.toUpperCase()}
              </p>
              {typeOption !== "transformacje" && (
                <button
                  type="button"
                  className="btn btn-light fold-btn"
                  onClick={() => {
                    setFiltersFolded((prev) => !prev);
                  }}
                >
                  {filtersFolded ? "▼" : "▲"}
                </button>
              )}
            </div>
            <hr />
            {typeOption !== "transformacje" && (
              <>
                <div
                  className={
                    filtersFolded ? "fold-container" : "fold-container-in"
                  }
                >
                  {(() => {
                    switch (typeOption) {
                      case "przedmioty":
                        return (
                          <ItemFilters
                            itemTypeFilter={itemTypeFilter}
                            setItemTypeFilter={setItemTypeFilter}
                            itemQualityFilter={itemQualityFilter}
                            setItemQualityFilter={setItemQualityFilter}
                            itemRechargeFilter={itemRechargeFilter}
                            setItemRechargeFilter={setItemRechargeFilter}
                            itemPoolFilter={itemPoolFilter}
                            setItemPoolFilter={setItemPoolFilter}
                            itemTransformationFilter={itemTransformationFilter}
                            setItemTransformationFilter={
                              setItemTransformationFilter
                            }
                            itemCharacterFilter={itemCharacterFilter}
                            setItemCharacterFilter={setItemCharacterFilter}
                            itemBossFilter={itemBossFilter}
                            setItemBossFilter={setItemBossFilter}
                            itemUnlockMethodFilter={itemUnlockMethodFilter}
                            setItemUnlockMethodFilter={
                              setItemUnlockMethodFilter
                            }
                            itemTypes={itemTypes}
                            itemQualities={itemQualities}
                            itemRecharges={itemRecharges}
                            itemPools={itemPools}
                          />
                        );
                      case "trinkety":
                        return (
                          <TrinketFilters
                            trinketUnlockMethodFilter={
                              trinketUnlockMethodFilter
                            }
                            setTrinketUnlockMethodFilter={
                              setTrinketUnlockMethodFilter
                            }
                            trinketSetDropFilter={trinketSetDropFilter}
                            setTrinketSetDropFilter={setTrinketSetDropFilter}
                          />
                        );
                      default:
                        throw new Error(`Unknown type option: ${typeOption}`);
                    }
                  })()}
                </div>
                <hr />
              </>
            )}
            {(() => {
              switch (typeOption) {
                case "przedmioty":
                  return (
                    <ItemContent
                      sortOption={sortOption}
                      filterOption={filterOption}
                      nameFilter={nameFilter}
                      itemTypeFilter={itemTypeFilter}
                      itemQualityFilter={itemQualityFilter}
                      itemRechargeFilter={itemRechargeFilter}
                      itemPoolFilter={itemPoolFilter}
                      itemTransformationFilter={itemTransformationFilter}
                      itemCharacterFilter={itemCharacterFilter}
                      itemBossFilter={itemBossFilter}
                      itemUnlockMethodFilter={itemUnlockMethodFilter}
                      itemsStatus={itemsStatus}
                      itemsContent={itemsContent}
                      colors={colors}
                      setSelectedContent={setSelectedContent}
                      popup={popup}
                      setPopup={setPopup}
                    />
                  );
                case "trinkety":
                  return (
                    <TrinketContent
                      sortOption={sortOption}
                      filterOption={filterOption}
                      nameFilter={nameFilter}
                      trinketUnlockMethodFilter={trinketUnlockMethodFilter}
                      trinketSetDropFilter={trinketSetDropFilter}
                      trinketsStatus={trinketsStatus}
                      trinketsContent={trinketsContent}
                      colors={colors}
                      setSelectedContent={setSelectedContent}
                      popup={popup}
                      setPopup={setPopup}
                    />
                  );
                case "transformacje":
                  return (
                    <TransformationContent
                      sortOption={sortOption}
                      filterOption={filterOption}
                      nameFilter={nameFilter}
                      transformationsStatus={transformationsStatus}
                      transformationsContent={transformationsContent}
                      colors={colors}
                      setSelectedContent={setSelectedContent}
                      popup={popup}
                      setPopup={setPopup}
                    />
                  );
                default:
                  throw new Error(`Unknown type option: ${typeOption}`);
              }
            })()}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
