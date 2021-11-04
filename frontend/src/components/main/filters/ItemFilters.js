import "./Filters.css";

function ItemFilters({
  itemTypeFilter,
  setItemTypeFilter,
  itemQualityFilter,
  setItemQualityFilter,
  itemTypes,
  itemQualities,
}) {
  return (
    <div>
      <div>
        <span className="filter-name">Typ:</span>
        {itemTypes.map((type) => (
          <button
            className={[
              "btn",
              "ms-2",
              itemTypeFilter.includes(type) ? "btn-light" : "btn-secondary",
            ].join(" ")}
            type="button"
            onClick={() => {
              if (itemTypeFilter.includes(type)) {
                setItemTypeFilter(itemTypeFilter.filter((el) => el !== type));
              } else {
                setItemTypeFilter([...itemTypeFilter, type]);
              }
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mt-2">
        <span className="filter-name">Jakość:</span>
        {itemQualities.map((quality) => (
          <button
            className={[
              "btn",
              "ms-2",
              itemQualityFilter.includes(quality)
                ? "btn-light"
                : "btn-secondary",
            ].join(" ")}
            type="button"
            onClick={() => {
              if (itemQualityFilter.includes(quality)) {
                setItemQualityFilter(
                  itemQualityFilter.filter((el) => el !== quality)
                );
              } else {
                setItemQualityFilter([...itemQualityFilter, quality]);
              }
            }}
          >
            {quality}
          </button>
        ))}
        <button
          type="button"
          className="btn ms-2 btn-success"
          onClick={() => {
            //   if not all selected, select all
            if (
              itemQualities.filter(
                (quality) => !itemQualityFilter.includes(quality)
              ).length !== 0
            ) {
              setItemQualityFilter([...itemQualities]);
            }
            //   otherwise select none
            else {
              setItemQualityFilter([]);
            }
          }}
        >
          wszystkie
        </button>
      </div>
    </div>
  );
}

export default ItemFilters;
