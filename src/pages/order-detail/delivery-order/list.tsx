import React, { Component } from 'react';
import { Columns, Column, Field, Label, Control } from 'bloomer';
import 'styles/sass/pages/order-detail.sass';

type Props = {
  name: string;
  qty: number;
  volume: number;
  weight: number;
};

export default class PMDeliveryOrderList extends Component<Props> {
  render() {
    return (
      <Columns>
        <Column>
          <Field>
            <Label>Name</Label>
            <Control>{this.props.name}</Control>
          </Field>
        </Column>
        <Column isSize={2}>
          <Field>
            <Label>Kuantitas</Label>
            <Control>{this.props.qty}</Control>
          </Field>
        </Column>
        <Column isSize={2}>
          <Field>
            <Label>Total Volume</Label>
            <Control>{this.props.volume} cm3</Control>
          </Field>
        </Column>
        <Column isSize={2}>
          <Field>
            <Label>Total Weight</Label>
            <Control>{(this.props.weight * this.props.qty) / 1000} kg</Control>
          </Field>
        </Column>
      </Columns>
    );
  }
}
