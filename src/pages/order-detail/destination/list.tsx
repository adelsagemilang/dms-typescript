import React, { Component } from 'react';
import { Columns, Column, Title, Subtitle } from 'bloomer';
import 'styles/sass/pages/order-detail.sass';

type Props = {
  type: string;
  destination: string;
  warehouse_name: string;
  address: string;
  icon?: string;
};

export default class DestinationList extends Component<Props> {
  render() {
    return (
      <Columns className="destination">
        <Column>
          <Columns>
            <Column isSize={2}>
              <img
                src={this.props.icon || '/images/stat-active.svg'}
                alt="stat"
              />
            </Column>
            <Column className="detail">
              <span>{this.props.type}</span>
              <Title>{this.props.warehouse_name}</Title>
              <Subtitle>{this.props.destination}</Subtitle>
              <small>{this.props.address}</small>
            </Column>
          </Columns>
        </Column>
      </Columns>
    );
  }
}
