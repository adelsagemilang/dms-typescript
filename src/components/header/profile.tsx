import React, { Component } from 'react';
import { NavbarItem, Image } from 'bloomer';

interface PropTypes {
  session?: any;
}

class Profile extends Component<PropTypes> {
  render() {
    const { session } = this.props;
    return (
      <NavbarItem>
        <span className="header-navbar-item">
          {session ? session.fullname : 'Administrator'}
        </span>
        <Image
          isSize="32x32"
          className="img-rounded"
          src={
            session && session.profile_picture !== ''
              ? session.profile_picture
              : '/../images/blank-profile.png'
          }
        />
      </NavbarItem>
    );
  }
}

export default Profile;
