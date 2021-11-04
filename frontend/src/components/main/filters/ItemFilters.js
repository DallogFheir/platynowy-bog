import "./Filters.css";

function ItemFilters({ itemTypeFilter, setItemTypeFilter, itemTypes }) {
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
    </div>
  );
}

export default ItemFilters;
