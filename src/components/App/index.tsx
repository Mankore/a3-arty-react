import { Container } from "./styles";
import { Map } from "../Map";
import { Sidebar } from "../Sidebar";

const App = () => {
  return (
    <Container>
      <Sidebar />
      <Map />
    </Container>
  );
};

export default App;
