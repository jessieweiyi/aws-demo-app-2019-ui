import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from '.';
import Main from '../Main';
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(Main)).toHaveLength(1);
});
