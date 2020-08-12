import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiBarChart } from 'react-icons/fi';
import { PanelBlock, Columns, Column, Title } from 'bloomer';

interface AllProps {
  space?: boolean;
  title: string;
  chartLink: string;
}

class HeadingWithButtons extends Component<AllProps> {
  render() {
    const { space, title, chartLink } = this.props;

    return (
      <PanelBlock className="no-border">
        <Columns className="is-fullwidth flex-align-center">
          <Column className={`is-flex ${!space ? 'max-content' : ''}`}>
            <NavLink
              exact
              to="/"
              className="btn-icon"
              activeClassName="is-primary"
            >
              <FiGrid />
            </NavLink>
            <NavLink
              exact
              to={chartLink}
              className="btn-icon"
              activeClassName="is-primary"
            >
              <FiBarChart className="strong" />
            </NavLink>
          </Column>
          <Column>
            <Title
              isSize={5}
              className={`has-text-light ${
                space ? 'has-text-right' : 'has-text-left'
              }`}
            >
              {title}
            </Title>
          </Column>
        </Columns>
      </PanelBlock>
    );
  }
}

export default HeadingWithButtons;
