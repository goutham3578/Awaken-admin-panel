import React,{useState,useEffect}from 'react';
import { DropdownItem } from 'reactstrap';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';
import user1 from '../../assets/images/users/user1.jpg';

const ProfileDD = () => {
  let data = localStorage.getItem('user');
  let data1 = JSON.parse(data);
  const [dp,setDp] = useState(user1);
  useEffect(()=>{
   
  })
  
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={dp} alt="user" className="rounded-circle" width="55" />
        <span>
          {/* <h5 className="mb-0 fw-medium">{data1.adminName}</h5>
          <p className="text-muted mb-0">{data1.userType.role}</p>
          <small className="text-muted">{data1.email}</small> */}
        </span>
      </div>
      <DropdownItem href="/form-layout/form-basic" className="px-4 py-3">
      
          <User size={20} className="text-muted" />
          &nbsp; My Profile
       
      </DropdownItem>
      <DropdownItem  href="/form-layout/form-basic" className="px-4 py-3">
        
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
      <DropdownItem href="/dashboards/team" className="px-4 py-3">
        <i className="bi bi-microsoft-teams"></i>
        &nbsp; Team
      </DropdownItem>

      <DropdownItem divider />
      <DropdownItem className="px-4 py-3">
        <Settings size={20} className="text-muted" />
        &nbsp; Settings
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
