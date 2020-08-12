import React, { Component } from 'react';
import { Panel } from 'bloomer';
import HeadingWithButtons from 'components/commons/headingWithButtons';
import AverageOrder from './averageOrder';
import TripLength from './tripLength';
import Volume from './volume';
import Weight from './weight';
import Truck from './truck';
import Trip from './trip';

class Quantity extends Component {
  render() {
    return (
      <Panel className="has-background-white">
        <HeadingWithButtons space title="Quantity" chartLink="/quantity" />
        <Trip {...this.props} />
        <Truck {...this.props} />
        <Weight {...this.props} />
        <Volume {...this.props} />
        <AverageOrder {...this.props} />
        <TripLength {...this.props} />
      </Panel>
    );
  }
}

export default Quantity;
