import { Avatar } from "../../catalyst/avatar";

import {
  NavbarSpacer,
  NavbarSection,
  NavbarItem,
  Navbar,
} from "../../catalyst/navbar";

import logo from "../../../assets/logo/logo.png";

export const CustomNavbar = () => {
  return (
    <Navbar>
      <NavbarSpacer />
      <NavbarSection>
        <NavbarItem aria-label="Logo">
          Arma 3 Artillery Calculator
          <Avatar src={logo} />
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
};
