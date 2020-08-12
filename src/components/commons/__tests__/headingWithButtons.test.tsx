import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import HeadingWithButtons from '../headingWithButtons';

const wrapper = mount(
  <Router>
    <HeadingWithButtons title="Quantity" chartLink="/quantity" />
  </Router>,
);

describe('<HeadingWithButtons/>', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has correct setted props', () => {
    const title = wrapper.find('Title').text();
    const chartLink = wrapper
      .find('NavLink')
      .at(1)
      .prop('to')!
      .valueOf();
    expect(title).toEqual('Quantity');
    expect(chartLink).toEqual('/quantity');
  });

  it('has active class on active link', () => {
    const activeClass = 'is-primary';
    const hasActiveClass = wrapper
      .find('a[aria-current="page"]')
      .hasClass(activeClass);
    expect(hasActiveClass).toBeTruthy();
  });
});
