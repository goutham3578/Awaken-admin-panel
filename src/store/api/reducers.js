// reducers.js
import { combineReducers } from 'redux';
import dataReducer from './datareducer';

const rootReducer = combineReducers({
  data: dataReducer,
  // Add other reducers here
});

export default rootReducer;
