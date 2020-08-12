import React from 'react';
import { Columns, Column } from 'bloomer';
import 'styles/sass/pages/order-detail.sass';
import DestinationList from './list';
import { ExtraPickDrop, OrderDetail } from 'store/order-detail/types';

interface IProps {
  loading?: boolean;
  extraPick?: ExtraPickDrop[];
  extraDrop?: ExtraPickDrop[];
  errors?: string;
  detail?: OrderDetail;
}

class DestinationIndex extends React.Component<IProps> {
  render() {
    const { detail, extraPick, extraDrop } = this.props;
    return (
      <div className="states m-b-40 m-t-40">
        {detail ? (
          <Columns className="state">
            <Column isSize={4}>
              <DestinationList
                type="From"
                destination={detail.from.name}
                warehouse_name={detail.from.region}
                address={detail.from.address}
              ></DestinationList>
            </Column>
            <Column isSize={2}>
              <img
                src={'/../images/dots.svg'}
                alt="dots-icon"
                className="m-t-30"
              />
            </Column>
            <Column isSize={4}>
              <DestinationList
                type="To"
                destination={detail.to.name}
                warehouse_name={detail.to.region}
                address={detail.to.address}
              ></DestinationList>
            </Column>
          </Columns>
        ) : (
          ''
        )}

        {extraPick &&
          extraPick.map(row => (
            <Columns className="state">
              <Column isSize={4}>
                <DestinationList
                  icon="/images/stat-inactive.svg"
                  type="Extra Pickup"
                  address={row.location_address}
                  warehouse_name={row.location_name}
                  destination={row.location_name}
                />
              </Column>
            </Columns>
          ))}

        {extraDrop &&
          extraDrop.map(row => (
            <Columns className="state">
              <Column isSize={4}>
                <DestinationList
                  icon="/images/stat-inactive.svg"
                  type="Extra Drop"
                  address={row.location_address}
                  warehouse_name={row.location_name}
                  destination={row.location_name}
                />
              </Column>
            </Columns>
          ))}
      </div>
    );
  }
}

export default DestinationIndex;
