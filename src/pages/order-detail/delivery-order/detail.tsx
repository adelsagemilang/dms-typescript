import React, { Component } from 'react';
import { Columns, Column, Title, Field, Label, Control } from 'bloomer';
import 'styles/sass/pages/order-detail.sass';
import Popup from 'reactjs-popup';
import PMDeliveryOrderList from './list';
import { DeliveryOrder, OrderDetail } from 'store/order-detail/types';

type Props = {
  open: boolean;
  deliveryOrder?: DeliveryOrder;
  total_item?: number;
  detail?: OrderDetail;
  destination?: string;
  total_weight?: number;
  total_volume?: number;
  onClose?: any;
};

type State = {
  open: any;
  onClick?: boolean;
  onClose?: boolean;
};

export default class PMDeliveryOrderDetail extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      open: false,
    };
  }

  closeModal() {
    this.setState({
      open: false,
    });
    localStorage.setItem('setPop', 'false');
  }
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      open: !this.props.open,
    });
  };

  render() {
    const { deliveryOrder, destination } = this.props;

    return (
      <Popup
        open={this.props.open}
        closeOnDocumentClick
        onClose={this.closeModal}
        className="delivery-order"
      >
        <div className="modal-box">
          <button className="close pointer" onClick={this.onClose.bind(this)}>
            &times;
          </button>
          <Columns className="header">
            <Column isSize={7}>
              <Title isSize={5}>List Item</Title>
            </Column>
            <Column isSize={3}>
              <Field>
                <Label>No. Delivery Order</Label>
                <Control>
                  {deliveryOrder && deliveryOrder.deliveryorderseqno}
                </Control>
              </Field>
            </Column>
            <Column isSize={3}>
              <Field>
                <Label>Dikirim ke</Label>
                <Control>{destination && destination}</Control>
              </Field>
            </Column>
          </Columns>

          <div className="details">
            {deliveryOrder &&
              deliveryOrder.delivery_order_list.map(row => (
                <PMDeliveryOrderList
                  name={row.commodityitemname}
                  qty={row.itemqty}
                  volume={row.width * row.length * row.height}
                  weight={row.weight}
                ></PMDeliveryOrderList>
              ))}
          </div>
          <Columns>
            <Column>
              <Field>
                <Label>Notes</Label>
                <Control>
                  {deliveryOrder ? deliveryOrder.delivery_order_remarks : ''}
                </Control>
              </Field>
            </Column>
          </Columns>
        </div>
      </Popup>
    );
  }
}
