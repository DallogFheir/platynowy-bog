import useAPI from "../hooks/useAPI";
import useLocalStorage from "../hooks/useLocalStorage";
import ItemDescription from "./main/description/ItemDescription";
import ItemContent from "./main/content/ItemContent";
import ItemFilters from "./main/filters/ItemFilters";
import TrinketContent from "./main/content/TrinketContent";
import TrinketFilters from "./main/filters/TrinketFilters";
import TrinketDescription from "./main/description/TrinketDescription";
import PillContent from "./main/content/PillContent";
import PillFilters from "./main/filters/PillFilters";
import CardsRunesContent from "./main/content/CardsRunesContent";
import CardsRunesFilters from "./main/filters/CardsRunesFilters";
import CardsRunesDescription from "./main/description/CardsRunesDescription";
import TransformationContent from "./main/content/TransformationContent";
import TransformationDescription from "./main/description/TransformationDescription";
import PickupContent from "./main/content/PickupContent";
import PickupFilters from "./main/filters/PickupFilters";
import PickupDescription from "./main/description/PickupDescription";
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
  itemTransformationImageData,
  gFuelQuotes,
}) {
  //   API STATES
  const [itemsContent, itemsStatus] = useAPI("items", typeOption);
  const [trinketsContent, trinketsStatus] = useAPI("trinkets", typeOption);
  const [pillsContent, pillsStatus] = useAPI("pills", typeOption);
  const [cardsRunesContent, cardsRunesStatus] = useAPI(
    "cards-runes",
    typeOption
  );
  const [transformationsContent, transformationsStatus] = useAPI(
    "transformations",
    typeOption
  );
  const [pickupsContent, pickupsStatus] = useAPI("pickups", typeOption);

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

  const [pillUnlockMethodFilter, setPillUnlockMethodFilter] = useLocalStorage(
    "pillUnlockMethodFilter",
    null
  );

  const [cardRuneTypeFilter, setCardRuneTypeFilter] = useLocalStorage(
    "cardRuneTypeFilter",
    null
  );
  const [cardRuneUnlockMethodFilter, setCardRuneUnlockMethodFilter] =
    useLocalStorage("cardRuneUnlockMethodFilter", null);

  const [pickupTypeFilter, setPickupTypeFilter] = useLocalStorage(
    "pickupTypeFilter",
    null
  );
  const [pickupUnlockMethodFilter, setPickupUnlockMethodFilter] =
    useLocalStorage("pickupUnlockMethodFilter", null);
  // #endregion

  //   FIX TO WORK WITH BOOTSTRAP'S COLLAPSE
  const [filtersFolded, setFiltersFolded] = useLocalStorage(
    "filtersFolded",
    false
  );

  const isHoverable =
    window.matchMedia("(hover: hover)").matches && typeOption !== "pigułki";

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
                        gFuelQuotes={gFuelQuotes}
                      />
                    );
                  case "trinkety":
                    return (
                      <TrinketDescription
                        selectedContent={selectedContent}
                        popup={popup}
                      />
                    );
                  case "karty/runy":
                    return (
                      <CardsRunesDescription
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
                  case "znajdźki":
                    return (
                      <PickupDescription
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
          className={[isHoverable ? "col-md-9" : "col-12 p-4", "items"].join(
            " "
          )}
        >
          <div className="mt-2">
            <div className="fold-btn-container">
              <p
                className={[
                  "text-center",
                  "fs-5",
                  "title",
                  typeOption === "transformacje" ? "" : "fold-title",
                ]
                  .join(" ")
                  .trim()}
              >
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
                      case "pigułki":
                        return (
                          <PillFilters
                            pillUnlockMethodFilter={pillUnlockMethodFilter}
                            setPillUnlockMethodFilter={
                              setPillUnlockMethodFilter
                            }
                          />
                        );
                      case "karty/runy":
                        return (
                          <CardsRunesFilters
                            cardRuneTypeFilter={cardRuneTypeFilter}
                            setCardRuneTypeFilter={setCardRuneTypeFilter}
                            cardRuneUnlockMethodFilter={
                              cardRuneUnlockMethodFilter
                            }
                            setCardRuneUnlockMethodFilter={
                              setCardRuneUnlockMethodFilter
                            }
                          />
                        );
                      case "znajdźki":
                        return (
                          <PickupFilters
                            pickupTypeFilter={pickupTypeFilter}
                            setPickupTypeFilter={setPickupTypeFilter}
                            pickupUnlockMethodFilter={pickupUnlockMethodFilter}
                            setPickupUnlockMethodFilter={
                              setPickupUnlockMethodFilter
                            }
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
                      gFuelQuotes={gFuelQuotes}
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
                case "pigułki":
                  return (
                    <PillContent
                      nameFilter={nameFilter}
                      pillUnlockMethodFilter={pillUnlockMethodFilter}
                      pillsStatus={pillsStatus}
                      pillsContent={pillsContent}
                    />
                  );
                case "karty/runy":
                  return (
                    <CardsRunesContent
                      sortOption={sortOption}
                      filterOption={filterOption}
                      nameFilter={nameFilter}
                      cardRuneTypeFilter={cardRuneTypeFilter}
                      cardRuneUnlockMethodFilter={cardRuneUnlockMethodFilter}
                      cardsRunesStatus={cardsRunesStatus}
                      cardsRunesContent={cardsRunesContent}
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
                case "znajdźki":
                  return (
                    <PickupContent
                      sortOption={sortOption}
                      filterOption={filterOption}
                      nameFilter={nameFilter}
                      pickupTypeFilter={pickupTypeFilter}
                      pickupUnlockMethodFilter={pickupUnlockMethodFilter}
                      pickupsStatus={pickupsStatus}
                      pickupsContent={pickupsContent}
                      setSelectedContent={setSelectedContent}
                      colors={colors}
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
