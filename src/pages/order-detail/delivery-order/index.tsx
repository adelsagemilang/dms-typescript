import React from 'react';
import { Columns, Column, Field, Label, Control } from 'bloomer';

import 'styles/sass/pages/order-detail.sass';
import { connect } from 'react-redux';
import { ApplicationState } from 'store/rootState';
import PMDeliveryOrderDetail from './detail';
import Moment from 'react-moment';
import { wordLimit } from 'utils/helper';

interface PropsFromState {
  loading?: boolean;
  deliveryOrder?: any;
  destination?: any;
  errors?: string;
}

interface State {
  open: boolean;
}
type AllProps = PropsFromState;

class DeliveryOrderIndex extends React.Component<AllProps, State> {
  constructor(props: AllProps, state: State) {
    super(props);
    this.state = {
      open: false,
    };
  }
  state = {
    open: false,
  };
  openDetail() {
    this.setState(
      {
        open: true,
      },
      () => {
        this.forceUpdate();
      },
    );
  }
  showDetail = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    const { deliveryOrder, destination } = this.props;
    let total_item = 0;
    let total_weight = 0;
    let total_volume = 0;
    if (deliveryOrder) {
      for (var i = 0; i < deliveryOrder.length; i++) {
        total_weight += (deliveryOrder[i].weight * deliveryOrder[i].qty) / 1000;
        total_item++;
        total_volume =
          total_volume +
          deliveryOrder[i].width *
            deliveryOrder[i].length *
            deliveryOrder[i].height;
      }
    }

    return (
      <>
        {deliveryOrder && Object.keys(deliveryOrder).length > 0 ? (
          <>
            <PMDeliveryOrderDetail
              open={this.state.open}
              {...this.props}
              total_weight={total_weight}
              total_item={total_item}
              total_volume={total_volume}
              onClose={this.showDetail}
            ></PMDeliveryOrderDetail>
            <Control
              className="delivery-order pointer"
              onClick={() => this.showDetail()}
            >
              <Columns>
                <Column isSize={1}>
                  <Field>
                    <Label>DO No.</Label>
                    <Control>
                      {deliveryOrder ? deliveryOrder.deliveryorderseqno : ''}
                    </Control>
                  </Field>
                </Column>
                <Column isSize={2}>
                  <Field>
                    <Label>To</Label>
                    <Control>
                      {destination && wordLimit(destination, 12)}
                    </Control>
                  </Field>
                </Column>
                <Column isSize={2}>
                  <Field>
                    <Label>Total Volume</Label>
                    <Control>
                      {deliveryOrder
                        ? parseFloat(deliveryOrder.total_volume)
                        : ''}{' '}
                      cm3
                    </Control>
                  </Field>
                </Column>
                <Column isSize={2}>
                  <Field>
                    <Label>Total Weight</Label>
                    <Control>
                      {deliveryOrder
                        ? parseFloat(deliveryOrder.total_weight) / 1000
                        : ''}{' '}
                      kg
                    </Control>
                  </Field>
                </Column>
                <Column isSize={2}>
                  <Field>
                    <Label>Total Items</Label>
                    <Control>
                      {deliveryOrder ? deliveryOrder.total_item : ''} Items
                    </Control>
                  </Field>
                </Column>
                <Column isSize={3}>
                  <Field>
                    <Label>Notes</Label>
                    <Control>
                      {deliveryOrder ? wordLimit(deliveryOrder.notes, 22) : ''}
                    </Control>
                  </Field>
                  <small className="date">
                    <Moment format="DD MMMM YYYY HH:mm">
                      {deliveryOrder.created_at}
                    </Moment>
                  </small>
                </Column>
              </Columns>
            </Control>
          </>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = ({ orderDetail }: ApplicationState) => ({
  loading: orderDetail.loading,
  errors: orderDetail.errors,
});

export default connect(mapStateToProps)(DeliveryOrderIndex);
