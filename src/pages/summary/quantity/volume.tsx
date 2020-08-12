import React from 'react';
import { PanelBlock, Columns, Column, Box, Title } from 'bloomer';
import TextLoaders from 'components/loader/text';

const Volume = props => {
  const { total_volume, average_volume } = props.data;
  const { isLoading } = props;
  return (
    <PanelBlock className="no-border flex-align-stretch">
      <Box className="outline-grey column">
        <Columns>
          <Column isSize={6} className="has-separator-after">
            <small className="has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={10} width={100} />
              ) : (
                `Total Volume`
              )}
            </small>
            <Title className="is-5 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={25} width={60} />
                ) : (
                  `${Math.round(total_volume).toLocaleString('id')} m3`
                )}
              </span>
            </Title>
          </Column>
          <Column isSize={6}>
            <small className="has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={10} width={100} />
              ) : (
                `Average volume / Order`
              )}
            </small>
            <Title className="is-5 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={25} width={60} />
                ) : (
                  `${Math.round(average_volume).toLocaleString('id')} m3`
                )}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
    </PanelBlock>
  );
};

export default Volume;
