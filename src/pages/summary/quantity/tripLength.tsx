import React from 'react';
import { PanelBlock, Columns, Column, Box, Title } from 'bloomer';
import TextLoaders from 'components/loader/text';

const TripLength = props => {
  const { day_per_trip, km_per_trip } = props.data;
  const { isLoading } = props;
  const { toFixed } = window.helpers;
  return (
    <PanelBlock className="no-border flex-align-stretch">
      <Box className="outline-grey column m-b-0 m-r-5">
        <Columns>
          <Column isSize={8} className="p-r-0">
            <small className="has-text-weight-semibold">
              {isLoading ? (
                <TextLoaders height={10} width={50} />
              ) : (
                `Days / Trip`
              )}
            </small>
            <Title className="is-6 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={20} width={50} />
                ) : (
                  `${toFixed(day_per_trip, 1)} Days`
                )}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
      <Box className="outline-grey column m-b-0 m-l-5">
        <Columns>
          <Column isSize={8} className="p-r-0">
            <small className="has-text-weight-semibold">
              {isLoading ? <TextLoaders height={10} width={50} /> : `Km / Trip`}
            </small>
            <Title className="is-6 m-t-5">
              <span className="has-text-primary has-text-weight-semibold">
                {isLoading ? (
                  <TextLoaders height={20} width={50} />
                ) : (
                  `${toFixed(km_per_trip, 1)} Km`
                )}
              </span>
            </Title>
          </Column>
        </Columns>
      </Box>
    </PanelBlock>
  );
};

export default TripLength;
