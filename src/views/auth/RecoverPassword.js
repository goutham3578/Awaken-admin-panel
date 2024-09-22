import React from 'react';
import {
  Button,
  Label,
  FormGroup,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import img1 from '../../assets/images/users/user4.jpg';
import { apiPostPut } from '../../api/api_methods';
import { useState } from 'react';
import { Loader } from 'react-feather';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const[req ,setreq]=useState(false);
  const[badreq , setbadreq]=useState(false)
  const[load , setload]=useState(false)

  
  const initialValues = {
    email: '',
   
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
   
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
                <div className="text-center">
                  <img src={img1} alt="avatar" className="rounded-circle" width="95" />
                  <CardTitle tag="h4" className="mt-2">
                    John Deo
                  </CardTitle>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={ async (fields) => {
                    setload(true)
                    const data ={
                      
                      email:fields.email,
                     
                     

                    }
                    
                    console.log(data)
                    const verificationResp = await apiPostPut(
                      data,
                      '/admin/forgot-password',
                      'POST',
                    );

                    if (verificationResp.status === 200) {
                      // redirect to success page
                      console.log('verification link sent');
                      setreq(true)
                      fields.email="";
                      setload(false)
                    }
                    if (verificationResp.status === 400) {
                      setbadreq(true)
                      setload(false)
                    }
                    // eslint-disable-next-line no-alert
                    // alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    
                  }}
                  render={({ errors, touched }) => (
                    <Form className="mt-3">
                    {load && (
                        <div className="loading">
                          <Spinner color="primary" />
                        </div>
                      )}
                      
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
                        <Button type="submit" color="info" block className="me-2">
                          Reset
                        </Button>
                      </FormGroup>
                      {req && <h6> Reset link was sent to your mail </h6>}
                      {badreq && <span className='text-danger'>Your mail Id does not exist</span>}

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

export default RecoverPassword;
