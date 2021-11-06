import useAPI from "../hooks/useAPI";
import useLocalStorage from "../hooks/useLocalStorage";
import Description from "./Description";
import ItemContent from "./main/content/ItemContent";
import ItemFilters from "./main/filters/ItemFilters";
import "./Main.css";

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
  itemTransformations,
}) {
  //   API STATES
  const [itemsContent, itemsStatus] = useAPI("items", typeOption);

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
  // #endregion

  //   FIX TO WORK WITH BOOTSTRAP'S COLLAPSE
  const [filtersFolded, setFiltersFolded] = useLocalStorage(
    "filtersFolded",
    false
  );

  return (
    <main className="container-fluid text-light">
      <div className="row">
        <div className="d-none d-md-block col-md-3 desc-container">
          <div className="desc">
            {/* show description if popup isn't up */}
            {selectedContent && !popup && (
              <Description
                itemPools={itemPools}
                itemTransformations={itemTransformations}
                selectedContent={selectedContent}
                popup={popup}
              />
            )}
          </div>
        </div>
        <div className="col-md-9 items">
          <div className="mt-2">
            <div className="fold-btn-container">
              <p className="text-center fs-5 title">
                {typeOption.toUpperCase()}
              </p>
              <button
                type="button"
                className="btn btn-light fold-btn"
                onClick={() => {
                  setFiltersFolded((prev) => !prev);
                }}
              >
                {filtersFolded ? "▼" : "▲"}
              </button>
            </div>
            <hr />
            <div
              className={filtersFolded ? "fold-container" : "fold-container-in"}
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
                        setItemUnlockMethodFilter={setItemUnlockMethodFilter}
                        itemTypes={itemTypes}
                        itemQualities={itemQualities}
                        itemRecharges={itemRecharges}
                        itemPools={itemPools}
                      />
                    );
                  default:
                    throw new Error(`Unknown type option: ${typeOption}`);
                }
              })()}
            </div>
            <hr />
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
