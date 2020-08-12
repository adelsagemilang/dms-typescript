import React, { Component } from 'react';
import loadable from '@loadable/component';
import { Columns, Column } from 'bloomer';
import 'styles/sass/pages/summary.sass';
import { mapStateToProps, mapDispatchProps } from 'pages/summary';

/* Code Splitting Example
 * See: https://reactjs.org/docs/code-splitting.html
 * we are using loadable components https://loadable-components.com/
 * as HOC for loadable component
 */

const Quantity = loadable(() => import('./quantity'));

const Performance = loadable(() => import('./performance'));

const Financials = loadable(() => import('./financials'));

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchProps;

class SummaryComponent extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.props.showBackButton(false);
    this.props.showViewSettings(true);
  }

  componentDidMount() {
    this.props.getQuantity();
    this.props.getFinancial();
  }

  render() {
    const {
      isLoadingQuantity,
      quantity,
      isLoadingFinancial,
      financial,
    } = this.props;
    return (
      <>
        <Columns isCentered>
          <Column isSize={3}>
            <Quantity data={quantity} isLoading={isLoadingQuantity} />
          </Column>
          <Column isSize={9}>
            <Performance />
            <Financials data={financial} isLoading={isLoadingFinancial} />
          </Column>
        </Columns>
      </>
    );
  }
}

export default SummaryComponent;
