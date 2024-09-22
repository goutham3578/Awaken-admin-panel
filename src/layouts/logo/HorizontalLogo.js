import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import LogoDarkText from '../../assets/images/logos/logo.png';

import LogoWhiteText from '../../assets/images/logos/logo.png';

const HorizontalLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const activetopbarBg = useSelector((state) => state.customizer.topbarBg);
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activetopbarBg !== 'white' ? (
        <>
          {/* <LogoWhiteIcon /> */}
          <img src={LogoWhiteText} className="d-none d-lg-block" alt='logo-text' />
        </>
      ) : (
        <>
          {/* <LogoDarkIcon /> */}
          <img src={LogoDarkText} className="d-none d-lg-block" alt='logo-text' />
        </>
      )}
    </Link>
  );
};

export default HorizontalLogo;
