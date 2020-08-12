import React, { Component } from 'react';
import { Box, LevelItem, LevelLeft, LevelRight, Level } from 'bloomer';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

type boxProps = {
  title: string;
  value: number;
};

function tooltipDesc(title = '') {
  switch (title) {
    case 'OT':
      return 'On Time only, not In Full';
    case 'IF':
      return 'In Full only, not On Time';
    case 'X OTIF':
      return 'Not On Time, not In Full';
    default:
      return 'On Time In Full';
  }
}

class BoxLabel extends Component<boxProps> {
  render() {
    return (
      <Tooltip placement="bottom" overlay={tooltipDesc(this.props.title)}>
        <Box className="box-label text-small has-text-weight-bold">
          <Level>
            <LevelLeft>
              <LevelItem>
                <span>{this.props.title}</span>
              </LevelItem>
            </LevelLeft>
            <LevelRight>
              <LevelItem>
                <span className="has-text-dark">{this.props.value}</span>
              </LevelItem>
            </LevelRight>
          </Level>
        </Box>
      </Tooltip>
    );
  }
}

export default BoxLabel;
