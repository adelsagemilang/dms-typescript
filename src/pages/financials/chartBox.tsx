import React, { Component } from 'react';
import { Title } from 'bloomer';

interface PropTypes {
  title: string;
  children: JSX.Element;
  customClass?: string;
}

interface StateTypes {
  isLoading: boolean;
}

class ChartBox extends Component<PropTypes, StateTypes> {
  render() {
    const { title, children, customClass } = this.props;
    return (
      <div className={`box outline-primary box-chart ${customClass}`}>
        <Title isSize={5} className="has-text-primary">
          {title}
        </Title>
        {children}
      </div>
    );
  }
}

export default ChartBox;
