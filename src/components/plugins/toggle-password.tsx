import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Input, Icon, Button } from 'bloomer';
import './toggle-password.sass';

type PasswordState = {
  hidden: boolean;
  password: string;
};

type PasswordProps = {
  password: string;
  name: string;
  onChangeHandler?: any;
};

class TogglePassword extends Component<PasswordProps, PasswordState> {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      hidden: true,
      password: '',
    };
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
    if (this.props.onChangeHandler) this.props.onChangeHandler(e.target.value);
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  render() {
    return (
      <div className="toggle-password">
        <Input
          name={this.props.name}
          type={this.state.hidden ? 'password' : 'text'}
          value={this.state.password}
          onChange={this.handlePasswordChange}
          {...this.props}
        />
        <Button className="is-white pointer" onClick={this.toggleShow}>
          <Icon
            isSize="medium"
            className={`fa ${this.state.hidden ? 'fa-eye-slash' : 'fa-eye'}`}
          />
        </Button>
      </div>
    );
  }
}

export default TogglePassword;
