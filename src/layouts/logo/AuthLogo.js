import React from 'react';
import { useSelector } from 'react-redux';
import logo from "../../assets/images/logos/logo.png"

import constants from "../../helpers/constantVariables";

const AuthLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);

  return (
    <div className="p-4 d-flex justify-content-center  gap-2 ">
      {isDarkMode !== false ? (
        <>
          {/* <LogoWhiteIcon /> */}
          <img src={logo} className="d-none d-lg-block w-5" alt='logo-text'  style={{width:`150px`}} />
        </>
      ) : (
        <>
          {/* <LogoDarkIcon /> */}
          <img src={logo} className="d-none d-lg-block w-5" alt='logo-text'  style={{width:`150px`}} />
        </>
      )}
    </div>
  );
};

export default AuthLogo;
