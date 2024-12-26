import { SidebarLayout } from "../catalyst/sidebar-layout";
import { Map } from "../Map";
import { CustomNavbar } from "../layout/CustomNavbar";
import { CustomSidebar } from "../layout/CustomSidebar";
import { SidebarAppControls } from "../layout/SidebarAppControls";

const App = () => {
  return (
    <div className="h-dvh w-dvw">
      <SidebarLayout
        navbar={<CustomNavbar />}
        sidebar={
          <CustomSidebar>
            <SidebarAppControls />
          </CustomSidebar>
        }
      >
        <Map />
      </SidebarLayout>
    </div>
  );
};

export default App;
