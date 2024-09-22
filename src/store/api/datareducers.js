// dataReducer.js
import {
    FETCH_INTERVIEWS_REQUEST,
    FETCH_INTERVIEWS_SUCCESS,
    FETCH_INTERVIEWS_FAILURE,
  } from './actionTypes';
  
  const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_INTERVIEWS_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_INTERVIEWS_SUCCESS:
        return { ...state, loading: false, data: action.payload, error: null };
  
      case FETCH_INTERVIEWS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default dataReducer;
  