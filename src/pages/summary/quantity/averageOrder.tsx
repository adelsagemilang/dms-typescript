import React from 'react';
import { PanelBlock, Columns, Column, Box, Title } from 'bloomer';
import TextLoaders from 'components/loader/text';

const AverageOrder = props => {
  const { average_truck, average_transporter } = props.data;
  const { isLoading } = props;
  const { toFixed } = window.helpers;
  return (
    <PanelBlock className="no-border flex-align-stretch">
      <Box className="outline-grey column m-b-0 m-r-5">
        <Columns>
          <Column isSize={8} className="p-r-0">
            <span className="text-xtra-small has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={15} width={80} />
              ) : (
                `Average Order(s) / Truck`
              )}
            </span>
          </Column>
          <Column className="p-l-3">
            <Title className="is-6 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={20} width={20} />
                ) : (
                  toFixed(average_truck, 1)
                )}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
      <Box className="outline-grey column m-b-0 m-l-5">
        <Columns>
          <Column isSize={8} className="p-r-0">
            <span className="text-xtra-small has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={15} width={80} />
              ) : (
                `Average Order(s) / Transporter`
              )}
            </span>
          </Column>
          <Column className="p-l-3">
            <Title className="is-6 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={20} width={20} />
                ) : (
                  toFixed(average_transporter, 1)
                )}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
    </PanelBlock>
  );
};

export default AverageOrder;
