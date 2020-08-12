import React from 'react';
import _ from 'lodash';
import { Title } from 'bloomer';

const TotalOrder = props => {
  const { moneyFormatter } = window.helpers;
  return (
    <>
      <div className="full-flex flex-column">
        <div className="full-flex">
          <Title className="has-text-light is-size-6">Total Cost</Title>
          <Title isSize={2} className="has-text-primary p-l-30 p-t-20 p-b-40">
            {_.isUndefined(props.data.total_cost)
              ? 0
              : moneyFormatter(props.data.total_cost)}
          </Title>
        </div>
        <div className="full-flex">
          <Title className="has-text-light is-size-6">Average Price</Title>
          <Title isSize={2} className="has-text-secondary p-l-30 p-t-20 p-b-40">
            {_.isUndefined(props.data.average_price)
              ? 0
              : moneyFormatter(props.data.average_price)}
          </Title>
        </div>
      </div>
      <div className="box-footer flex-space has-background-primary">
        <Title className="has-text-white is-size-5 m-0">Total Order</Title>
        <Title className="has-text-white is-size-4 m-0">
          {props.totalOrder}
        </Title>
      </div>
    </>
  );
};

export default TotalOrder;
