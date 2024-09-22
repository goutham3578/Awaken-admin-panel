// // actions.js
// import axios from 'axios';

// export const FETCH_INTERVIEWS_REQUEST = 'FETCH_INTERVIEWS_REQUEST';
// export const FETCH_INTERVIEWS_SUCCESS = 'FETCH_INTERVIEWS_SUCCESS';
// export const FETCH_INTERVIEWS_FAILURE = 'FETCH_INTERVIEWS_FAILURE';

// export const fetchInterviewData = () => {
//     return async (dispatch) => {
//         dispatch({ type: FETCH_INTERVIEWS_REQUEST });

//         try {
//             const response = await axios.get('your-api-endpoint');
//             dispatch({ type: FETCH_INTERVIEWS_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: FETCH_INTERVIEWS_FAILURE, payload: error.message });
//         }
//     };
// };

// actions.js
import axios from 'axios';

export const FETCH_INTERVIEWS_REQUEST = 'FETCH_INTERVIEWS_REQUEST';
export const FETCH_INTERVIEWS_SUCCESS = 'FETCH_INTERVIEWS_SUCCESS';
export const FETCH_INTERVIEWS_FAILURE = 'FETCH_INTERVIEWS_FAILURE';

export const fetchInterviewData = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_INTERVIEWS_REQUEST });

        try {
            // Replace 'your-api-endpoint' with the actual URL
            const response = await axios.get('https://reaidy-nodejs-autoscale.azurewebsites.net/api/analytics/dashboard-details');
            dispatch({ type: FETCH_INTERVIEWS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_INTERVIEWS_FAILURE, payload: error.message });
        }
    };
};
