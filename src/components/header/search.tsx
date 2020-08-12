import React, { Component } from 'react';
import { NavbarItem, Field, Control, Icon, Input } from 'bloomer';

const submitHandler = () => {
  // console.log('searching...')
};

class Search extends Component {
  render() {
    return (
      <NavbarItem>
        <Field>
          <Control hasIcons="right">
            <form onSubmit={submitHandler} action="/search">
              <Input
                type="text"
                name="search-header"
                className="header-search-input"
                placeholder="Search..."
              />
              <Icon
                isSize="small"
                isAlign="right"
                className="fa fa-search header-search-icon"
                aria-hidden="true"
                onClick={submitHandler}
              />
            </form>
          </Control>
        </Field>
      </NavbarItem>
    );
  }
}

export default Search;
