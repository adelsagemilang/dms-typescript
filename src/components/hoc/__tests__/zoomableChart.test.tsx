import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import XYChart from 'components/loader/chart';
import { yearMonth } from 'utils/chart/commons';
import { Quantity } from 'store/quantity/types';
import Switch from 'react-switch';
import ZoomableChart from '../zoomableChart';

describe('Zoomable Chart Component Tests', () => {
  const TestWrappedComponent = () => <div className="test">Test</div>;
  const ZoomableChartComponent = ZoomableChart(TestWrappedComponent);

  const monthYear = yearMonth(2020, 3);

  it('Should renders correctly not zoom', () => {
    const mockFn = sinon.spy();
    const wrapper = mount(
      <ZoomableChartComponent
        title="Test Chart"
        toggleZoom={mockFn}
        isZoom={false}
        data={Quantity}
        chartType="stacked"
        monthYear={monthYear}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('Should renders correctly while zoom', () => {
    const mockFn = sinon.spy();
    const wrapper = mount(
      <ZoomableChartComponent
        title="Test Chart"
        toggleZoom={mockFn}
        isZoom
        data={Quantity}
        chartType="stacked"
        monthYear={monthYear}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('Renders Loader while fetching data', () => {
    const mockFn = sinon.spy();
    const data = {
      isLoading: true,
    };

    const wrapper = shallow(
      <ZoomableChartComponent
        title="Test Chart"
        toggleZoom={mockFn}
        isZoom={false}
        data={data}
        chartType="stacked"
        monthYear={monthYear}
      />,
    );
    expect(wrapper.find(XYChart)).toHaveLength(1);
  });

  it('Clicked Switch button', () => {
    const mockFn = sinon.spy();

    const wrapper = mount(
      <ZoomableChartComponent
        title="Test Chart"
        toggleZoom={mockFn}
        isZoom={false}
        data={Quantity}
        chartType="stacked"
        monthYear={monthYear}
      />,
    );
    wrapper
      .find(Switch)
      .find('input')
      .simulate('change');
    expect(mockFn).toHaveProperty('callCount', 1);
  });
});
