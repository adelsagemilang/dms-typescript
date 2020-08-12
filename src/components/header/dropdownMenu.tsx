import React, { Component } from 'react';
import autooBind from 'react-autobind';
import { Link } from 'react-router-dom';
import { NavbarDropdown, NavbarItem, Columns, Column } from 'bloomer';
import { removeSession } from 'utils/auth';
import { history } from 'utils/history';

interface PropTypes {
  setAdminLayout: any;
}

class DropdownMenu extends Component<PropTypes> {
  constructor(props) {
    super(props);
    autooBind(this);
  }

  logout() {
    removeSession();
    this.props.setAdminLayout(false);
    history.push('/login');
  }

  render() {
    return (
      <NavbarDropdown>
        <Columns className="navbar-dropdown-items">
          <Column>
            <Link to="/">
              <NavbarItem className="navbar-item-icon">
                <img src="/../images/icon-home.png" alt="icon-home" />
              </NavbarItem>
              <div className="navbar-item-title">Home</div>
            </Link>
          </Column>
          <Column>
            <div className="logout" onClick={this.logout}>
              <NavbarItem className="navbar-item-icon">
                <img src="/../images/logout.svg" alt="icon-logout" />
              </NavbarItem>
              <div className="navbar-item-title">Log Out</div>
            </div>
          </Column>
        </Columns>
      </NavbarDropdown>
    );
  }
}

export default DropdownMenu;
