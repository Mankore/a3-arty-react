import { useMainDispatch } from "../../../state/hooks";
import { setTargets } from "../../../state/main";
import { Container } from "./styles";
import Button from "@mui/material/Button";

export const MapButtons = () => {
  const dispatch = useMainDispatch();
  return (
    <Container>
      <Button variant="outlined" color="error" onClick={() => dispatch(setTargets([]))}>
        Remove All Targets
      </Button>
    </Container>
  );
};
