import React, { Component } from 'react';
import { Container } from 'bloomer';
import HeadingWithButtons from '../commons/headingWithButtons';

interface State {
  isTransitioned: boolean;
}

function PageWithTransitions(WrappedComponent, name: string, link?: string) {
  return class extends Component<{}, State> {
    constructor(props) {
      super(props);
      this.state = {
        isTransitioned: false,
      };
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          isTransitioned: true,
        });
      }, 100);
    }

    render() {
      const { isTransitioned } = this.state;
      const width = window.innerWidth > 780 ? 'is-transitioned' : 'wider';
      return (
        <div
          className={`has-background-white has-transition-width ${
            isTransitioned ? width : ''
          }`}
        >
          <Container isFluid>
            <HeadingWithButtons
              space
              title={name}
              chartLink={`/${link || name.toLowerCase()}`}
            />
          </Container>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

export default PageWithTransitions;
