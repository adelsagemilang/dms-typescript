import React from 'react';
import { PanelBlock, Columns, Column, Box, Title } from 'bloomer';
import TextLoaders from 'components/loader/text';

const Weight = props => {
  const { total_weight, average_weight } = props.data;
  const { isLoading } = props;
  const { kgToTon } = window.helpers;
  return (
    <PanelBlock className="no-border flex-align-stretch">
      <Box className="outline-grey column">
        <Columns>
          <Column isSize={6} className="has-separator-after">
            <small className="has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={10} width={100} />
              ) : (
                `Total Weight`
              )}
            </small>
            <Title className="is-5 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={25} width={60} />
                ) : (
                  `${kgToTon(total_weight)} Ton`
                )}
              </span>
            </Title>
          </Column>
          <Column isSize={6}>
            <small className="has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={10} width={100} />
              ) : (
                `Average Weight / Order`
              )}
            </small>
            <Title className="is-5 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={25} width={60} />
                ) : (
                  `${kgToTon(average_weight)} Ton`
                )}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
    </PanelBlock>
  );
};

export default Weight;
