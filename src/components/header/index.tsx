import * as React from 'react';
import { getSession } from 'utils/auth';
import { LayoutActionStateTypes } from 'layout/types';
import {
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarEnd,
  NavbarItem,
} from 'bloomer';
import DropdownMenu from './dropdownMenu';
import BackButton from './backButton';
import Profile from './profile';
import ViewSettings from './viewSettings';
import 'styles/sass/components/header.sass';

class Header extends React.Component<LayoutActionStateTypes, {}> {
  render() {
    const {
      isShowBackButton,
      setAdminLayout,
      isShowViewSettings,
      showBackButton,
    } = this.props;
    const session = getSession();
    const hasDropdown = !isShowBackButton;

    return (
      <Navbar id="navbar-fixed-top">
        <NavbarBrand>
          <NavbarItem hasDropdown={hasDropdown} isHoverable>
            <BackButton
              isShowBackButton={isShowBackButton}
              showBackButton={showBackButton}
            />
            <DropdownMenu setAdminLayout={setAdminLayout} />
          </NavbarItem>
          <NavbarItem>
            <img src="/../images/logo.png" alt="Logan logo" />
          </NavbarItem>
        </NavbarBrand>
        <NavbarMenu>
          <NavbarEnd>
            {isShowViewSettings && <ViewSettings />}
            <Profile session={session} />
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

export default Header;
