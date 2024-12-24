import { useMainDispatch } from "../../../state/hooks";
import { setTargets } from "../../../state/main";
import { Container } from "./styles";

export const MapButtons = () => {
  const dispatch = useMainDispatch();
  return (
    <Container>
      <button onClick={() => dispatch(setTargets([]))}>
        Remove All Targets
      </button>
    </Container>
  );
};
