import { Container, Select, Label, Wrapper } from "./styles";
import * as artilleryTypes from "../../utils/artillery";
import * as maps from "../../utils/maps";
import { Artillery, FireMode, MapInfo, ShellType } from "../../utils/types";

interface ISidebar {
  artillery: Artillery;
  setArtillery: React.Dispatch<React.SetStateAction<Artillery>>;
  setShell: React.Dispatch<React.SetStateAction<ShellType>>;
  setFireMode: React.Dispatch<React.SetStateAction<FireMode>>;
  setMap: React.Dispatch<React.SetStateAction<MapInfo>>;
  setTopDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({
  artillery,
  setArtillery,
  setShell,
  setFireMode,
  setMap,
  setTopDown,
}: ISidebar) => {
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "arty" | "shell" | "fireMode" | "map"
  ) => {
    const val = e.target.value;
    switch (type) {
      case "arty":
        const arty = Object.entries(artilleryTypes).find((item) => item[1].Name === val);
        arty && setArtillery(arty[1]);
        return;
      case "shell":
        const shell = artillery.shellTypes.find((item) => item.name === val);
        shell && setShell(shell);
        return;
      case "fireMode":
        const fireMode = artillery.fireModes.find((item) => item.name === val);
        fireMode && setFireMode(fireMode);
        return;
      case "map":
        const map = Object.entries(maps).find((item) => item[1].name === val);
        map && setMap(map[1]);
        return;
      default:
        return;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Label htmlFor="map">Map</Label>
        <Select name="map" id="map" onChange={(e) => onChangeHandler(e, "map")}>
          {Object.entries(maps).map((map) => (
            <option value={map[1].name} key={map[1].name}>
              {map[1].name}
            </option>
          ))}
        </Select>
      </Wrapper>

      <Wrapper>
        <Label htmlFor="artillery">Artillery</Label>
        <Select name="artillery" id="artillery" onChange={(e) => onChangeHandler(e, "arty")}>
          {Object.entries(artilleryTypes).map((arty) => (
            <option value={arty[1].Name} key={arty[1].Name}>
              {arty[1].Name}
            </option>
          ))}
        </Select>
      </Wrapper>

      <Wrapper>
        <Label htmlFor="shell">Shell</Label>
        <Select name="shell" id="shell" onChange={(e) => onChangeHandler(e, "shell")}>
          {artillery.shellTypes.map((shell) => (
            <option value={shell.name} key={shell.name}>
              {shell.name}
            </option>
          ))}
        </Select>
      </Wrapper>

      <Wrapper>
        <Label htmlFor="fireMode">Fire Mode</Label>
        <Select name="fireMode" id="fireMode" onChange={(e) => onChangeHandler(e, "fireMode")}>
          {artillery.fireModes.map((fireMode) => (
            <option value={fireMode.name} key={fireMode.name}>
              {fireMode.name}
            </option>
          ))}
        </Select>
      </Wrapper>

      <Wrapper>
        <Label htmlFor="topDown">Top Down Mode</Label>
        <input
          type="checkbox"
          id="topDown"
          name="topDown"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopDown(e.target.checked)}
        />
      </Wrapper>
    </Container>
  );
};
