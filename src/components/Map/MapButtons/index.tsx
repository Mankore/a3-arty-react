import { useMainDispatch } from "../../../state/hooks";
import { setTargets } from "../../../state/main";
import { Button } from "../../catalyst/button";

export const MapButtons = () => {
  const dispatch = useMainDispatch();
  return (
    <div className="absolute top-4 left-20 z-[1002]">
      <Button color="red" onClick={() => dispatch(setTargets([]))}>
        Remove All Targets
      </Button>
    </div>
  );
};
