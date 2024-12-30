import { SidebarDivider } from "@/shared/ui/catalyst/sidebar";
import { useMainDispatch, useMainSelector } from "@/state/hooks";
import {
  setMap,
  setArtillery,
  setIsTopDown,
  setShell,
  setFireMode,
  setHeightAdjustment,
} from "@/state/main";
import {
  selectMap,
  selectArtillery,
  selectShell,
  selectFireMode,
  selectHeightAdjustment,
} from "@/state/main/selectors";
import { Description, Field, Label } from "@/shared/ui/catalyst/fieldset";
import { Select } from "@/shared/ui/catalyst/select";
import * as artilleryTypes from "@/shared/utils/artillery";
import * as maps from "@/shared/utils/maps";
import { Input } from "@/shared/ui/catalyst/input";
import { Switch, SwitchField } from "@/shared/ui/catalyst/switch";
import { BackendSwitch } from "@/shared/features/BackendSwitch";

export const SidebarAppControls = () => {
  const dispatch = useMainDispatch();
  const map = useMainSelector(selectMap);
  const artillery = useMainSelector(selectArtillery);
  const shell = useMainSelector(selectShell);
  const fireMode = useMainSelector(selectFireMode);
  const heightAdjustment = useMainSelector(selectHeightAdjustment);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "arty" | "shell" | "fireMode" | "map",
  ) => {
    const val = e.target.value;
    switch (type) {
      case "arty": {
        const arty = Object.entries(artilleryTypes).find(
          (item) => item[1].name === val,
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
    <>
      <Field>
        <Label htmlFor="select-map">Map</Label>
        <Select
          id="select-map"
          onChange={(e) => onChangeHandler(e, "map")}
          value={map.name}
        >
          {Object.entries(maps).map((map) => (
            <option value={map[1].name} key={map[1].name}>
              {map[1].name}
            </option>
          ))}
        </Select>
      </Field>
      <SidebarDivider />
      <Field>
        <Label htmlFor="select-artillery">Artillery</Label>
        <Select
          id="select-artillery"
          onChange={(e) => onChangeHandler(e, "arty")}
          value={artillery.name}
        >
          {Object.entries(artilleryTypes).map((arty) => (
            <option value={arty[1].name} key={arty[1].name}>
              {arty[1].name}
            </option>
          ))}
        </Select>
      </Field>
      <SidebarDivider />

      <Field>
        <Label htmlFor="select-shell">Shell</Label>
        <Select
          id="select-shell"
          onChange={(e) => onChangeHandler(e, "shell")}
          value={shell.name}
        >
          {artillery.shellTypes.map((shell) => (
            <option value={shell.name} key={shell.name}>
              {shell.name}
            </option>
          ))}
        </Select>
      </Field>
      <SidebarDivider />

      <Field>
        <Label htmlFor="select-fire-mode">Fire Mode</Label>
        <Select
          id="select-fire-mode"
          onChange={(e) => onChangeHandler(e, "fireMode")}
          value={fireMode.name}
        >
          {artillery.fireModes.map((fireMode) => (
            <option value={fireMode.name} key={fireMode.name}>
              {fireMode.name}
            </option>
          ))}
        </Select>
      </Field>
      <SidebarDivider />

      <SwitchField>
        <Label htmlFor="switch-high-angle">High angle</Label>
        <Switch
          id="switch-high-angle"
          name="high_angle"
          onChange={(checked: boolean) => dispatch(setIsTopDown(checked))}
        />
      </SwitchField>
      <SidebarDivider />

      <Field title="If backend is running this can be used to imitate target elevation relative to the ground. If not, this is a difference between target and artillery heights">
        <Label htmlFor="height-adjustment">Height adjustment</Label>
        <Input
          id="height-adjustment"
          type="number"
          value={heightAdjustment}
          onChange={(e) =>
            dispatch(setHeightAdjustment(Number(e.target.value)))
          }
        />
        <Description>Target.z - Artillery.z</Description>
      </Field>
      <SidebarDivider />

      <BackendSwitch />
    </>
  );
};
