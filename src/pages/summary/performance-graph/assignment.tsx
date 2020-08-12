import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PanelBlock, Box, Title, Columns, Column } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import LinesChart from 'components/chart/lines';
import { getDataKPIAssignment } from 'store/performance-summary/actions';
import { ApplicationState } from 'store/rootState';
import { dataBarLineFixMapper } from 'utils/chart/commons';
import { PerformanceChartAssignment } from '../../../store/performance-summary/types';
import { withHooksHOC } from '../../../components/withHooksHOC';
import { globalFilterTypeObj } from '../../../store/globalState';

interface IProps {
  state: globalFilterTypeObj;
  dataKPIAssignment: PerformanceChartAssignment;
}

interface PropsFromDispatch {
  getDataKPIAssignment?: typeof getDataKPIAssignment;
}

interface IState {
  dataLine: any[];
  currentMonth: any;
}

type AllProps = IProps & PropsFromDispatch;

class Assignment extends Component<AllProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataLine: [],
      currentMonth: this.props.state.globalFilter.month,
    };
  }

  componentDidMount() {
    const { getDataKPIAssignment } = this.props;
    if (getDataKPIAssignment) {
      getDataKPIAssignment();
    }
  }

  // componentDidUpdate() {
  //   if (this.state.currentMonth !== this.props.state.globalFilter.month) {
  //     const newDataBar = dataBarLineMapper(
  //       fakeAPI,
  //       this.props.state.globalFilter.month,
  //       true,
  //     );

  //     this.setState({
  //       dataLine: newDataBar,
  //       currentMonth: this.props.state.globalFilter.month,
  //     });
  //   }
  // }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataKPIAssignment } = this.props;

      if (getDataKPIAssignment) {
        getDataKPIAssignment();
      }
    }
  }

  buildAssignment() {
    const { dataKPIAssignment, state } = this.props;

    if (dataKPIAssignment && dataKPIAssignment.data) {
      const assignmentData: any = dataBarLineFixMapper(
        dataKPIAssignment.data,
        state.globalFilter.month,
        true,
      );

      if (assignmentData && assignmentData.length > 0)
        return (
          <>
            <Title className="is-7 panelblock-header has-background-lightblue has-text-white">
              {dataKPIAssignment.title}
            </Title>
            <div className="padding-5 text-6">
              <LinesChart
                data={assignmentData}
                colors={['#F2716E', '#61B58F', '#FFC534', '#5D62B6']}
                width={400}
                height={175}
                margin={{ top: 0, right: 5, bottom: 0, left: -30 }}
                toPercentage
              />
              <Box id="label-barstack" className="outline-grey">
                <Columns className="is-variable is-1 is-centered">
                  <Column className="has-separator-after">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-danger"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">
                      Assign Transporter
                    </span>
                  </Column>
                  <Column className="has-separator-after">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-success"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">
                      Assign Truck
                    </span>
                  </Column>
                  <Column>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-warning"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">Dispatch</span>
                  </Column>
                </Columns>
              </Box>
            </div>
          </>
        );
    }
  }

  render() {
    return (
      <PanelBlock className="no-border flex-align-stretch">
        <Box className="outline-grey column no-padding">
          {this.buildAssignment()}
        </Box>
      </PanelBlock>
    );
  }
}

const mapStateToProps = ({ performanceSummary }: ApplicationState) => ({
  loading: performanceSummary.loading,
  errors: performanceSummary.errors,
  dataKPIAssignment: performanceSummary.dataKPIAssignment,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataKPIAssignment,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(Assignment),
);
