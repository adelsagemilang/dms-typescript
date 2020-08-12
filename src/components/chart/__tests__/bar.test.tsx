import React from 'react';
import { shallow } from 'enzyme';
import Bar from '../bar';

describe('Bar Chart test', () => {
  it('has defaultSeries', () => {
    const wrapper = shallow(<Bar isZoom={false} />);
    expect(wrapper.state().series.length).toBe(1);
  });

  it('should update correct series state', () => {
    const series = [
      {
        name: 'Total',
        data: [44, 55, 57, 56, 61],
      },
    ];

    const wrapper = shallow(<Bar isZoom={false} series={series} />);

    expect(wrapper.state().series.length).toBe(1);
    expect(wrapper.state().series[0].name).toEqual('Total');
  });

  it('should update correct options state on Zoom', () => {
    const wrapper = shallow(<Bar isZoom />);
    expect(wrapper.state().options.legend.position).toEqual('bottom');
  });

  it('should update correct options state on unZoom', () => {
    const wrapper = shallow(<Bar isZoom={false} />);
    expect(wrapper.state().options.legend.position).toEqual('right');
  });
});
