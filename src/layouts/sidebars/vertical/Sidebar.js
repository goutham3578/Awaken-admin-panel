import React, { useEffect, useState } from 'react';
import {
  Button,
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import SidebarData from '../sidebardata/SidebarData';
import Logo from '../../logo/Logo';
import { ToggleMobileSidebar } from '../../../store/customizer/CustomizerSlice';
import NavItemContainer from './NavItemContainer';
import NavSubMenu from './NavSubMenu';
import logo  from '../../../assets/images/logos/logo.png';

import user1 from '../../../assets/images/users/user4.jpg';
import BasicForm from '../../../views/form-layouts/FormBasic';



const Sidebar = () => {
  const location = useLocation();
  const currentURL = location.pathname.split('/').slice(0, -1).join('/');
  let data = localStorage.getItem('user');
  let data1 = JSON.parse(data);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  
  const [dp,setDp] = useState(user1);
  useEffect(()=>{
  })

  //const [collapsed, setCollapsed] = useState(null);
  // const toggle = (index) => {
  //   setCollapsed(collapsed === index ? null : index);
  // };

  const activeBg = useSelector((state) => state.customizer.sidebarBg);
  const isFixed = useSelector((state) => state.customizer.isSidebarFixed);
  const dispatch = useDispatch();
  const isMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  


  return (
    <div className={`sidebarBox shadow bg-${activeBg} ${isFixed ? 'fixedSidebar' : ''}`}>
      <SimpleBar className='h-100' style={{ height: '100%' }}>
        {/********Logo*******/}
        <div className="d-flex p-3 align-items-center">
          <Logo />
          { isMobileSidebar? <Button
            close
            size="sm"
            className=""
            onClick={() => dispatch(ToggleMobileSidebar())}
          /> :<></>}
        </div>
        {/********Sidebar Content*******/}
        {/* <div className="py-4 text-center profile-area">
          <img src={user1} alt="user" width={60} className="rounded-circle mb-2" />
        <div className="py-4 text-center profile-area">
          <img src={dp} alt="user" width={60} className="rounded-circle mb-2" />
          <UncontrolledDropdown>
            <DropdownToggle caret className="bg-transparent border-0">
              {data1.adminName}
            </DropdownToggle>
            <DropdownMenu className="w-100 border">
            <DropdownItem className="px-4 py-3">
     
        <User size={20} className="text-muted" />
        &nbsp; My Profile
       
      </DropdownItem>
              <DropdownItem className="px-4 py-3">

                <FileText size={20} className="text-muted" />
                &nbsp; Edit Profile
              
              </DropdownItem>
              <DropdownItem className="px-4 py-3">
                <Star size={20} className="text-muted" />
                &nbsp; My Balance
              </DropdownItem>
              <DropdownItem className="px-4 py-3">
                <Droplet size={20} className="text-muted" />
                &nbsp; Customize
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem className="px-4 py-3">
                <Settings size={20} className="text-muted" />
                &nbsp; Settings
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
        <div>
          <Nav vertical className={activeBg === 'white' ? '' : 'lightText'}>
            {SidebarData.map((navi) => {
              if (navi.caption) {
                return (
                  <div className="navCaption fw-bold text-uppercase mt-4" key={navi.caption}>
                    {navi.caption}
                  </div>
                );
              }
              if (navi.children) {
                return (
                  <NavSubMenu
                    key={navi.id}
                    icon={navi.icon}
                    title={navi.title}
                    items={navi.children}
                    suffix={navi.suffix}
                    suffixColor={navi.suffixColor}
                    // toggle={() => toggle(navi.id)}
                    // collapsed={collapsed === navi.id}
                    isUrl={currentURL === navi.href}
                  />
                );
              }
              return (
                <NavItemContainer
                  key={navi.id}
                  //toggle={() => toggle(navi.id)}
                  className={location.pathname === navi.href ? 'activeLink' : ''}
                  to={navi.href}
                  title={navi.title}
                  suffix={navi.suffix}
                  suffixColor={navi.suffixColor}
                  icon={navi.icon}
                />
              );
            })}
          </Nav>
        </div>
      </SimpleBar>
      
    </div>
  );
};

export default Sidebar;
