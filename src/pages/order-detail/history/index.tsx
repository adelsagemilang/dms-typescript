import React from 'react';
import HistoryList from './list';
import {
  orderStateActive,
  orderStateLabel,
  orderStateDetail,
} from 'constants/index';
import { indexOrderState } from 'utils/helper';
import 'styles/sass/pages/order-detail.sass';

interface IProps {
  loading?: boolean;
  historyOrder?: any;
  detail?: any;
  errors?: string;
}

interface IState {
  showMoreText: string;
  showMore: boolean;
}

class HistoryIndex extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showMoreText: 'Show More',
      showMore: true,
    };
  }

  showMore = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (this.state.showMore) {
      this.setState({
        showMoreText: 'Show Less',
        showMore: false,
      });
    } else {
      this.setState({
        showMoreText: 'Show More',
        showMore: true,
      });
    }
  };

  render() {
    const { historyOrder, detail } = this.props;

    return (
      <>
        <span className="title-history">Full History</span>

        <div className="histories">
          <HistoryList
            state="New"
            has_data={false}
            status="active"
            icon="/images/stat-active.svg"
            actual={detail ? detail.actual_prev_date : ''}
          />

          {historyOrder &&
            orderStateActive.map((os, index) => {
              return this.state.showMore && index > 2 ? (
                ''
              ) : (
                <HistoryList
                  state={orderStateLabel[indexOrderState(os)]}
                  has_data={true}
                  {...historyOrder[orderStateDetail[indexOrderState(os)]]}
                />
              );
            })}
        </div>

        <div className="show-more">
          <span className="pointer" onClick={this.showMore}>
            {this.state.showMoreText}
          </span>
        </div>
      </>
    );
  }
}

export default HistoryIndex;
