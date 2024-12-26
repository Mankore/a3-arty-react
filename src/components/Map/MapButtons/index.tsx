import { useMainDispatch } from "@/state/hooks";
import { setTargets } from "@/state/main";
import { Button } from "@/components/catalyst/button";

export const MapButtons = () => {
  const dispatch = useMainDispatch();
  return (
    <div className="absolute left-20 top-4 z-[1002]">
      <Button color="red" onClick={() => dispatch(setTargets([]))}>
        Remove All Targets
      </Button>
    </div>
  );
};
