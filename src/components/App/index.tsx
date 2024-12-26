import { Map } from "../Map";
import { Sidebar } from "../Sidebar";

const App = () => {
  return (
    <div className="grid h-dvh w-dvw grid-cols-[225px_auto]">
      <Sidebar />
      <Map />
    </div>
  );
};

export default App;
