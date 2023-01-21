import { Container, Select, Label } from "./styles";
import * as artilleryTypes from "../../utils/artillery";
import { Artillery, FireMode, ShellType } from "../../utils/types";

interface ISidebar {
  artillery: Artillery;
  setArtillery: React.Dispatch<React.SetStateAction<Artillery>>;
  setShell: React.Dispatch<React.SetStateAction<ShellType>>;
  setFireMode: React.Dispatch<React.SetStateAction<FireMode>>;
}

export const Sidebar = ({ artillery, setArtillery, setShell, setFireMode }: ISidebar) => {
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "arty" | "shell" | "fireMode"
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
      default:
        return;
    }
  };

  return (
    <Container>
      <div>
        <Label htmlFor="artillery">Artillery</Label>
        <Select name="artillery" id="artillery" onChange={(e) => onChangeHandler(e, "arty")}>
          {Object.entries(artilleryTypes).map((arty) => (
            <option value={arty[1].Name}>{arty[1].Name}</option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="shell">Shell</Label>
        <Select name="shell" id="shell" onChange={(e) => onChangeHandler(e, "shell")}>
          {artillery.shellTypes.map((shell) => (
            <option value={shell.name}>{shell.name}</option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="fireMode">Fire Mode</Label>
        <Select name="fireMode" id="fireMode" onChange={(e) => onChangeHandler(e, "fireMode")}>
          {artillery.fireModes.map((fireMode) => (
            <option value={fireMode.name}>{fireMode.name}</option>
          ))}
        </Select>
      </div>
    </Container>
  );
};
