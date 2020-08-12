import React, { Component } from 'react';
import { PanelBlock, Box, Title } from 'bloomer';

class PeakCapacity extends Component {
  render() {
    return (
      <PanelBlock className="no-border flex-align-stretch">
        <Box className="outline-primary column">
          <Title className="is-7">Peak Capacity Distribution</Title>
          <img
            src="images/peak-capacity-distribution.jpg"
            className="img-peak"
            alt="Peak Capacity"
          />
        </Box>
      </PanelBlock>
    );
  }
}

export default PeakCapacity;
