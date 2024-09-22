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
import Loader from '../../layouts/loader/Loader';

const ResetFormik = () => {
  const navigate = useNavigate();
  const [load, setload] =useState(false)
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className="loginBox">
    {load && <Loader></Loader>}
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <h5 className="fw-bold">Reset your Password</h5>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (fields) => {
                    setload(true)
                    // eslint-disable-next-line no-alert

                    const data = {
                      password: fields.password,
                    };
                    console.log(data);

                    const currentPath = window.location.pathname;
                    console.log(currentPath)
                    const verificationResp = await apiPostPut(
                      data,
                      `/admin/${currentPath}`,
                      'POST',
                    );

                    if (verificationResp.status === 200) {
                      // redirect to success page
                      console.log('Your password was reset  Successfully');
                      console.log(verificationResp);
                      setload(false)

                      navigate('/auth/loginformik');
                    }

                    // alert(`SUCCESS!! :-)\n\n${data}`);
                  }}
                  render={({ errors, touched }) => (
                    <Form>
                    {load && (
                        <div className="loading">
                          <Spinner color="primary" />
                        </div>
                      )}
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={`form-control${
                            errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Reset
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetFormik;
