import React from 'react';
import { shallow } from 'enzyme';
import Header from 'components/header';

describe('Header Component tests', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
