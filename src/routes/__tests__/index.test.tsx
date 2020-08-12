import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from 'app';
// import NotFound from 'components/routes/notFound'
import Login from 'pages/login';
import Summary from 'pages/summary';
import { removeSession, setSession } from 'utils/auth';

describe('Routes tests', () => {
  it('Empty token should redirect to login page', () => {
    removeSession();
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it('Unempty token should redirect to dashboard', () => {
    const fakeData = {
      userinfo: {
        user_id: 3232,
        fullname: 'Test name',
        company_id: 232,
        profile_picture: '',
      },
      token: 'asdddasda',
    };

    setSession(fakeData);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    console.log(wrapper.debug());
    expect(wrapper.find(Summary)).toHaveLength(1);
  });
});
