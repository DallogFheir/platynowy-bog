import { useEffect, useRef } from "react";
import "./Navbar.css";

function Navbar({
  typeOption,
  setTypeOption,
  sortOption,
  setSortOption,
  filterOption,
  setFilterOption,
  setNameFilter,
  popup,
}) {
  // ADD EVENT LISTENER TO TYPE TO SEARCH BAR FROM WHEREVER
  const searchBarInput = useRef(null);
  useEffect(() => {
    const focusSearchBar = (e) => {
      if (
        !popup &&
        window.getSelection().type !== "Range" &&
        !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(e.key)
      ) {
        searchBarInput.current.focus();
      }
    };

    document.addEventListener("keydown", focusSearchBar);

    return () => document.removeEventListener("keydown", focusSearchBar);
  }, [popup]);

  // MENUS
  const menus = [
    {
      name: "typ",
      state: typeOption,
      setState: setTypeOption,
      options: [
        "przedmioty",
        "trinkety",
        "pigułki",
        "karty/runy",
        "transformacje",
      ],
    },
    {
      name: "sortowanie",
      state: sortOption,
      setState: setSortOption,
      options: ["wg ID", "wg koloru"],
    },
    {
      name: "filtr",
      state: filterOption,
      setState: setFilterOption,
      options: ["usuń", "przyciemń"],
    },
  ];

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div
          className="navbar-brand ms-2"
          onClick={() => {
            searchBarInput.current.value = "";
            setNameFilter("");
          }}
        >
          <img src="platinum-god.png" alt="" />
          <span className="ms-2 title">PLATYNOWY BÓG</span>
        </div>
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggle"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarToggle" className="collapse navbar-collapse">
          <ul className="nav nav-tabs ms-auto me-3 flex-column flex-sm-row d-none d-md-flex">
            {menus.map((menu, idx) => (
              <li key={idx} className="nav-item dropdown text-center">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  data-bs-toggle="dropdown"
                  className="nav-link dropdown-toggle"
                >
                  {menu.name.toUpperCase()}
                </a>
                <ul className="dropdown-menu">
                  {menu.options.map((option, idx) => (
                    <li key={idx} className="dropdown-item">
                      <div className="form-check">
                        <input
                          type="radio"
                          name={menu.name}
                          checked={option === menu.state}
                          id={option}
                          className="form-check-input"
                          onChange={(e) => {
                            menu.setState(e.target.id);
                          }}
                        />
                        <label htmlFor={option} className="form-check-label">
                          {option}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <form className="mt-2 mb-2 d-md-none text-center text-light">
            {menus.map((menu, menuIdx) => (
              <div key={menuIdx} className="mt-2">
                <label className="ms-2 me-2" htmlFor={menu.name}>
                  {menu.name.toUpperCase() + ":"}
                </label>
                <select
                  id={menu.name}
                  value={menu.state}
                  onChange={(e) => {
                    menu.setState(e.target.value);
                  }}
                >
                  {menu.options.map((option, optionIdx) => (
                    <option key={optionIdx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </form>
          <form
            action=""
            className="form-inline me-2 ms-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Wyszukaj..."
              title="Wyszukaj po nazwie lub opisie z gry."
              ref={searchBarInput}
              className="form-control searchbar"
              onChange={(e) => setNameFilter(e.target.value || null)}
            />
          </form>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
