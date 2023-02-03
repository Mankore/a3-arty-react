import { useState } from "react";
import { Container } from "./styles";
import { Map } from "../Map";
import { Sidebar } from "../Sidebar";
import { Artillery, FireMode, ShellType } from "../../utils/types";
import * as artilleryTypes from "../../utils/artillery";
import * as maps from "../../utils/maps";

const App = () => {
  const defaultMap = Object.values(maps)[3];
  const defaultArtillery = Object.values(artilleryTypes)[0];
  const [map, setMap] = useState(defaultMap);
  const [artillery, setArtillery] = useState<Artillery>(defaultArtillery);
  const [shell, setShell] = useState<ShellType>(defaultArtillery.shellTypes[0]);
  const [fireMode, setFireMode] = useState<FireMode>(defaultArtillery.fireModes[0]);
  const [topDown, setTopDown] = useState<boolean>(false);

  return (
    <Container>
      <Sidebar
        artillery={artillery}
        setArtillery={setArtillery}
        setShell={setShell}
        setFireMode={setFireMode}
        setMap={setMap}
        setTopDown={setTopDown}
      />
      <Map map={map} artillery={artillery} shell={shell} fireMode={fireMode} topDown={topDown} />
    </Container>
  );
};

export default App;
