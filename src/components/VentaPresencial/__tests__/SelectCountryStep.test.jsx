import React from 'react';
import { StateProvider } from '../../PasarelaCobros/Provider/StateProvider';
import { shallow } from 'enzyme';
import SelectCountryStep from '../Stepper/SelectCountryStep';

const TestAppContext = ({ contextValue }) => (
  <StateProvider.Provider value={contextValue}>
    <SelectCountryStep />
  </StateProvider.Provider>
);

describe('<SelectCountryStep />', () => {
  it('renders without crashing', () => {
    const contextValue = {
      options: {
        countryOptions: [],
        sideItemOptionsVP: [],
      },
      setOptions: jest.fn(),
      userInfo: {
        stepOne: {},
      },
      setUserInfo: jest.fn(),
      formikValues: {
        country: null,
      },
      appEnv: null,
    };
    const wrapper = shallow(<TestAppContext contextValue={contextValue} />);
    expect(wrapper).toMatchSnapshot();
  });
});
