import { useState } from "react";
import useAPI from "../hooks/useAPI";
import Description from "./Description";
import ItemContent from "./main/content/ItemContent";
import Filters from "./main/Filters";
import "./Main.css";

function Main({ typeOption, popup }) {
  const [desc, setDesc] = useState(null);

  //   API STATES
  const [itemsContent, itemsStatus] = useAPI("items", typeOption);

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
                    <ItemContent
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
