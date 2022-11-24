import { combineReducers, createStore } from '@reduxjs/toolkit';
import countryReducer from './reducers/countryReducer';

const reducer = combineReducers({
  country: countryReducer
})

export const store = createStore(reducer)