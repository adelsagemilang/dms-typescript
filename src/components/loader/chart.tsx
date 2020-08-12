import React from 'react';
import ContentLoader from 'react-content-loader';

interface PropTypes {
  height: number;
  width: number;
}

const XYChart = (props: PropTypes) => {
  return (
    <ContentLoader
      viewBox={`0 0 ${props.height} ${props.width}`}
      height={props.height}
      width="100%"
      speed={1}
    >
      <rect x="20" y="175" rx="0" ry="0" width={props.width} height="1" />
      <rect x="40" y="75" rx="0" ry="0" width={props.width / 13} height="100" />
      <rect x="80" y="125" rx="0" ry="0" width={props.width / 13} height="50" />
      <rect
        x="120"
        y="105"
        rx="0"
        ry="0"
        width={props.width / 13}
        height="70"
      />
      <rect
        x="160"
        y="35"
        rx="0"
        ry="0"
        width={props.width / 13}
        height="140"
      />
      <rect
        x="200"
        y="55"
        rx="0"
        ry="0"
        width={props.width / 13}
        height="120"
      />
      <rect
        x="240"
        y="15"
        rx="0"
        ry="0"
        width={props.width / 13}
        height="160"
      />
      <rect
        x="280"
        y="135"
        rx="0"
        ry="0"
        width={props.width / 13}
        height="40"
      />
      <rect x="320" y="85" rx="0" ry="0" width={props.width / 13} height="90" />
    </ContentLoader>
  );
};

export default XYChart;
