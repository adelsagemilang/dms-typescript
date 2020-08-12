import * as React from 'react';
import { Columns, Column, Container, Hero, HeroBody } from 'bloomer';
import FormLogin from '../../components/login/form/login-form';
import SliderLogin from '../../components/login/slider/login-slider';
import 'styles/sass/pages/login.sass';

export interface LoginProps {
  data: any;
  errors: any;
  loading: boolean;
  auth: any;
}

class LoginComponent extends React.Component<LoginProps, {}> {
  render() {
    return (
      <Columns isCentered>
        <Column id="login-container" isSize={7}>
          <Hero isFullHeight>
            <HeroBody>
              <Container hasTextAlign="centered">
                <FormLogin />
              </Container>
            </HeroBody>
          </Hero>
        </Column>
        <Column id="slider-container" isSize={5}>
          <Hero isFullHeight>
            <HeroBody>
              <Container hasTextAlign="centered" isFluid>
                <SliderLogin />
              </Container>
            </HeroBody>
          </Hero>
        </Column>
      </Columns>
    );
  }
}

export default LoginComponent;
