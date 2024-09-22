import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ReactComponent as LogoDarkIcon } from '../../assets/images/logos/elite-dark-icon.svg';
import LogoDarkText from '../../assets/images/logos/logo.png';
import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/elite-white-icon.svg';
import LogoWhiteText  from '../../assets/images/logos/logo.png';
import logo from "../../assets/images/logos/logo.png"

const Logo = () => {
  const [OrganizationLogo, setOrganizationLogo] = useState(LogoWhiteText);
  let data = localStorage.getItem('user');
  let data1 = JSON.parse(data);
    useEffect(()=>{
      data = localStorage.getItem('user');
      data1 = JSON.parse(data);
      const logoUrl=localStorage.getItem("logo");
      if(data1?.companyLogo) setOrganizationLogo(data1.companyLogo)
    })


  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activeSidebarBg !== 'white' ? (
        <>
          {/* <LogoWhiteIcon /> */}
          {toggleMiniSidebar ? <img src={logo} className="d-none d-lg-block" alt='logo-text' style={{ width: '40px', paddingRight: '20px' }}/> : <img src={logo} className="d-none d-lg-block" alt='logo-text' style={{width:`150px`}}/>}
        </>
      ) : (
        <>
          {/* <LogoDarkIcon /> */}
          {toggleMiniSidebar ? <img src={logo} className="d-none d-lg-block" alt='logo-text' style={{ width: '40px', paddingRight: '20px' }}/> : <img src={logo} className="d-none d-lg-block" alt='logo-text' style={{width:`150px`}} />}
        </>
      )}
    </Link>
  );
};

export default Logo;
