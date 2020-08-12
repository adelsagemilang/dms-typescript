import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import PageWithTransitions from '../pageWithTransitions';

describe('<PageWithTransitions/>', () => {
  const TestWrappedComponent = () => <div className="test">Test</div>;
  const PageWithTransitionsComponent = PageWithTransitions(
    TestWrappedComponent,
    'test',
  );

  it('renders correctyly', () => {
    const wrapper = shallow(<PageWithTransitionsComponent />);
    expect(wrapper).toMatchSnapshot();
  });

  it('animated width on 100ms', () => {
    const animateTime = sinon.useFakeTimers();
    const wrapper = shallow(<PageWithTransitionsComponent />);
    wrapper.update();
    animateTime.tick(100);
    expect(wrapper.state('isTransitioned')).toBe(true);
    expect(wrapper.hasClass('is-transitioned')).toBe(true);
  });
});
