import { Container } from "./styles";
import { Map } from "../Map";
import { Arty_2S1_direct } from "../../utils/artillery/2S1_Direct";
import { Shell_3OF56 } from "../../utils/shells";

const App = () => {
  return (
    <Container>
      <Map artillery={Arty_2S1_direct} shell={Shell_3OF56} />
    </Container>
  );
};

export default App;
