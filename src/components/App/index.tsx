import { SidebarLayout } from "@/components/catalyst/sidebar-layout";
import { Map } from "@/components/Map";
import { CustomNavbar } from "@/components/layout/CustomNavbar";
import { CustomSidebar } from "@/components/layout/CustomSidebar";
import { SidebarAppControls } from "@/components/layout/SidebarAppControls";

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
