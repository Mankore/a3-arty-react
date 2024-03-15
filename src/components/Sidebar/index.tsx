import { Container, Label, Wrapper, Option, StyledSelect, StyledInput, StyledFormHelperText, StyledCheckbox, KeyBindingTip, KeyBindingTipTitle } from "./styles";
import * as artilleryTypes from "../../utils/artillery";
import * as maps from "../../utils/maps";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useMainDispatch, useMainSelector } from "../../state/hooks";
import { setMap, setArtillery, setIsTopDown, setShell, setFireMode, setHeightAdjustment } from "../../state/main";
import { selectArtillery, selectFireMode, selectHeightAdjustment, selectMap, selectShell } from "../../state/main/selectors";

export const Sidebar = () => {
  const dispatch = useMainDispatch();
  const map = useMainSelector(selectMap);
  const artillery = useMainSelector(selectArtillery);
  const shell = useMainSelector(selectShell);
  const fireMode = useMainSelector(selectFireMode);
  const heightAdjustment = useMainSelector(selectHeightAdjustment);

  const onChangeHandler = (e: any, type: "arty" | "shell" | "fireMode" | "map") => {
    const val = e.target.value;
    switch (type) {
      case "arty":
        const arty = Object.entries(artilleryTypes).find((item) => item[1].name === val);
        arty && dispatch(setArtillery(arty[1]));
        return;
      case "shell":
        const shell = artillery.shellTypes.find((item) => item.name === val);
        shell && dispatch(setShell(shell));
        return;
      case "fireMode":
        const fireMode = artillery.fireModes.find((item) => item.name === val);
        fireMode && dispatch(setFireMode(fireMode));
        return;
      case "map":
        const map = Object.entries(maps).find((item) => item[1].name === val);
        map && dispatch(setMap(map[1]));
        return;
      default:
        return;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Label id="label-map">Map</Label>
        <StyledSelect labelId="label-map" id="select-map" onChange={(e) => onChangeHandler(e, "map")} value={map.name}>
          {Object.entries(maps).map((map) => (
            <Option value={map[1].name} key={map[1].name}>
              {map[1].name}
            </Option>
          ))}
        </StyledSelect>
      </Wrapper>

      <Wrapper>
        <Label id="label-artillery">Artillery</Label>
        <StyledSelect labelId="label-artillery" id="select-artillery" onChange={(e) => onChangeHandler(e, "arty")} value={artillery.name}>
          {Object.entries(artilleryTypes).map((arty) => (
            <Option value={arty[1].name} key={arty[1].name}>
              {arty[1].name}
            </Option>
          ))}
        </StyledSelect>
      </Wrapper>

      <Wrapper>
        <Label id="label-shell">Shell</Label>
        <StyledSelect labelId="lable-shell" id="select-shell" onChange={(e) => onChangeHandler(e, "shell")} value={shell.name}>
          {artillery.shellTypes.map((shell) => (
            <Option value={shell.name} key={shell.name}>
              {shell.name}
            </Option>
          ))}
        </StyledSelect>
      </Wrapper>

      <Wrapper>
        <Label id="label-fireMode">Fire Mode</Label>
        <StyledSelect labelId="label-fireMode" id="select-fireMode" onChange={(e) => onChangeHandler(e, "fireMode")} value={fireMode.name}>
          {artillery.fireModes.map((fireMode) => (
            <Option value={fireMode.name} key={fireMode.name}>
              {fireMode.name}
            </Option>
          ))}
        </StyledSelect>
      </Wrapper>

      <Wrapper>
        <FormControlLabel
          control={<StyledCheckbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setIsTopDown(e.target.checked))} />}
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
          onChange={(e) => dispatch(setHeightAdjustment(Number(e.target.value)))}
        />
        <StyledFormHelperText id="label-height-adjustment">Height adjustment, meters</StyledFormHelperText>
      </Wrapper>

      <Wrapper>
        <Label>How to use / Controls</Label>
        <KeyBindingTip>
          <KeyBindingTipTitle>LMB</KeyBindingTipTitle>: pan map
        </KeyBindingTip>
        <KeyBindingTip>
          <KeyBindingTipTitle>Shift + LMB</KeyBindingTipTitle>: set artillery position
        </KeyBindingTip>
        <KeyBindingTip>
          <KeyBindingTipTitle>CTRL + LMB</KeyBindingTipTitle>: set target position
        </KeyBindingTip>
        <KeyBindingTip>
          <KeyBindingTipTitle>ALT + LMB</KeyBindingTipTitle>: set yellow circle (as a point of interest position)
        </KeyBindingTip>
      </Wrapper>
    </Container>
  );
};
