import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { showBackButton } from 'layout/actions';
import BackButton from '../backButton';

describe('BackButton Header tests', () => {
  it('Shows back button', () => {
    const wrapper = shallow(<BackButton isShowBackButton />);
    expect(wrapper.find('.pointer').length).toBe(1);
  });

  it('Shows square image', () => {
    const wrapper = shallow(<BackButton isShowBackButton={false} />);
    expect(wrapper.find('.hover-menu').length).toBe(1);
  });

  it('Tests handleBack click button', () => {
    const mockCallBack = sinon.spy();
    const button = shallow(
      <BackButton isShowBackButton showBackButton={mockCallBack} />,
    );

    button.find('.pointer').simulate('click');
    expect(mockCallBack).toHaveProperty('callCount', 1);
  });
});
