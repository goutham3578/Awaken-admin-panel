import React, { useEffect, useState } from 'react';
import { uploadFileToAzure } from './azure';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import { apiPostPut } from '../../api/api_methods';
import ComponentCard from '../../components/ComponentCard';
import { COMPACT } from '@blueprintjs/core/lib/esm/common/classes';

const BasicForm = () => {
  const [password, setpassword] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState();
  const [selectedLogo, setSelectedLogo] = useState();
  const [load, setload] = useState(false);
  //  profile image
  const defaultProfile =
    'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg';
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const profile = () => {
    const profileUrl = localStorage.getItem('user');
    console.log('hi', JSON.parse(profileUrl).userLogo);
    if (JSON.parse(profileUrl).userLogo) setProfileImage(JSON.parse(profileUrl).userLogo);
  };

  // Organization
  const defaultLogo =
    'https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg';
  const [OrganizationLogo, setOrganizationLogo] = useState(defaultLogo);
  const logo = () => {
    const logoUrl = localStorage.getItem('user');
    // console.log(logoUrl)
    console.log('hi', JSON.parse(logoUrl).companyLogo);

    if (JSON.parse(logoUrl).companyLogo) setOrganizationLogo(JSON.parse(logoUrl).companyLogo);
  };

  const handleFileUpload = async (e) => {
    try {
      const timestamp = Date.now().toString();
      const min = 1000;
      const max = 9999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const filename = randomNumber + timestamp;

      const fileUploaded = await uploadFileToAzure(filename, e.target.files[0]);
      const stringifiedURL = JSON.stringify(fileUploaded.url);
      // const verificationResp = await apiPostPut({userLogo : fileUploaded.url,password:dat.password}, `/admin/admins/${data._id}`, 'PUT');

      // if (verificationResp.status === 200) {
      //       localStorage.setItem('user', JSON.stringify(verificationResp.body.data));
      //     }
      localStorage.setItem('pic', fileUploaded.url);
      setProfileImage(fileUploaded.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleLogoUpload = async (e) => {
    try {
      const timestamp = Date.now().toString();
      const min = 1000;
      const max = 9999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const filename = randomNumber + timestamp;

      const fileUploaded = await uploadFileToAzure(filename, e.target.files[0]);
      // const verificationResp = await apiPostPut({companyLogo : fileUploaded.url ,password:dat.password}, `/admin/admins/${data._id}`, 'PUT');

      // if (verificationResp.status === 200) {
      //   setload(false)
      //       localStorage.setItem('user', JSON.stringify(verificationResp.body.data));
      //     }
      const stringifiedURL = JSON.stringify(fileUploaded.url);
      localStorage.setItem('logo', fileUploaded.url);
      setOrganizationLogo(fileUploaded.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const user = localStorage.getItem('user');
  const data = JSON.parse(user);
  const apicalling = async (dat) => {
    const verificationResp = await apiPostPut(dat, `/admin/admins/${data._id}`, 'PUT');

    if (verificationResp.status === 200) {
      alert('Account info updated successfully.');
      localStorage.setItem('user', JSON.stringify(verificationResp.body.data));
      setload(false);
      // window.location.reload();
      window.location.href = '/dashboards/minimal';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password) {
      setload(true);
      const formData = new FormData(e.target);
      const dat = Object.fromEntries(formData.entries());
      dat.clusterId = data.clusterId._id;
      console.log('Form data:', dat);

      if (profileImage !== defaultProfile) {
        const verificationResp = await apiPostPut(
          { userLogo: profileImage, password: dat.password },
          `/admin/admins/${data._id}`,
          'PUT',
        );

        if (verificationResp.status === 200) {
          localStorage.setItem('user', JSON.stringify(verificationResp.body.data));
        }
      }
      if (OrganizationLogo !== defaultLogo) {
        const verificationResp1 = await apiPostPut(
          { companyLogo: OrganizationLogo, password: dat.password },
          `/admin/admins/${data._id}`,
          'PUT',
        );

        if (verificationResp1.status === 200) {
          setload(false);
          localStorage.setItem('user', JSON.stringify(verificationResp1.body.data));
        }
      }

      apicalling(dat);
    } else setpassword(true);
  };

  return (
    <div>
      <Row>
        {/* Readonly Form                                                                  */}
        {/*--------------------------------------------------------------------------------*/}
        <Col md="12">
          <ComponentCard title="Readonly Form">
            <Form>
              <FormGroup>
                <Label>Account Id</Label>
                <Input type="text" defaultValue={data.userType._id} readOnly />
              </FormGroup>
              <FormGroup>
                <Label>Credit Id</Label>
                <Input type="text" defaultValue={data.credits._id} readOnly />
              </FormGroup>
              <FormGroup>
                <Label>Credits Available</Label>
                <Input type="text" defaultValue={data.credits.coins} readOnly />
              </FormGroup>
              <FormGroup>
                <Label>ClusterId</Label>
                <Input type="text" defaultValue={data.clusterId._id} readOnly />
              </FormGroup>
              <FormGroup>
                <Label>Role</Label>
                <Input type="text" defaultValue={data.userType.role} readOnly />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col md="12">
          <Card>
            <CardBody
              className="bg-light"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <CardTitle tag="h4" className="mb-0">
                Account Info
              </CardTitle>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Label style={{ marginTop: '5px' }}>Is Account Verified</Label>
                <div
                  style={{
                    backgroundColor: data.isAccountVerified ? 'green' : 'red',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '3px',
                    width: '55px',
                    height: '30px',
                    marginLeft: '20px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {data.isAccountVerified ? (
                    <>
                      <i class="bi bi-check-circle" style={{ marginRight: '2px' }}></i>
                      <span style={{ marginLeft: '2px' }}>Yes</span>
                    </>
                  ) : (
                    <>
                      <i class="bi bi-x-circle" style={{ marginRight: '2px' }}></i>
                      <span style={{ marginLeft: '2px' }}>No</span>
                    </>
                  )}
                </div>
              </div>
            </CardBody>
            <CardBody>
              <Row>
                <Col md="6">
                  {/* Display Selected Image */}
                  {profileImage && (
                    <div className="mb-3" style={{ height: '150px' }}>
                      <img
                        src={selectedProfile ? URL.createObjectURL(selectedProfile) : profileImage}
                        alt="Profile"
                        style={{
                          maxHeight: '150px',
                          border: '1px solid black',
                          borderRadius: '5px',
                          boxShadow: '0px 0px 5ypx 0px rgba(0,0,0,0.5)',
                        }}
                      />
                    </div>
                  )}
                  <FormGroup>
                    <Label for="profileImage">Profile Picture</Label>
                    <Input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      onChange={handleFileUpload}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  {/* Display Selected Image */}
                  {OrganizationLogo && (
                    <div className="d-flex justify-content-center">
                      <div className="mb-3" style={{ width: '90%' }}>
                        <img
                          src={selectedLogo ? URL.createObjectURL(selectedLogo) : OrganizationLogo}
                          alt="Profile"
                          style={{
                            border: '1px solid black',
                            borderRadius: '5px',
                            boxShadow: '0px 0px 5ypx 0px rgba(0,0,0,0.5)',
                            width: '100%',
                            objectFit: 'contain',
                            height: '150px',
                            padding: '5px',
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <FormGroup>
                    <Label for="OrganizationLogo">Organization Logo</Label>
                    <Input
                      type="file"
                      name="OrganizationLogo"
                      id="OrganizationLogo"
                      onChange={handleLogoUpload}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Form onSubmit={async (e) => handleSubmit(e)}>
                {load && (
                  <div className="loading" style={{ position: 'fixed' }}>
                    <Spinner color="primary" />
                  </div>
                )}
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Admin Name</Label>
                      <Input type="text" name="adminName" defaultValue={data.adminName} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Account Type</Label>
                      <Input type="select" name="accountType">
                        {data.accountType === 'college' ? (
                          <>
                            <option value="college">college</option>
                            <option value="edTech">edTech</option>
                          </>
                        ) : (
                          <>
                            <option value="edTech">edTech</option>
                            <option value="college">college</option>
                          </>
                        )}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Email</Label>
                      <Input type="email" name="email" defaultValue={data.email} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Mobile</Label>
                      <Input type="text" name="mobile" defaultValue={data.mobile} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>Address</Label>
                      <Input type="text" name="address" defaultValue={data.address} />
                    </FormGroup>
                  </Col>
                </Row>
                {password && (
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" />
                        <div className="text-danger">
                          {' '}
                          * To update the profile enter your password
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {/* <Row >
                <Col md="6">
                    <FormGroup>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Label style={{marginTop:'5px'}}>Is Account Verified</Label>
                        <div
                          style={{
                            backgroundColor: data.credits.isAccountVerified ? 'green' : 'red',
                            color: 'white',
                            padding: '5px',
                            borderRadius: '3px',
                            width: '55px',
                            height: '30px',
                            marginLeft: '20px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {data.credits.isAccountVerified ? (
                            <>
                              <i class="bi bi-check-circle" style={{ marginRight: '2px' }}></i>
                              <span style={{ marginLeft: '2px' }}>Yes</span>
                            </>
                          ) : (
                            <>
                              <i class="bi bi-x-circle" style={{ marginRight: '2px' }}></i>
                              <span style={{ marginLeft: '2px' }}>No</span>
                            </>
                          )}
                        </div>
                      </div>
                    </FormGroup>
                </Col>
                </Row> */}
                <CardBody className="border-top gap-2 d-flex align-items-center">
                  <Button type="submit" className="btn btn-success">
                    Save
                  </Button>
                  <Button type="button" className="btn btn-dark ml-2">
                    Cancel
                  </Button>
                </CardBody>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BasicForm;
