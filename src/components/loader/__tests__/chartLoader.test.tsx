import React from 'react';
import { shallow } from 'enzyme';
import XYChart from '../chart';

describe('Chart Loader tests', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<XYChart height={400} width={400} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly while props changed', () => {
    const wrapper = shallow(<XYChart height={400} width={400} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      height: 300,
      width: 300,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
