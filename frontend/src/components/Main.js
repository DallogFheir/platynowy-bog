import { useState } from "react";
import useAPI from "../hooks/useAPI";
import useLocalStorage from "../hooks/useLocalStorage";
import { itemPools, itemTransformations } from "../data/itemData";
import Description from "./Description";
import ItemContent from "./main/content/ItemContent";
import ItemFilters from "./main/filters/ItemFilters";
import "./Main.css";

function Main({ sortOption, typeOption, filterOption, nameFilter, popup }) {
  const [desc, setDesc] = useState(null);

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

  // FILTERS
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

  return (
    <main className="container-fluid text-light">
      <div className="row">
        <div className="d-none d-md-block col-md-3 desc">
          {/* show description if popup isn't up */}
          {desc && !popup && <Description />}
        </div>
        <div className="col-md-9 items">
          <div className="mt-2">
            <p className="text-center fs-5 title">{typeOption.toUpperCase()}</p>
            <hr />
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
                      setItemTransformationFilter={setItemTransformationFilter}
                      itemTypes={itemTypes}
                      itemQualities={itemQualities}
                      itemRecharges={itemRecharges}
                      itemPools={itemPools}
                    />
                  );
              }
            })()}
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
                      itemsStatus={itemsStatus}
                      itemsContent={itemsContent}
                    />
                  );
              }
            })()}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
