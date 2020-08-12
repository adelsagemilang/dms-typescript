import React from 'react';
import { shallow } from 'enzyme';
import Stacked from '../stacked';

describe('Stacked Chart test', () => {
  it('has defaultSeries', () => {
    const wrapper = shallow(<Stacked isZoom={false} />);
    expect(wrapper.state().series.length).toBe(3);
  });

  it('should update correct series state', () => {
    const series = [
      {
        name: 'Series 1',
        data: [44, 55, 41, 67, 22],
      },
      {
        name: 'Series 2',
        data: [13, 23, 20, 8, 13],
      },
      {
        name: 'Series 3',
        data: [11, 17, 15, 15, 21],
      },
    ];

    const wrapper = shallow(<Stacked isZoom={false} series={series} />);

    expect(wrapper.state().series.length).toBe(3);
    expect(wrapper.state().series[0].name).toEqual('Series 1');
  });

  it('should update correct options state on Zoom', () => {
    const wrapper = shallow(<Stacked isZoom />);
    expect(wrapper.state().options.legend.position).toEqual('bottom');
  });

  it('should update correct options state on unZoom', () => {
    const wrapper = shallow(<Stacked isZoom={false} />);
    expect(wrapper.state().options.legend.position).toEqual('right');
  });
});
