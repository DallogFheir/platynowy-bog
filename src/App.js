import { useState, useRef } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Description from "./components/Description";
import "./App.css";

function App() {
  // GLOBAL STATES
  const [popup, setPopup] = useState(false);
  const popupDiv = useRef(null);

  return (
    <>
      <div className={["wrapper", popup ? "popup-active" : ""].join(" ")}>
        <Navbar />
        <Main />
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
