import React from 'react';
import { shallow, mount } from 'enzyme';
import Chart from 'react-apexcharts';
import BarWithLine from '../barWithLine';

describe('Bar With Line Chart test', () => {
  it('has defaultSeries', () => {
    const wrapper = mount(<BarWithLine isZoom={false} />);
    expect(
      wrapper
        .find(Chart)
        .first()
        .props().series.length,
    ).toBe(2);
  });

  it('should update correct series state', () => {
    const series = [
      {
        name: 'Column',
        type: 'column',
        data: [440, 505, 414, 671, 227],
      },
      {
        name: 'Line',
        type: 'line',
        data: [440, 505, 414, 671, 227],
      },
    ];

    const wrapper = mount(<BarWithLine isZoom={false} series={series} />);

    expect(
      wrapper
        .find(Chart)
        .first()
        .props().series.length,
    ).toBe(2);
    expect(
      wrapper
        .find(Chart)
        .first()
        .props().series[0].name,
    ).toEqual('Column');
  });

  it('should update correct options state on Zoom', () => {
    const wrapper = shallow(<BarWithLine isZoom />);
    expect(wrapper.state().options.legend.position).toEqual('bottom');
  });

  it('should update correct options state on unZoom', () => {
    const wrapper = shallow(<BarWithLine isZoom={false} />);
    expect(wrapper.state().options.legend.position).toEqual('right');
  });
});
