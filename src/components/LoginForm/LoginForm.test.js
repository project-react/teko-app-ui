import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from 'components/LoginForm';
import CssBaseline from '@material-ui/core/CssBaseline';

describe('Test Login Form', () => {
  it('Create snapshot', () => {
    const component = shallow(<LoginForm />);
    expect(component).toMatchSnapshot();
  });
});

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(<CssBaseline />)).toBeDefined();
  });
});
