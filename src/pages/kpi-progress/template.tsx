import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Columns, Column, Title, Table, Icon } from 'bloomer';
import { mapStateToProps, mapDispatchProps } from 'pages/kpi-progress';
import { formatDiffFromMinutes } from 'utils/helper';
import ReactPaginate from 'react-paginate';
import 'components/plugins/kpi-progress.sass';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchProps;

interface StateTypes {
  pageLimit: any;
  pagesToShow: any;
  currentPage: any;
  initialPage: any;
}

class KPIProgressTable extends Component<Props, StateTypes> {
  constructor(props) {
    super(props);
    autoBind(this);

    props.showBackButton(true);
    props.showViewSettings(false);
    props.getKpiProgress(1);
  }

  onChangePage = page => {
    const nextPage = page.selected + 1;
    this.props.getKpiProgress(nextPage);
  };

  componentWillUnmount() {
    this.props.showViewSettings(true);
  }

  render() {
    const { data, totalPages } = this.props;
    return (
      <Columns id="inner-container">
        <Column>
          <Title>KPI Progress Bar</Title>
          <div className="flex-align-stretch is-fullwidth">
            <div className="table-wrapper left">
              <Table className="pm-table is-fullwidth blue">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>JO No.</th>
                    <th>Total Lead Time</th>
                    <th>Total Time Left</th>
                  </tr>
                </thead>
                <tbody id="pm-body">
                  {data.length > 0 &&
                    data.map((row, index) => (
                      <tr key={index} className="row pointer">
                        <td>{row.from}</td>
                        <td>{row.to}</td>
                        <td>{row.job_order_number}</td>
                        <td>
                          {formatDiffFromMinutes(row.leadtime, false, true)}
                        </td>
                        <td className={row.kpi < 0 ? 'success' : 'error'}>
                          {formatDiffFromMinutes(row.kpi, false, true)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>

            <div className="table-wrapper right">
              <Table className="pm-table common-table">
                <thead>
                  <tr>
                    <th>Transporter</th>
                    <th>Truck</th>
                    <th>Dispatch</th>
                    <th>Arrival</th>
                    <th>Pick Up Inspection</th>
                    <th>Waiting For Loading</th>
                    <th>Loading</th>
                    <th>Gate Out</th>
                    <th>Delivery</th>
                    <th>Drop Off Inspection</th>
                    <th>Waiting For Unloading</th>
                    <th>Unloading</th>
                    <th>Checkout</th>
                  </tr>
                </thead>
                <tbody id="pm-body">
                  {data.length > 0 &&
                    data.map((row, index) => (
                      <tr key={index} className="row pointer">
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.transporter.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.transporter.diff <= row.transporter.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.transporter.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(row.truck.kpi, false, true)}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.truck.diff <= row.truck.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.truck.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.dispatch.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.dispatch.diff <= row.dispatch.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.dispatch.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.arrival.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.arrival.diff <= row.arrival.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.arrival.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.inspection.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.inspection.diff <= row.inspection.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.inspection.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.waiting_loading.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.waiting_loading.diff <= row.waiting_loading.kpi
                                ? 'success'
                                : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.waiting_loading.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.loading.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.loading.diff <= row.loading.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.loading.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.gate_out.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.gate_out.diff <= row.gate_out.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.gate_out.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.delivery.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.delivery.diff <= row.delivery.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.delivery.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.inspection_destination.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.inspection_destination.diff <= row.inspection_destination.kpi
                                ? 'success'
                                : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(
                                row.inspection_destination.diff,
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.waiting_unloading.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.waiting_unloading.diff <= row.waiting_unloading.kpi
                                ? 'success'
                                : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.waiting_unloading.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.unloading.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.unloading.diff <= row.unloading.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.unloading.diff)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="has-text-light has-text-weight-semibold">
                            {formatDiffFromMinutes(
                              row.checkout.kpi,
                              false,
                              true,
                            )}
                          </div>
                          <div
                            className={`kpi-progress m-t-5 ${
                              row.checkout.diff <= row.checkout.kpi ? 'success' : 'error'
                              }`}
                          >
                            <div className="progress-value">
                              {formatDiffFromMinutes(row.checkout.diff)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="table-footer flex-end flex-align-center">
            <span className="has-text-primary title">Page</span>
            <ReactPaginate
              previousLabel={
                <Icon
                  isSize="small"
                  isAlign="left"
                  className="fa fa-chevron-left"
                  aria-hidden="true"
                />
              }
              nextLabel={
                <Icon
                  isSize="small"
                  isAlign="left"
                  className="fa fa-chevron-right"
                  aria-hidden="true"
                />
              }
              pageCount={totalPages}
              onPageChange={this.onChangePage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              containerClassName="pagination paging-table"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
          </div>
        </Column>
      </Columns>
    );
  }
}

export default KPIProgressTable;
