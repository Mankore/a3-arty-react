import { useMainDispatch, useMainSelector } from "@/state/hooks";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Switch } from "@/components/catalyst/switch";
import { selectBackendEnabled } from "@/state/main/selectors";
import { setIsBackendEnabled } from "@/state/main";

export const BackendSwitch = () => {
  const dispatch = useMainDispatch();
  const isBackendEnabled = useMainSelector(selectBackendEnabled);

  return (
    <Field title="Turn on only if backend is running">
      <Label className="mr-6" htmlFor="switch-backend">
        Backend Enabled?
      </Label>
      <Switch
        id="switch-backend"
        name="switch-backend"
        onChange={(checked: boolean) => dispatch(setIsBackendEnabled(checked))}
        value={String(isBackendEnabled)}
      />
    </Field>
  );
};
