import { connect } from "frontity";
import React from "react";
import { ToggleIcon } from "../icons";
import {
  LabeledIcon,
  NavToggle,
  ToggleWrapper,
} from "../navigation/nav-toggle";

const MobileMenuButton = ({ state, actions }) => {
  // Get the menu state and action
  const { isMobileMenuOpen } = state.theme;
  const { openMobileMenu } = actions.theme;

  return (
    <ToggleWrapper>
      <NavToggle
        isMobile
        aria-expanded={isMobileMenuOpen}
        onClick={openMobileMenu}
        aria-label="Click to open search bar..."
      >
        <LabeledIcon icon={ToggleIcon} label="Menu" />
      </NavToggle>
    </ToggleWrapper>
  );
};

export default connect(MobileMenuButton);
