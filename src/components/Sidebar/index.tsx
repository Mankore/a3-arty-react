import {
  Container,
  Label,
  Wrapper,
  Option,
  StyledSelect,
  StyledInput,
  StyledFormHelperText,
  StyledCheckbox,
} from "./styles";
import * as artilleryTypes from "../../utils/artillery";
import * as maps from "../../utils/maps";
import { Artillery, FireMode, MapInfo, ShellType } from "../../utils/types";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ISidebar {
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
  map: MapInfo;
  heightAdjustment: number;
  setArtillery: React.Dispatch<React.SetStateAction<Artillery>>;
  setShell: React.Dispatch<React.SetStateAction<ShellType>>;
  setFireMode: React.Dispatch<React.SetStateAction<FireMode>>;
  setMap: React.Dispatch<React.SetStateAction<MapInfo>>;
  setTopDown: React.Dispatch<React.SetStateAction<boolean>>;
  setHeightAdjustment: React.Dispatch<React.SetStateAction<number>>;
}

export const Sidebar = ({
  artillery,
  shell,
  fireMode,
  map,
  setArtillery,
  setShell,
  setFireMode,
  setMap,
  setTopDown,
  setHeightAdjustment,
  heightAdjustment,
}: ISidebar) => {
  const onChangeHandler = (e: any, type: "arty" | "shell" | "fireMode" | "map") => {
    const val = e.target.value;
    switch (type) {
      case "arty":
        const arty = Object.entries(artilleryTypes).find((item) => item[1].name === val);
        if (arty) {
          setArtillery(arty[1]);
          setShell(arty[1].shellTypes[0]);
          setFireMode(arty[1].fireModes[0]);
        }
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
        <Label id="label-map">Map</Label>
        <StyledSelect
          labelId="label-map"
          id="select-map"
          onChange={(e) => onChangeHandler(e, "map")}
          value={map.name}
        >
          {Object.entries(maps).map((map) => (
            <Option value={map[1].name} key={map[1].name}>
              {map[1].name}
            </Option>
          ))}
        </StyledSelect>
      </Wrapper>

      <Wrapper>
        <Label id="label-artillery">Artillery</Label>
        <StyledSelect
          labelId="label-artillery"
          id="select-artillery"
          onChange={(e) => onChangeHandler(e, "arty")}
          value={artillery.name}
        >
          {Object.entries(artilleryTypes).map((arty) => (
            <Option value={arty[1].name} key={arty[1].name}>
              {arty[1].name}
            </Option>
          ))}
        </StyledSelect>
      </Wrapper>

      <Wrapper>
        <Label id="label-shell">Shell</Label>
        <StyledSelect
          labelId="lable-shell"
          id="select-shell"
          onChange={(e) => onChangeHandler(e, "shell")}
          value={shell.name}
        >
          {artillery.shellTypes.map((shell) => (
            <Option value={shell.name} key={shell.name}>
              {shell.name}
            </Option>
          ))}
        </StyledSelect>
      </Wrapper>

      <Wrapper>
        <Label id="label-fireMode">Fire Mode</Label>
        <StyledSelect
          labelId="label-fireMode"
          id="select-fireMode"
          onChange={(e) => onChangeHandler(e, "fireMode")}
          value={fireMode.name}
        >
          {artillery.fireModes.map((fireMode) => (
            <Option value={fireMode.name} key={fireMode.name}>
              {fireMode.name}
            </Option>
          ))}
        </StyledSelect>
      </Wrapper>

      <Wrapper>
        <FormControlLabel
          control={
            <StyledCheckbox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopDown(e.target.checked)}
            />
          }
          labelPlacement="start"
          label="Top-down mode"
        />
      </Wrapper>

      <Wrapper>
        <StyledInput
          id="height-adjustment"
          aria-describedby="label-height-adjustment"
          type="number"
          value={heightAdjustment}
          onChange={(e) => setHeightAdjustment(Number(e.target.value))}
        />
        <StyledFormHelperText id="label-height-adjustment">
          Height adjustment, meters
        </StyledFormHelperText>
      </Wrapper>
    </Container>
  );
};
