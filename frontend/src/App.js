import { useState, useEffect, useRef } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { itemPools } from "./data/itemData";
import { itemTransformationImageData } from "./data/transformationData";
import fortunes from "./data/fortunes";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ItemDescription from "./components/main/description/ItemDescription";
import TrinketDescription from "./components/main/description/TrinketDescription";
import TransformationDescription from "./components/main/description/TransformationDescription";
import CardsRunesDescription from "./components/main/description/CardsRunesDescription";
import PickupDescription from "./components/main/description/PickupDescription";
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

  // add 100% height to #root
  useEffect(() => {
    document.querySelector("#root").style.height = "100%";
  }, []);

  // print fortune to console
  useEffect(() => {
    console.log(
      "%c(╥_╥) " + fortunes[Math.floor(Math.random() * fortunes.length)],
      "font-variant: small-caps; font-size: 20px;"
    );
  }, []);

  //   add listener to close popup
  useEffect(() => {
    const listener = (e) => {
      if (popup && !popupDiv.current?.contains(e.target)) {
        setPopup(false);
        setSelectedContent(null);
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [popup]);

  const gFuelQuotes = [
    "SUSPICION UP!",
    "VOLUME UP!",
    "BLOOD UP!",
    "MOMENTUM UP!",
    "MIX UP!",
    "HUMOR UP!",
    "RISK UP!",
    "AIR RESISTANCE UP!",
    "ACIDITY UP!",
    "FAME UP!",
    "VITALITY UP!",
    "WHITE BLOOD CELLS UP!",
    "ENERGY UP",
    "SHUTTER SPEED UP!",
    "MORALITY UP!",
    "STRENGTH UP!",
    "ACCEPTANCE UP!",
    "RESPECT UP!",
    "BUILDING SPEED UP!",
    "WISDOM UP!",
    "SHOTS UP!",
    "THOU ART HERO!",
    "AMMO CAPACITY UP!",
    "SHARPNESS UP!",
    "MISERY UP!",
    "RANK UP! REACHED RANK: ISAAC'S FACE",
    "SLEEP HOURS DOWN!",
    "GOD'S LIGHT UP!",
    "MOVEMENT UP!",
    "SENTIENCE UP!",
  ];

  return (
    <>
      <div
        className={["wrapper", popup ? "popup-active" : ""].join(" ").trim()}
      >
        <Navbar
          typeOption={typeOption}
          setTypeOption={setTypeOption}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          setNameFilter={setNameFilter}
          popup={popup}
        />
        <Main
          sortOption={sortOption}
          typeOption={typeOption}
          filterOption={filterOption}
          nameFilter={nameFilter}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          popup={popup}
          setPopup={setPopup}
          itemPools={itemPools}
          itemTransformationImageData={itemTransformationImageData}
          gFuelQuotes={gFuelQuotes}
        />
        <Footer />
      </div>
      {popup && (
        <div ref={popupDiv} className="desc-popup">
          {(() => {
            switch (typeOption) {
              case "przedmioty":
                return (
                  <ItemDescription
                    itemPools={itemPools}
                    itemTransformationImageData={itemTransformationImageData}
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
      )}
    </>
  );
}

export default App;
