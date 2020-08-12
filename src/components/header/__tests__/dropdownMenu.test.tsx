import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import DropdownMenu from '../dropdownMenu';

describe('Dropdown Menu Header Tests', () => {
  it('renders correctyly', () => {
    const wrapper = shallow(<DropdownMenu />);
    expect(wrapper).toMatchSnapshot();
  });

  it('called logout on click', () => {
    const mockCallback = sinon.spy();
    const wrapper = shallow(<DropdownMenu logout={mockCallback} />);
    wrapper.find('.logout').simulate('click');
    expect(mockCallback).toHaveProperty('callCount', 1);
  });
});
