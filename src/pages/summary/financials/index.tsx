import React from 'react';
import _ from 'lodash';
import { Panel, PanelBlock, Columns, Column, Box, Title } from 'bloomer';
import HeadingWithButtons from 'components/commons/headingWithButtons';
import TextLoaders from 'components/loader/text';

const Financials = props => {
  const { moneyFormatter } = window.helpers;
  const { total_cost, average_price } = props.data;
  const { isLoading } = props;
  return (
    <Panel className="has-background-white">
      <HeadingWithButtons title="Money & Financials" chartLink="/financials" />
      <PanelBlock className="no-border flex-align-stretch column is-6">
        <Box className="outline-primary column">
          <Columns className="p-b-10">
            <Column isSize={6} className="has-separator-after">
              <small className="has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={10} width={100} />
                ) : (
                  `Total Cost`
                )}
              </small>
              <Title className="is-5 m-t-5">
                <span className="has-text-primary has-text-weight-semibold">
                  {isLoading ? (
                    <TextLoaders height={40} width={200} />
                  ) : _.isUndefined(total_cost) ? (
                    0
                  ) : (
                    moneyFormatter(total_cost)
                  )}
                </span>
              </Title>
            </Column>
            <Column isSize={6}>
              <small className="has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={10} width={100} />
                ) : (
                  `Average Price`
                )}
              </small>
              <Title className="is-5 m-t-5">
                <span className="has-text-primary has-text-weight-semibold">
                  {isLoading ? (
                    <TextLoaders height={40} width={200} />
                  ) : _.isUndefined(average_price) ? (
                    0
                  ) : (
                    moneyFormatter(average_price)
                  )}
                </span>
              </Title>
            </Column>
          </Columns>
        </Box>
      </PanelBlock>
    </Panel>
  );
};

export default Financials;
