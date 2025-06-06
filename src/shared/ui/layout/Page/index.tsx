import { SidebarLayout } from "@/shared/ui/catalyst/sidebar-layout";
import { CustomNavbar } from "../CustomNavbar";
import { CustomSidebar } from "../CustomSidebar";
import { SidebarAppControls } from "../../../../pages/Home/features/SidebarAppControls";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  navbar?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const Page = ({ children, navbar, sidebar }: Props) => (
  <div className="h-dvh w-dvw overflow-x-hidden">
    <SidebarLayout
      navbar={navbar || <CustomNavbar />}
      sidebar={
        sidebar || (
          <CustomSidebar>
            <SidebarAppControls />
          </CustomSidebar>
        )
      }
    >
      {children}
    </SidebarLayout>
  </div>
);
