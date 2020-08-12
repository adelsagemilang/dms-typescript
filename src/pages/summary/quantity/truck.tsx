import React from 'react';
import { PanelBlock, Columns, Column, Box, Title } from 'bloomer';
import TextLoaders from 'components/loader/text';

const Truck = props => {
  const { active_trucks, active_transporter, total_transporter } = props.data;
  const { isLoading } = props;
  const { kFormatter } = window.helpers;
  return (
    <PanelBlock className="no-border flex-align-stretch">
      <Box className="outline-primary column m-r-10 m-b-0">
        <Columns>
          <Column isSize={12}>
            <small className="has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={10} width={90} />
              ) : (
                  `Active Trucks`
                )}
            </small>
            <Title className="is-5 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={30} width={30} />
                ) : (
                    parseFloat(kFormatter(active_trucks))
                  )}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
      <Box className="outline-primary column">
        <Columns>
          <Column isSize={6} className="has-separator-after">
            <small className="has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={10} width={60} />
              ) : (
                  `Active Transporters`
                )}
            </small>
            <Title className="is-5 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={30} width={30} />
                ) : (
                    parseFloat(kFormatter(active_transporter))
                  )}
              </span>
            </Title>
          </Column>
          <Column isSize={6}>
            <small className="has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={10} width={60} />
              ) : (
                  `Total Transporters`
                )}
            </small>
            <Title className="is-5 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={30} width={30} />
                ) : (
                    parseFloat(kFormatter(total_transporter))
                  )}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
    </PanelBlock>
  );
};

export default Truck;
