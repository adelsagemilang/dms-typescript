import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { history } from 'utils/history';

interface PropTypes {
  isShowBackButton?: boolean;
  showBackButton?: any;
}

class BackButton extends Component<PropTypes> {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleBack() {
    history.goBack();
    // this.props.showBackButton(false);
  }

  render() {
    const { isShowBackButton } = this.props;
    return (
      <div id="bg-primary" className="align-center">
        {isShowBackButton ? (
          <div className="pointer align-center" onClick={this.handleBack}>
            <img src="/images/back-button.svg" alt="square" />
          </div>
        ) : (
          <img
            src="/../images/square.svg"
            alt="square"
            className="hover-menu"
          />
        )}
      </div>
    );
  }
}

export default BackButton;
