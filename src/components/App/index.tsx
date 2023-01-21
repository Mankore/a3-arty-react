import { useState } from "react";
import { Container } from "./styles";
import { Map } from "../Map";
import { Sidebar } from "../Sidebar";
import { Artillery, FireMode, ShellType } from "../../utils/types";
import * as artilleryTypes from "../../utils/artillery";

const App = () => {
  const defaultArtillery = Object.values(artilleryTypes)[0];
  const [artillery, setArtillery] = useState<Artillery>(defaultArtillery);
  const [shell, setShell] = useState<ShellType>(defaultArtillery.shellTypes[0]);
  const [fireMode, setFireMode] = useState<FireMode>(defaultArtillery.fireModes[0]);

  return (
    <Container>
      <Sidebar
        artillery={artillery}
        setArtillery={setArtillery}
        setShell={setShell}
        setFireMode={setFireMode}
      />
      <Map artillery={artillery} shell={shell} fireMode={fireMode} />
    </Container>
  );
};

export default App;
