import { useMainDispatch } from "../../../state/hooks";
import { setTargets } from "../../../state/main";
import { Button } from "../../catalyst/button";
import { Container } from "./styles";

export const MapButtons = () => {
  const dispatch = useMainDispatch();
  return (
    <Container>
      <Button color="red" onClick={() => dispatch(setTargets([]))}>
        Remove All Targets
      </Button>
    </Container>
  );
};
