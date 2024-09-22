import React, { useEffect } from 'react';
import { Collapse, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../../store/customizer/CustomizerSlice';

const NavSubMenu = ({ icon, title, items, isUrl, suffixColor, suffix }) => {
  const dispatch=useDispatch()
  const location = useLocation();
  const user = localStorage.getItem('user');
  const role=JSON.parse(user).userType.role;
  console.log(user)

  const [collapsed, setCollapsed] = React.useState(true);
  const getActive = document.getElementsByClassName('activeLink');
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    if (isUrl) {
      // setCollapsed(!collapsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavItem className={collapsed && getActive ? 'activeParent' : ''}>
      <NavLink className="cursor-pointer gap-3" onClick={toggle}>
        <span className="sidebarIcon">{icon}</span>
        <span className="hide-mini w-100">
          <div className="d-flex align-items-center">
            <span className="d-block">{title}</span>
            <span className="ms-auto">
              <span className={`badge me-2 ${suffixColor}`}>{suffix}</span>
              <i className={`bi fs-8 ${collapsed ? 'bi-chevron-down' : 'bi-chevron-right'}`} />
            </span>
          </div>
        </span>
      </NavLink>

      <Collapse isOpen={collapsed} navbar tag="ul" className="subMenu"  onClick={() =>{if (window.innerWidth < 786) { dispatch(ToggleMobileSidebar())}}}>
        {items.map((item) => (
          <NavItem
            key={item.title}
            className={`hide-mini  ${location.pathname === item.href ? 'activeLink' : ''}`}
           
          >
            <NavLink tag={Link} to={item.href} className="gap-3" >
              <span className="">{item.icon}</span>
              <span className="hide-mini" >
                <span>{item.title}</span>
              </span>
            </NavLink>
          </NavItem>
        ))}
        {(role==='superAdmin') &&<span>
          <NavItem
            className={`hide-mini  ${
              location.pathname === '/dashboards/Company' ? 'activeLink' : ''
            }`}
          >
            <NavLink tag={Link} to="/dashboards/Company" className="gap-3">
              <span className="">
                <i class="bi bi-buildings"></i>
              </span>
              <span className="hide-mini">
                <span>Company</span>
              </span>
            </NavLink>
          </NavItem>
          <NavItem
            className={`hide-mini  ${
              location.pathname === '/dashboards/Admin' ? 'activeLink' : ''
            }`}
          >
            <NavLink tag={Link} to='/dashboards/cluster' className="gap-3">
              <span className="">
              <i class="bi bi-buildings"></i>
              </span>
              <span className="hide-mini">
                <span>Cluster</span>
              </span>
            </NavLink>
          </NavItem>
          <NavItem
            className={`hide-mini  ${
              location.pathname === '/dashboards/cluster' ? 'activeLink' : ''
            }`}
          >
            <NavLink tag={Link} to="/dashboards/Admin" className="gap-3">
              <span className="">
                <i class="bi bi-person"></i>
              </span>
              <span className="hide-mini">
                <span>Admin</span>
              </span>
            </NavLink>
          </NavItem>
          <NavItem
            className={`hide-mini  ${
              location.pathname === '/dashboards/companyregister' ? 'activeLink' : ''
            }`}
          >
            <NavLink tag={Link} to="/dashboards/companyregister" className="gap-3">
              <span className="">
              <i class="bi bi-person-add"></i>
              </span>
              <span className="hide-mini">
                <span>Register</span>
              </span>
            </NavLink>
          </NavItem>
        </span>}
      </Collapse>
    </NavItem>
  );
};
NavSubMenu.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  icon: PropTypes.node,
  isUrl: PropTypes.bool,
  suffix: PropTypes.any,
  suffixColor: PropTypes.string,
};
export default NavSubMenu;
