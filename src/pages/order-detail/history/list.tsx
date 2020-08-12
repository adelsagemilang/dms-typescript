import React, { Component } from 'react';
import { Columns, Column, Title } from 'bloomer';
import Moment from 'react-moment';
import 'styles/sass/pages/order-detail.sass';
import {
  formatDiffFromMinutes,
  formatFromMinutes,
  calculateKpi,
} from 'utils/helper';

type Props = {
  state: string;
  pic?: string;
  lead_time?: number;
  diff?: number;
  kpi?: number;
  actual?: string;
  estimate?: string;
  actual_prev?: string;
  has_data?: boolean;
  icon?: string;
  status?: string;
};

export default class PMHistoryList extends Component<Props> {
  render() {
    const {
      state,
      pic,
      kpi,
      diff,
      actual,
      has_data,
      estimate,
      actual_prev,
      icon,
      status,
    } = this.props;

    return (
      <>
        {has_data === undefined || has_data === true ? (
          <Columns
            className={
              calculateKpi(estimate, actual) < 0 ? 'history alert' : 'history'
            }
          >
            <Column isSize={4}>
              <Columns>
                <Column isSize={2} className="icon">
                  <img
                    alt="stat"
                    src={
                      calculateKpi(estimate, actual) < 0
                        ? '/images/stat-alert.svg'
                        : '/images/stat-active.svg'
                    }
                  />
                </Column>
                <Column className="detail">
                  <Title>{state}</Title>
                </Column>
              </Columns>
            </Column>
            <Column isSize={2}>
              <Title>{pic}</Title>
            </Column>
            <Column isSize={2}>
              <Title>{diff && formatFromMinutes(diff)}</Title>
            </Column>
            <Column isSize={2} className="kpi">
              <Title>{kpi && formatDiffFromMinutes(kpi)}</Title>
            </Column>
            <Column>
              <Title>
                <Moment format="DD MMMM YYYY HH:mm">{actual}</Moment>
              </Title>
            </Column>
          </Columns>
        ) : (
          <Columns className={(status ? status : 'empty') + ' history'}>
            <Column isSize={4}>
              <Columns>
                <Column isSize={2} className="icon">
                  <img
                    alt="stat"
                    src={
                      icon
                        ? icon
                        : actual_prev
                        ? '/images/stat-inprogress.svg'
                        : '/images/stat-inactive.svg'
                    }
                  />
                </Column>
                <Column className="detail">
                  <Title>{state}</Title>
                  <small>
                    {actual ? (
                      <Moment format="DD MMMM YYYY HH:mm">{actual}</Moment>
                    ) : (
                      ''
                    )}
                  </small>
                </Column>
              </Columns>
            </Column>
          </Columns>
        )}
        {has_data === false ? (
          <Columns className="history header">
            <Column isSize={4}></Column>
            <Column isSize={2}>PIC</Column>
            <Column isSize={2}>Lead Time</Column>
            <Column isSize={2}>KPI</Column>
            <Column>Actual Time</Column>
          </Columns>
        ) : (
          ''
        )}
      </>
    );
  }
}
