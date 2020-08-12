import * as React from 'react';
import Iframe from 'react-iframe';
import 'styles/sass/pages/order-detail.sass';

interface PropsFromState {
  jobOrder: any;
}

class Maps extends React.Component<PropsFromState> {
  render() {
    const urlMaps = `${process.env.REACT_APP_ACT_MAPS_ENDPOINT}/api_v1/orders/monitoring/${this.props.jobOrder}/9?traffic=false`;

    return (
      <Iframe
        url={urlMaps}
        width="100%"
        id="maps-iframe"
        className="maps-order"
        scrolling="no"
      />
    );
  }
}

export default Maps;
