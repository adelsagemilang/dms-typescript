import React from 'react';
import { shallow } from 'enzyme';
import ContentLoader from '../content';

test('ContentLoader renders correctly while props changed', () => {
  const wrapper = shallow(<ContentLoader height={400} width={400} />);
  expect(wrapper).toMatchSnapshot();

  wrapper.setProps({
    height: 300,
    width: 300,
  });
  expect(wrapper).toMatchSnapshot();
});
