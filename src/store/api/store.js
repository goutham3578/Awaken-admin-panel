// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Combine your reducers here
// import dashboard from './dashboard';
// import { configureStore } from "@reduxjs/toolkit";
// export const store = configureStore({
//     reducer: {
//         dashboard:dashboard,
     
//     },
//   });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
