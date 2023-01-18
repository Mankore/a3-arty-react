import { Container } from "./styles";
import { Map } from "../Map";

interface IApp {
  children?: React.ReactNode;
}

const App = ({ children }: IApp) => {
  return (
    <Container>
      <Map />
    </Container>
  );
};

export default App;
