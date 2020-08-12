import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tag } from 'bloomer';
import { Link } from 'react-router-dom';
import { globalFilterTypeObj } from 'store/globalState';
import { ApplicationState } from 'store/rootState';
import Pagination from 'components/commons/pagination';
import { OTIFList } from 'store/otif/types';
import { getDataList } from 'store/otif/actions';
import { withHooksHOC } from 'components/withHooksHOC';
import { dateFormatter, formatDiffFromMinutes } from 'utils/helper';

interface IProps {
  state: globalFilterTypeObj;
  dataOTIFList?: OTIFList;
  onChangePage?: any;
  onChangeFilter?: any;
}

interface PropsFromDispatch {
  getDataList?: typeof getDataList;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  pageLimit: any;
  totalPages: any;
  pagesToShow: any;
  currentPage: any;
  initialPage: any;
}

class TableList extends Component<AllProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      totalPages: 0,
      pageLimit: 10,
      pagesToShow: 3,
      currentPage: 1,
      initialPage: 1,
    };
  }

  componentDidMount() {
    const { getDataList } = this.props;
    const { currentPage } = this.state;

    if (getDataList) {
      getDataList({
        params: {
          page: currentPage,
        },
      });
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevProps.state.globalFilter !== this.props.state.globalFilter ||
      prevProps.onChangeFilter !== this.props.onChangeFilter
    ) {
      const { getDataList, onChangeFilter } = this.props;
      const { currentPage } = this.state;

      if (getDataList) {
        getDataList({
          params: {
            page: currentPage,
            ...onChangeFilter,
          },
        });
      }
    }
  }

  onChangePage = data => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
    });
    this.props.onChangePage(data.page);
  };

  buildTable() {
    const { dataOTIFList } = this.props;
    const { pageLimit, pagesToShow, totalPages, initialPage } = this.state;

    const totalHal: any =
      (dataOTIFList && dataOTIFList.total_page) || totalPages;

    return (
      <>
        <Table isStriped isFullWidth className="table-list">
          <thead>
            <tr>
              <th>Job Order No</th>
              <th>From</th>
              <th>To</th>
              <th>Truck Type</th>
              <th>License Plate</th>
              <th>Transporter</th>
              <th>Date Completed</th>
              <th>Lead Time</th>
              <th>KPI Diff</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {dataOTIFList &&
              dataOTIFList.data.map(itemAPI => (
                <tr>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      {itemAPI.job_order_number}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      {itemAPI.from}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      {itemAPI.to}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      {itemAPI.truck_type}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      {itemAPI.license_plate}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      {itemAPI.transporter}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      {dateFormatter(itemAPI.date_completed)}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      <Tag isColor="primary">
                        {formatDiffFromMinutes(itemAPI.total_leadtime)}
                      </Tag>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      <Tag isColor="primary">
                        {formatDiffFromMinutes(itemAPI.total_kpi)}
                      </Tag>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/order-detail/` + itemAPI.job_order_number}>
                      <Tag isColor="primary">
                        {itemAPI.ticket_count} Ticket(s)
                      </Tag>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Pagination
          totalRecords={totalHal * pageLimit}
          pageLimit={pageLimit}
          initialPage={initialPage}
          pagesToShow={pagesToShow}
          onChangePage={this.onChangePage}
        />
      </>
    );
  }

  render() {
    return this.buildTable();
  }
}

const mapStateToProps = ({ OTIF }: ApplicationState) => ({
  loading: OTIF.loading,
  errors: OTIF.errors,
  dataOTIFList: OTIF.dataOTIFList,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataList,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(TableList),
);
