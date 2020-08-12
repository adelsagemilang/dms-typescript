import React from 'react';
import ContentLoader from 'react-content-loader';

interface PropTypes {
  height: number;
  width: number;
}

const TextLoaders = (props: PropTypes) => {
  return (
    <ContentLoader height={props.height} width={props.width} speed={2}>
      <rect
        x="0"
        y="0"
        rx="0"
        ry="0"
        width={props.width}
        height={props.height}
      />
    </ContentLoader>
  );
};

export default TextLoaders;
