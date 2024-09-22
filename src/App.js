/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Themeroutes from './routes/Router';
import ThemeSelector from './layouts/theme/ThemeSelector';
import Loader from './layouts/loader/Loader';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom


const App = () => {
  const isLogin = useSelector(state => state); // Assuming your login state is stored in Redux under the "dashboard" slice

  // Function to check if user is logged in
  const isLoggedIn = () => {
    return isLogin.authdata.isLogin; // Return the value of isLogin state
  };

  // Function to render routes based on login status
  const routing = useRoutes(Themeroutes.map(route => {
    console.log(route.path)
    // If the route is under "/auth" or user is logged in, allow access
    // if (route.path.startsWith('/reset-password') || route.path.startsWith('/auth') || isLoggedIn()) {

    //   return route;
    // } else {
    //   // If user is not logged in, redirect to login page
    //   return { ...route, element: <Navigate to="/auth/loginformik" /> };
    // }
    return route;
  }));

  const direction = useSelector((state) => state.customizer.isRTL);
  const isMode = useSelector((state) => state.customizer.isDark);
  
  return (
    <Suspense fallback={<Loader />}>
      <div
        className={`${direction ? 'rtl' : 'ltr'} ${isMode ? 'dark' : ''}`}
        dir={direction ? 'rtl' : 'ltr'}
      >
        <ThemeSelector />
        {routing}
      </div>
    </Suspense>
  );
};

export default App;
