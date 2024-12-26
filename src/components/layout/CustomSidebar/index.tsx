import { QuestionMarkCircleIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { Avatar } from "../../catalyst/avatar";

import {
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarBody,
  SidebarFooter,
  Sidebar,
} from "../../catalyst/sidebar";

import logo from "@/assets//logo/logo.png";
import githubLogo from "@/assets/svg/logo-github.svg";
import { PropsWithChildren } from "react";
import { BackendSwitch } from "@/components/BackendSwitch";

export const CustomSidebar = ({ children }: PropsWithChildren) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarSection>
          <SidebarItem className="max-lg:hidden">
            <Avatar src={logo} />
            <SidebarLabel>Arma 3 Artillery Calculator</SidebarLabel>
          </SidebarItem>
          <SidebarItem>
            <MapPinIcon />
            <SidebarLabel>Map</SidebarLabel>
          </SidebarItem>
          <SidebarItem disabled>
            <QuestionMarkCircleIcon />
            <SidebarLabel>About</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>{children}</SidebarSection>
      </SidebarBody>
      <SidebarFooter className="max-lg:hidden">
        <SidebarSection>
          <BackendSwitch />
          <SidebarItem
            href="https://github.com/Mankore/a3-arty-react"
            target="_blank"
          >
            <Avatar src={githubLogo} />
            <SidebarLabel>Github</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="https://github.com/Mankore" target="_blank">
            <SidebarLabel>by Mankor</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarFooter>
    </Sidebar>
  );
};
