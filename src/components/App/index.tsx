import { useState } from "react";
import { Container } from "./styles";
import { Map } from "../Map";
import { Sidebar } from "../Sidebar";
import { Artillery, FireMode, ShellType } from "../../utils/types";
import * as artilleryTypes from "../../utils/artillery";
import * as maps from "../../utils/maps";

const App = () => {
  const defaultMap = Object.values(maps)[0];
  const defaultArtillery = Object.values(artilleryTypes)[0];
  const [map, setMap] = useState(defaultMap);
  const [artillery, setArtillery] = useState<Artillery>(defaultArtillery);
  const [shell, setShell] = useState<ShellType>(defaultArtillery.shellTypes[0]);
  const [fireMode, setFireMode] = useState<FireMode>(defaultArtillery.fireModes[0]);
  const [heightAdjustment, setHeightAdjustment] = useState<number>(0);

  return (
    <Container>
      <Sidebar
        artillery={artillery}
        shell={shell}
        fireMode={fireMode}
        map={map}
        heightAdjustment={heightAdjustment}
        setArtillery={setArtillery}
        setShell={setShell}
        setFireMode={setFireMode}
        setMap={setMap}
        setHeightAdjustment={setHeightAdjustment}
      />
      <Map map={map} artillery={artillery} shell={shell} fireMode={fireMode} heightAdjustment={heightAdjustment} />
    </Container>
  );
};

export default App;
