import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './kpi-progress.sass';
import moment from 'moment';
import {
  formatFromMinutes,
  formatDiffFromMinutes,
  calculateKpi,
  calculateDiff,
  isEqual,
} from 'utils/helper';

// import { withHooksHOC, withHooksContext } from '../../components/withHooksHOC'
// import { globalFilterObjType } from '../../store/setting-modal/states';

type KpiState = {
  kpi: number;
  diff: number;
  estimate: any;
  actual: any;
  actual_prev: any;
  prev: any;
};

type KpiProps = {
  estimate?: any;
  actual?: any;
  actual_prev?: any;
  prev: any;
  filterData?: any;
  // state: globalFilterObjType
  indexProps?: any;
};

class KpiProgress extends Component<KpiProps, KpiState> {
  intervalID = 0;

  constructor(props: Readonly<KpiProps>) {
    super(props);
    this.state = {
      kpi: 0,
      diff: 0,
      estimate: this.props.estimate,
      actual: this.props.actual,
      actual_prev: this.props.actual_prev,
      prev: this.props.prev,
    };
  }

  componentDidMount() {
    if (!this.props.estimate) {
      this.setState(({ estimate, actual, prev, actual_prev }) => ({
        diff: calculateDiff(actual, actual_prev),
        kpi: 0,
      }));
    } else if (!this.props.actual_prev) {
      this.setState(({ estimate, actual, prev, actual_prev }) => ({
        diff: calculateDiff(actual, actual_prev),
        kpi: calculateKpi(estimate, moment()),
      }));
    } else if (!this.props.actual) {
      // this.intervalID = setInterval(() => {
      //   this.setState(({ estimate, prev, actual_prev }) => ({
      //     diff: calculateDiff(moment(), actual_prev),
      //     kpi: calculateKpi(estimate, moment())
      //   }))
      // }, 1000)
    } else {
      this.setState(({ estimate, actual, prev, actual_prev }) => ({
        diff: calculateDiff(actual, actual_prev),
        kpi: calculateKpi(estimate, actual),
      }));
    }
  }

  changeState(
    diff: number,
    change_diff: number,
    kpi: number,
    change_kpi: number,
  ) {
    if (diff != change_diff) {
      this.setState({
        diff: change_diff,
      });
    }
    if (kpi != change_kpi) {
      this.setState({
        kpi: change_kpi,
      });
    }
  }

  checkKpi() {
    const { actual, actual_prev, estimate } = this.props;
    const { diff, kpi } = this.state;
    clearInterval(this.intervalID);
    let change_diff;
    let change_kpi;
    if (!estimate) {
      change_diff = calculateDiff(actual, actual_prev);
      change_kpi = 0;
      this.changeState(diff, change_diff, kpi, change_kpi);
    } else if (!actual_prev) {
      change_diff = calculateDiff(actual, actual_prev);
      change_kpi = calculateKpi(estimate, moment());
      this.changeState(diff, change_diff, kpi, change_kpi);
    } else if (!actual) {
      // this.intervalID = setInterval(() => {
      //   change_diff = calculateDiff(moment(), actual_prev)
      //   change_kpi = calculateKpi(estimate, moment())
      //   this.changeState(diff, change_diff, kpi, change_kpi)
      // }, 1000)
    } else {
      change_diff = calculateDiff(actual, actual_prev);
      change_kpi = calculateKpi(estimate, actual);
      this.changeState(diff, change_diff, kpi, change_kpi);
    }
  }

  render() {
    const { actual, actual_prev, estimate } = this.props;
    const { kpi, diff } = this.state;
    const durationLead = Math.floor(
      moment.duration(moment().diff(moment(actual_prev))).asMinutes(),
    );
    const durationKpi = Math.floor(
      moment.duration(moment(estimate).diff(moment(actual_prev))).asMinutes(),
    );
    const valueProgress = (durationLead / durationKpi) * 100;
    if (this.state.actual != this.props.actual) {
      this.checkKpi();
    }
    const kpiClass = kpi > 0 ? 'success' : 'error';
    const kpiStyle = {
      width: `${
        valueProgress > 100 ||
        valueProgress === 0 ||
        kpiClass === 'error' ||
        actual
          ? 100
          : valueProgress
      }%`,
    };
    let pm;
    if (!actual && !actual_prev) {
      pm = (
        <>
          <br />
          <div className="kpi-progress inactive">
            <div className="progress-value">
              {estimate ? formatDiffFromMinutes(kpi) : 0}
            </div>
          </div>
        </>
      );
    } else {
      pm = (
        <>
          {formatFromMinutes(diff)}
          <br />
          <div className={`kpi-progress ${kpiClass}`}>
            <div className="progress-value" style={kpiStyle}>
              {formatDiffFromMinutes(kpi)}
            </div>
          </div>
        </>
      );
    }

    return <>{pm}</>;
  }
}

export default KpiProgress;
// export default withHooksHOC(KpiProgress);
