import React from 'react';
import { PanelBlock, Columns, Column, Box, Title } from 'bloomer';
import TextLoaders from 'components/loader/text';

const Trip = props => {
  const { total_trips, route, volume, weight } = props.data;
  const { isLoading } = props;
  const { kFormatter } = window.helpers;
  return (
    <PanelBlock className="no-border">
      <Box className="is-fullwidth outline-primary p-10 p-b-20">
        <Columns>
          <Column className="flex-align-center">
            {isLoading ? (
              <TextLoaders height={10} width={100} />
            ) : (
                <Title className="is-7">Order Delivery</Title>
              )}
          </Column>
          <Column className="flex-end flex-align-center">
            <small className="m-r-10 has-text-weight-semibold">
              {isLoading ? <TextLoaders height={8} width={20} /> : `Total`}
            </small>
            <span className="is-6 has-text-primary has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={15} width={50} />
              ) : (
                  `${parseFloat(kFormatter(total_trips))} Trips`
                )}
            </span>
          </Column>
        </Columns>
        <Columns>
          <Column isSize="1/3" className="p-t-0 has-separator-after">
            <small className="has-text-weight-semibold">
              {isLoading ? <TextLoaders height={8} width={50} /> : `By Route`}
            </small>
            <Title className="is-5 m-t-5 flex-space flex-align-baseline">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={30} width={30} />
                ) : (
                    parseFloat(kFormatter(route))
                  )}
              </span>
              <span className="text-extra-small has-text-grey-dark">
                {isLoading ? <TextLoaders height={8} width={30} /> : `Order(s)`}
              </span>
            </Title>
          </Column>
          <Column isSize="1/3" className="p-t-0 has-separator-after">
            <small className="has-text-weight-semibold">
              {isLoading ? <TextLoaders height={8} width={50} /> : `By Volume`}
            </small>
            <Title className="is-5 m-t-5 flex-space flex-align-baseline">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={30} width={30} />
                ) : (
                    parseFloat(kFormatter(volume))
                  )}
              </span>
              <span className="text-extra-small has-text-grey-dark">
                {isLoading ? <TextLoaders height={8} width={30} /> : `Order(s)`}
              </span>
            </Title>
          </Column>
          <Column isSize="1/3" className="p-t-0">
            <small className="has-text-weight-semibold">
              {isLoading ? <TextLoaders height={8} width={50} /> : `By Weight`}
            </small>
            <Title className="is-5 m-t-5 flex-space flex-align-baseline">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={30} width={30} />
                ) : (
                    parseFloat(kFormatter(weight))
                  )}
              </span>
              <span className="text-extra-small has-text-grey-dark">
                {isLoading ? <TextLoaders height={8} width={30} /> : `Order(s)`}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
    </PanelBlock>
  );
};

export default Trip;
