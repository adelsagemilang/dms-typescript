import React from 'react';
import ContentLoader from 'react-content-loader';

const ContentLoaders = props => {
  return (
    <ContentLoader height={props.height} width={props.width} speed={2}>
      <rect
        x="0"
        y="0"
        rx="3"
        ry="3"
        width={props.width / 3}
        height={props.height * 0.1}
      />
      <rect
        x="0"
        y="60"
        rx="3"
        ry="3"
        width={props.width}
        height={props.height}
      />
    </ContentLoader>
  );
};

export default ContentLoaders;
