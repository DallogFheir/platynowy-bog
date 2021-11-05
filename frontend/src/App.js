import { useState, useEffect, useRef } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import fortunes from "./data/fortunes";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Description from "./components/Description";
import "./App.css";

function App() {
  // #region GLOBAL STATES
  // sorting/filtering options
  const [typeOption, setTypeOption] = useLocalStorage(
    "typeOption",
    "przedmioty"
  );
  const [sortOption, setSortOption] = useLocalStorage("sortOption", "wg ID");
  const [filterOption, setFilterOption] = useLocalStorage(
    "filterOption",
    "usuń"
  );

  //   other
  const [nameFilter, setNameFilter] = useState(null);

  const [selectedContent, setSelectedContent] = useState(null);

  const [popup, setPopup] = useState(false);
  const popupDiv = useRef(null);
  //   #endregion

  // print fortune to console
  useEffect(() => {
    console.log(
      "%c(╥_╥) " + fortunes[Math.floor(Math.random() * fortunes.length)],
      "font-variant: small-caps; font-size: 20px;"
    );
  }, []);

  return (
    <>
      <div className={["wrapper", popup ? "popup-active" : ""].join(" ")}>
        <Navbar
          typeOption={typeOption}
          setTypeOption={setTypeOption}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          setNameFilter={setNameFilter}
        />
        <Main
          sortOption={sortOption}
          typeOption={typeOption}
          filterOption={filterOption}
          nameFilter={nameFilter}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          popup={popup}
        />
      </div>
      {popup && (
        <div ref={popupDiv} className="desc-popup">
          <Description />
        </div>
      )}
    </>
  );
}

export default App;
