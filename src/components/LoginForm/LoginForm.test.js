import React from 'react';
import { shallow, mount } from 'enzyme';
import { LoginForm } from 'components/LoginForm';
import { MemoryRouter } from 'react-router-dom';
import Auth from 'services/auth';

import CssBaseline from '@material-ui/core/CssBaseline';
import {InputText} from 'components/shared/InputText';

describe('Test Login Form', () => {
  it('Create snapshot', () => {
    const component = shallow(<LoginForm />);
    expect(component).toMatchSnapshot();
  });
});

describe('Test card exist', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(CssBaseline)).toBeDefined();
  });
  it('Test exist enough tag Input', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(InputText)).toBeDefined();
  }); 
  it('Test length tag Input', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(InputText)).toHaveLength(2)
  }); 
  it('Test Faker Login', () => {
    const wrapper = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    ); 
    wrapper.find('input#username').simulate('change', { target: { value: 'nguyenduychien' } }); 
    wrapper.find('input#password').simulate('change', { target: { value: 'Nguyenduychien1.' } }); 
    wrapper.unmount();
  })
  it('Test axios', async () => {
    const data = {
      username: 'chiennguyen99', 
      password: 'Nguyenduychien1.',
    };
    const res = await Auth.login(data); 
    console.log(res); 
  })
});


