import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Column, Columns, Field, Label, Control, Title } from 'bloomer';
import DeliveryOrderIndex from 'pages/order-detail/delivery-order';
import DestinationIndex from 'pages/order-detail/destination';
import HistoryIndex from 'pages/order-detail/history';
import { ApplicationState } from 'store/rootState';
import { globalFilterTypeObj } from 'store/globalState';
import { OrderDetail as OrderDetailTypes } from 'store/order-detail/types';
import { getOrderDetail } from 'store/order-detail/actions';
import { withHooksHOC } from 'components/withHooksHOC';
import {
  formatDiffFromMinutes,
  latestTicket,
  formatFromMinutes,
  historyWrapper,
} from 'utils/helper';
import Maps from 'components/maps';
import { mapDispatchProps } from 'pages/order-detail';

interface IProps {
  state: globalFilterTypeObj;
  dataOrderDetail?: OrderDetailTypes;
}

interface PropsFromDispatch {
  getOrderDetail?: typeof getOrderDetail;
}

interface RouteParams {
  uuid: string;
}

type AllProps = IProps &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  typeof mapDispatchProps;

class OrderDetail extends React.Component<AllProps> {
  constructor(props) {
    super(props);
    this.props.showBackButton(true);
    this.props.showViewSettings(false);
  }

  componentDidMount() {
    const { match, getOrderDetail } = this.props;

    if (getOrderDetail) {
      getOrderDetail({
        uuid: match.params.uuid,
      });
    }
  }

  render() {
    const { dataOrderDetail } = this.props;

    return (
      <Columns className="order-detail-container background-grey">
        <Column isSize="1/2" className="detail-job-order">
          <Columns className="job-order">
            <Column isSize={4}>
              <Field>
                <Label>Job Order No.</Label>
                <Control className="job-order-no">
                  {(dataOrderDetail &&
                    'LG-' + dataOrderDetail.job_order_number) ||
                    '-'}
                </Control>
              </Field>
            </Column>
            <Column isSize={4}>
              <Field>
                <Label>License Plate</Label>
                <Control className="license-plate">
                  {(dataOrderDetail && dataOrderDetail.vehicle_license_no) ||
                    '-'}
                </Control>
              </Field>
            </Column>
            <Column isSize={4}>
              <Field>
                <Label>Truck Type</Label>
                <Control>
                  {(dataOrderDetail && dataOrderDetail.vehicle_type) || '-'}
                </Control>
              </Field>
            </Column>
          </Columns>
          <Columns className="job-order">
            <Column isSize={4}>
              <Field>
                <Label>Cargo Owner</Label>
                <Control>
                  {(dataOrderDetail && dataOrderDetail.company_creator_name) ||
                    '-'}
                </Control>
              </Field>
            </Column>
            <Column isSize={4}>
              <Field>
                <Label>Driver</Label>
                <Control>
                  {(dataOrderDetail && dataOrderDetail.driver_name) || '-'}
                </Control>
              </Field>
            </Column>
            <Column isSize={4}>
              <Field>
                <Label>Insurance</Label>
                <Control>
                  {(dataOrderDetail && dataOrderDetail.insurance) || '-'}
                </Control>
              </Field>
            </Column>
          </Columns>
          <Columns className="job-order">
            <Column isSize={4}>
              <Field>
                <Label>Transporter</Label>
                <Control>
                  {(dataOrderDetail && dataOrderDetail.company_executor_name) ||
                    '-'}
                </Control>
              </Field>
            </Column>
            <Column isSize={4}>
              <Field>
                <Label>Time Left</Label>
                <Control
                  className={
                    dataOrderDetail && dataOrderDetail.time_left > 0
                      ? 'error-label'
                      : ''
                  }
                >
                  {dataOrderDetail && dataOrderDetail.time_left
                    ? formatDiffFromMinutes(dataOrderDetail.time_left)
                    : '-'}
                </Control>
              </Field>
            </Column>
            <Column isSize={4}>
              <Field>
                <Label>Total Lead Time</Label>
                <Control>
                  {dataOrderDetail && dataOrderDetail.total_leadtime
                    ? formatFromMinutes(dataOrderDetail.total_leadtime)
                    : '0'}
                </Control>
              </Field>
            </Column>
          </Columns>

          {dataOrderDetail && dataOrderDetail.delivery_order.length ? (
            <Columns>
              <Column isSize={12}>
                <Field>
                  <Label>Delivery Order</Label>
                  {dataOrderDetail.delivery_order.map((os: any) => (
                    <DeliveryOrderIndex
                      destination={dataOrderDetail.to.name}
                      deliveryOrder={os}
                    ></DeliveryOrderIndex>
                  ))}
                </Field>
              </Column>
            </Columns>
          ) : (
            ''
          )}

          <DestinationIndex
            detail={dataOrderDetail}
            extraPick={dataOrderDetail && dataOrderDetail.extra_pick}
            extraDrop={dataOrderDetail && dataOrderDetail.extra_drop}
          ></DestinationIndex>
          <HistoryIndex
            historyOrder={dataOrderDetail && historyWrapper(dataOrderDetail)}
          ></HistoryIndex>
        </Column>
        <Column isSize="1/2" id="shipment-tracking">
          <Maps
            jobOrder={dataOrderDetail ? dataOrderDetail.job_order_number : '0'}
          />
          <div id="overlay-maps-content">
            <Title>Shipment Tracking</Title>
            <Columns>
              <Column>
                <Field>
                  <Label>Ticket:</Label>
                  <Control>
                    {dataOrderDetail &&
                      latestTicket(dataOrderDetail.ticket).desc}
                  </Control>
                </Field>
              </Column>
              <Column>
                <Field>
                  <Label>Last Update:</Label>
                  <Control>
                    {dataOrderDetail &&
                      latestTicket(dataOrderDetail.ticket).last_update}
                  </Control>
                </Field>
              </Column>
            </Columns>
          </div>
        </Column>
      </Columns>
    );
  }
}

const mapStateToProps = ({ orderDetail }: ApplicationState) => ({
  loading: orderDetail.loading,
  errors: orderDetail.errors,
  dataOrderDetail: orderDetail.dataOrderDetail,
});

const mapDispatchToProps: PropsFromDispatch = {
  getOrderDetail,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetail),
);
