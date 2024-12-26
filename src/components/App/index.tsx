import { Map } from "../Map";
import { Sidebar } from "../Sidebar";

const App = () => {
  return (
    <div className="grid grid-cols-[225px_auto] w-dvw h-dvh">
      <Sidebar />
      <Map />
    </div>
  );
};

export default App;
