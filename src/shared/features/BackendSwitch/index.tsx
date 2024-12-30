import { useMainDispatch, useMainSelector } from "@/state/hooks";
import { Field, Label } from "@/shared/ui/catalyst/fieldset";
import { Switch } from "@/shared/ui/catalyst/switch";
import { selectBackendEnabled } from "@/state/main/selectors";
import { setIsBackendEnabled } from "@/state/main";
import { usePingBackend } from "@/utils/hooks/usePingBackend";
import { useEffect } from "react";

export const BackendSwitch = () => {
  const dispatch = useMainDispatch();
  const isBackendEnabled = useMainSelector(selectBackendEnabled);
  const { isSuccess } = usePingBackend();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsBackendEnabled(true));
    }
  }, [isSuccess, dispatch]);

  return (
    <Field title="Turn on only if backend is running">
      <Label className="mr-6" htmlFor="switch-backend">
        Backend Enabled?
      </Label>
      <Switch
        id="switch-backend"
        name="switch-backend"
        onChange={(checked: boolean) => dispatch(setIsBackendEnabled(checked))}
        checked={isBackendEnabled}
      />
    </Field>
  );
};
