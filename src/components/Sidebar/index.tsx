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
import { Select } from "../catalyst/select";
import { Input } from "../catalyst/input";
import { Description, Field, Label } from "../catalyst/fieldset";
import { Switch, SwitchField } from "../catalyst/switch";

export const Sidebar = () => {
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
    <div className="bg-black p-2 text-white">
      <div className="m-2">
        <Field>
          <Label id="label-map">Map</Label>
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
      </div>

      <div className="m-2">
        <Field>
          <Label id="label-artillery">Artillery</Label>
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
      </div>

      <div className="m-2">
        <Field>
          <Label id="label-shell">Shell</Label>
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
      </div>

      <div className="m-2">
        <Field>
          <Label>Fire Mode</Label>
          <Select
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
      </div>

      <div className="m-2">
        <SwitchField>
          <Label>High angle</Label>
          <Switch
            name="high_angle"
            onChange={(checked: boolean) => dispatch(setIsTopDown(checked))}
          />
        </SwitchField>
      </div>

      <div className="m-2">
        <Field>
          <Input
            id="height-adjustment"
            aria-describedby="label-height-adjustment"
            type="number"
            value={heightAdjustment}
            onChange={(e) =>
              dispatch(setHeightAdjustment(Number(e.target.value)))
            }
          />
          <Description>
            Height adjustment, meters <br />
            Target.z - Artillery.z
          </Description>
        </Field>
      </div>
    </div>
  );
};
