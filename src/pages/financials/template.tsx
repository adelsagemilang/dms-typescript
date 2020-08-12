import React, { Component } from 'react';
import PageWithTransitions from 'components/hoc/pageWithTransitions';
import { Container, Columns, Column, PanelBlock } from 'bloomer';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { mapStateToProps, mapDispatchProps } from 'pages/financials';
import ContentLoaders from 'components/loader/content';
import AveragePrice from './partials/averagePrice';
import TotalCost from './partials/totalCost';
import 'styles/sass/pages/financials.sass';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchProps;

const TotalOrder = loadable(() =>
  pMinDelay(import('./partials/totalOrder'), 1000),
);

class Financials extends Component<Props, {}> {
  componentDidMount() {
    this.props.getTotalCosts();
    this.props.getAveragePrice();
    this.props.getTotalOrder();
    this.props.getSummary();
  }

  render() {
    const { totalCost, averagePrice, totalOrder } = this.props.financial;
    const { monthYear } = this.props;

    return (
      <Container isFluid>
        <PanelBlock className="no-border">
          <Columns className="is-fullwidth">
            <Column isSize={8}>
              <TotalCost
                series={totalCost.chartData.data}
                loading={totalCost.isLoading}
                monthYear={monthYear}
              />
              <AveragePrice
                series={averagePrice.chartData.data}
                loading={averagePrice.isLoading}
                monthYear={monthYear}
              />
            </Column>
            <Column isSize={4}>
              <div className="box outline-primary full-height flex-column total-order">
                {totalOrder.isLoading ? (
                  <ContentLoaders height={400} width={397} />
                ) : (
                  <TotalOrder
                    totalOrder={this.props.totalOrder}
                    data={totalOrder.data}
                    loading={totalOrder.isLoading}
                    fallback={<ContentLoaders height={400} width={397} />}
                  />
                )}
              </div>
            </Column>
          </Columns>
        </PanelBlock>
      </Container>
    );
  }
}

const FinancialsComponent = PageWithTransitions(
  Financials,
  'Money & Financials',
  'financials',
);

export default FinancialsComponent;
