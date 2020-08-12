import React, { Component } from 'react';
import Slider from 'react-slick';
import { Columns, Column, Title, Subtitle } from 'bloomer';
import 'styles/sass/pages/login.sass';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class SliderLogin extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    return (
      <Columns isCentered>
        <Column isSize="1/2" id="login-slider">
          <Slider {...settings}>
            <div>
              <img src="/../images/monitoring.svg" alt="monitoring" />
              <Title>Monitoring</Title>
              <Subtitle>
                View all your orders in progress in one single platform
              </Subtitle>
            </div>
            <div>
              <img src="/../images/tracking.svg" alt="tracking" />
              <Title>Tracking</Title>
              <Subtitle>
                Tracking your orders position, and estimate the arrival
              </Subtitle>
            </div>
            <div>
              <img src="/../images/progress.svg" alt="progress" />
              <Title>Progress</Title>
              <Subtitle>
                Detect abnormalities quickly and make the action
              </Subtitle>
            </div>
            <div>
              <img src="/../images/history.svg" alt="history" />
              <Title>History</Title>
              <Subtitle>
                View your completed orders and do the evaluations
              </Subtitle>
            </div>
          </Slider>
        </Column>
      </Columns>
    );
  }
}
