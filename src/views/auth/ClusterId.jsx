import React from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Spinner } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import { apiPostPut } from '../../api/api_methods';
import { useState } from 'react';
import { Loader } from 'react-feather';

const Cluster = () => {
  const navigate = useNavigate();
  const [id, setid] = useState('');
  const [load, setload] = useState(false);
  const initialValues = {
    name: '',
    address: '',
    email: '',
    password: '',
    mobile: '',
    registeredCompanyName: '',
    Host:'',
    confirmPassword: '',
    acceptTerms: false,
  };
  const handleCopyClick = () => {
    // Create a textarea element to temporarily hold the text
    const textarea = document.createElement('textarea');
    textarea.value = id;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea and copy it to the clipboard
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textarea);
    alert('Id copied !!!');
    navigate('/auth/registerformik')
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('UserName is required'),
    address: Yup.string().required('address is required'),
    mobile: Yup.string().required('mobile is required'),
    registeredCompanyName: Yup.string().required('registeredCompanyName is required'),
    Host: Yup.string().required('Host is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  return (
    <div className="loginBox">
    {load && <Loader/>}
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            {!id ? (
              <Card>
                <CardBody className="p-4 m-1">
                  <h5 className="">Create Cluster Id</h5>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (fields) => {
                      setload(true)
                      // eslint-disable-next-line no-alert

                      const data = {
                        name: fields.name,
                        address: fields.address,
                        email: fields.email,
                        password: fields.password,
                        mobile: fields.mobile,
                        host:fields.Host,
                        registeredCompanyName: fields.registeredCompanyName,
                      };
                      console.log(data);
                      const verificationResp = await apiPostPut(data, '/cluster/clusters', 'POST');

                      if (verificationResp.status === 200) {
                        // redirect to success page
                        const clusterid = verificationResp?.body?.data?._id;
                        setid(clusterid);
                        setload(false)
                        // alert(`Cluster Id :\n\n${clusterid}`);
                      }
                    }}
                    render={({ errors, touched }) => (
                      <Form>
                      {load && (
                        <div className="loading">
                          <Spinner color="primary" />
                        </div>
                      )}
                        <FormGroup>
                          <Label htmlFor="name">User Name</Label>
                          <Field
                            name="name"
                            type="text"
                            className={`form-control ${
                              errors.name && touched.name ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="email">Email</Label>
                          <Field
                            name="email"
                            type="text"
                            className={`form-control${
                              errors.email && touched.email ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="mobile">Mobile</Label>
                          <Field
                            name="mobile"
                            type="text"
                            className={`form-control${
                              errors.mobile && touched.mobile ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="mobile"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="registeredCompanyName">Company Name</Label>
                          <Field
                            name="registeredCompanyName"
                            type="text"
                            className={`form-control${
                              errors.registeredCompanyName && touched.registeredCompanyName
                                ? ' is-invalid'
                                : ''
                            }`}
                          />
                          <ErrorMessage
                            name="registeredCompanyName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="Host">Host</Label>
                          <Field
                            name="Host"
                            type="text"
                            className={`form-control${
                              errors.Host && touched.Host
                                ? ' is-invalid'
                                : ''
                            }`}
                          />
                          <ErrorMessage
                            name="Host"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="address">Address</Label>
                          <Field
                            name="address"
                            type="text"
                            className={`form-control${
                              errors.address && touched.address ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Button type="submit" color="primary" className="me-2">
                            Create
                          </Button>
                          <Button type="reset" color="secondary">
                            Reset
                          </Button>
                        </FormGroup>
                      </Form>
                    )}
                  />
                </CardBody>
              </Card>
            ) : (
              <div class="container">
              <h5 className="fw-semibold">Cluster Id is created</h5>
                <div class="d-flex align-items-center border rounded-lg p-2">
                
                  <div class="">
                    <div class="d-flex gap-1">
                      <span id="myInput" class="w-100 break-all">
                        {id}
                      </span>
                    </div>
                  </div>
                  <div
                    class="d-flex gap-0.5 w-100 cursor-pointer align-items-center justify-content-end text-muted hover-text-gray-400 "
                    onClick={handleCopyClick}
                  >
                    <span class="w-5 h-5">copy</span>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cluster;
