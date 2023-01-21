import { Container } from "./styles";
import { Map } from "../Map";
import { getAngleSolutionForRange, simulateShotForAngle } from "../../utils/ballistics";
import { Arty_2S1_direct } from "../../utils/artillery/2S1_Direct";
import { Shell_3OF56 } from "../../utils/shells";

const App = () => {
  // const shell = Shell_3OF56;
  // const muzzleVelocity = Arty_2S1_direct.fireModes[0].artilleryCharge * shell.initSpeed;
  // const result = simulateShotForAngle(muzzleVelocity, 30.7, Arty_2S1_direct, shell);
  // console.log(result);

  // const result2 = getAngleSolutionForRange(9000, muzzleVelocity, 0, Arty_2S1_direct, shell, false);
  // console.log(result2);
  return (
    <Container>
      <Map />
    </Container>
  );
};

export default App;
