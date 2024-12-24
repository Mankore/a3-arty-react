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
import { useMainDispatch, useMainSelector } from "../../state/hooks";
import {
  setMap,
  setArtillery,
  setIsTopDown,
  setShell,
  setFireMode,
  setHeightAdjustment,
} from "../../state/main";
import {
  selectArtillery,
  selectFireMode,
  selectHeightAdjustment,
  selectMap,
  selectShell,
} from "../../state/main/selectors";

export const Sidebar = () => {
  const dispatch = useMainDispatch();
  const map = useMainSelector(selectMap);
  const artillery = useMainSelector(selectArtillery);
  const shell = useMainSelector(selectShell);
  const fireMode = useMainSelector(selectFireMode);
  const heightAdjustment = useMainSelector(selectHeightAdjustment);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "arty" | "shell" | "fireMode" | "map"
  ) => {
    const val = e.target.value;
    switch (type) {
      case "arty": {
        const arty = Object.entries(artilleryTypes).find(
          (item) => item[1].name === val
        );
        if (arty) dispatch(setArtillery(arty[1]));
        break;
      }
      case "shell": {
        const shell = artillery.shellTypes.find((item) => item.name === val);
        if (shell) dispatch(setShell(shell));
        break;
      }
      case "fireMode": {
        const fireMode = artillery.fireModes.find((item) => item.name === val);
        if (fireMode) dispatch(setFireMode(fireMode));
        break;
      }
      case "map": {
        const map = Object.entries(maps).find((item) => item[1].name === val);
        if (map) dispatch(setMap(map[1]));
        break;
      }
      default:
        return;
    }
    return;
  };

  return (
    <Container>
      <Wrapper>
        <Label id="label-map">Map</Label>
        <StyledSelect
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
        <label>High angle</label>
        <StyledCheckbox
          type="checkbox"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setIsTopDown(e.target.checked))
          }
        />
      </Wrapper>

      <Wrapper>
        <StyledInput
          id="height-adjustment"
          aria-describedby="label-height-adjustment"
          type="number"
          value={heightAdjustment}
          onChange={(e) =>
            dispatch(setHeightAdjustment(Number(e.target.value)))
          }
        />
        <StyledFormHelperText id="label-height-adjustment">
          Height adjustment, meters
        </StyledFormHelperText>
      </Wrapper>
    </Container>
  );
};
