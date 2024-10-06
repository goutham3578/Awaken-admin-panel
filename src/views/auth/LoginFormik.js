// import React, { useState } from 'react';
// import {
//   Button,
//   Label,
//   FormGroup,
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Input,
//   Spinner,
// } from 'reactstrap';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Link, useNavigate } from 'react-router-dom';
// import AuthLogo from '../../layouts/logo/AuthLogo';
// import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
// import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
// import { apiPostPut } from '../../api/api_methods';
// import { useDispatch } from 'react-redux';
// import { login } from '../../store/api/auth'; // Import the login action from your Redux slice
// import Loader from '../../layouts/loader/Loader';

// const LoginFormik = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [badreq, setbadreq] = useState(false);
//   const [load, setload] = useState(false);

//   const initialValues = {
//     email: '',
//     password: '',
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email('Email is invalid').required('Email is required'),
//     password: Yup.string()
//       .min(6, 'Password must be at least 6 characters')
//       .required('Password is required'),
//   });

//   return (
//     <div className="loginBox">
//       <LeftBg className="position-absolute left bottom-0" />
//       <RightBg className="position-absolute end-0 top" />
//       <Container fluid className="h-100">
//         <Row className="justify-content-center align-items-center h-100">
//           <Col lg="12" className="loginContainer">
//             <AuthLogo />
//             <Card>
//               <CardBody className="p-4 m-1">
//                 <h5 className="mb-0">Login</h5>
//                 <small className="pb-4 d-block">
//                   Do not have an account? <Link to="/auth/registerformik">Sign Up</Link>
//                 </small>
//                 <Formik
//                   initialValues={initialValues}
//                   validationSchema={validationSchema}
//                   onSubmit={async (fields) => {
//                     setload(true);
//                     const data = {
//                       email: fields.email,
//                       password: fields.password,
//                     };
//                     console.log(data);
//                     const verificationResp = await apiPostPut(data, '/admin/login', 'POST');

//                     if (verificationResp.status === 200) {
//                       // redirect to success page
//                       console.log('login Successfull');
//                       console.log(verificationResp.body.data);
//                       setload(false);

//                       dispatch(login()); // Dispatch the login action
//                       localStorage.setItem('user', JSON.stringify(verificationResp.body.data));

//                       navigate('/dashboards/minimal');
//                     }
//                     if (verificationResp.status === 400) {
//                       setbadreq(true);
//                     }
//                   }}
//                   render={({ errors, touched }) => (
//                     <Form>
//                       {load && (
//                         <div className="loading">
//                           <Spinner color="primary" />
//                         </div>
//                       )}
//                       <FormGroup>
//                         <Label htmlFor="email">Email</Label>
//                         <Field
//                           name="email"
//                           type="text"
//                           className={`form-control${
//                             errors.email && touched.email ? ' is-invalid' : ''
//                           }`}
//                         />
//                         <ErrorMessage name="email" component="div" className="invalid-feedback" />
//                       </FormGroup>
//                       <FormGroup>
//                         <Label htmlFor="password">Password</Label>
//                         <Field
//                           name="password"
//                           type="password"
//                           className={`form-control${
//                             errors.password && touched.password ? ' is-invalid' : ''
//                           }`}
//                         />
//                         <ErrorMessage
//                           name="password"
//                           component="div"
//                           className="invalid-feedback"
//                         />
//                       </FormGroup>
//                       <FormGroup className="form-check d-flex" inline>
//                         <Label check>
//                           <Input type="checkbox" />
//                           Remember me
//                         </Label>
//                         <Link className="ms-auto text-decoration-none" to="/auth/RecoverPwd">
//                           <small>Forgot Password</small>
//                         </Link>
//                       </FormGroup>
//                       <FormGroup>
//                         <Button type="submit" color="primary" className="me-2">
//                           Login
//                         </Button>
//                       </FormGroup>
//                       {badreq && (
//                         <span className="text-danger">Your password or mail Id is invalid</span>
//                       )}
//                     </Form>
//                   )}
//                 />
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default LoginFormik;

import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import awaken from '../../assets/images/svg/awaken.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import AuthLogo from '../../layouts/logo/AuthLogo';
import FactInput from '../components/FactInput';
import { apiPostPut } from '../../api/api_methods';
import { Bold } from 'react-feather';
import { useStores } from '../../store1';

const Login = () => {
  const [open, setOpen] = useState('password');
  const showPassword = () => {
    setOpen(open === 'password' ? 'text' : 'password');
  };
  const {User}=useStores();
  const [email, setemail] = useState('');

  const [password, setpassword] = useState('');
  const initialValues = {
    email: '',
    password: '',
  };
  const [message,setMessage]=useState()

  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/dashboards/minimal');
  // };

  // const handleclick1 = () => {
  //   navigate('/registerformik');
  // };

  const handlenames = (e) => {
    const { name, value } = e.target; // Extract name and value from event
    switch (name) {
      case 'email':
        setemail(value);
        console.log(value)
        break;
      case 'password':
        setpassword(value);
        break;
      default:
        break;
    }
  };

  const body = {
    email: email,
    password: password,
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
      const response = await apiPostPut(body, '/users/login', 'POST');
      if (response.status == 200) {
        User.setUser(response?.body?.data)
        console.log(User?.user)
        navigate('/dashboards/minimal');
        }
    else{
      Alert('Something went wrong');
      setMessage(response?.body?.message)
    }
  };

  return (
    <div style={{overflowY:"hidden",width:'100%',height:'100vh'}}>
      <Navbar color="light"  expand="md" style={{height:'100px',width:'100%'}}>
        <Row className="w-100 justify-content-between" >
          <Col md="auto">
            <Link to="/">
              <AuthLogo />
            </Link>
          </Col>
        </Row>
      </Navbar>

      <Container className=" m-0 p-0 d-flex justify-content-center align-items-center" style={{width:"100%"}}>
        <Row className="mt-0" style={{width:"100%"}}>
          <Col style={{width:"50%",marginTop:"-8%"}}>
            <img src={awaken} alt="Login" width="100%" height={"80%"}/>
          </Col>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'end',
              width: '40%',
              margin:"0 auto"
            }}
          >
            {/* Login Link */}
            
            {/* Signup Form */}
            <Row
              style={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'start',
                marginLeft: "auto",
              }}
            >
              <Col>
                <h2 className="fs-2" style={{ fontWeight: 'bold',marginBottom:'15%' }}>
                  Enter details to Login
                </h2>
                <Formik initialValues={initialValues}>
                  {({ errors, touched, values, handleChange }) => (
                    <Form onSubmit={handlesubmit}>
                      <Row style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Col className="mb-3">
                          <FormGroup>
                          <div style={{width:'130%'}}>
                            <FactInput
                              name="email"
                              type="text"
                              label="Enter Email-id"
                              value={email}
                              onChange={handlenames}
                            />
                            </div>
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="mb-3">
                          <FormGroup className="position-relative">
                          <div style={{width:'130%'}}>
                            <FactInput
                              name="password"
                              type={open} // Toggles between 'text' and 'password'
                              label="Password"
                              value={password}
                              onChange={handlenames}
                              style={{ paddingRight: '40px' }} // Adds padding to the right so the button doesn't overlap the text
                            />
                            </div>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                            <p style={{color:'red'}}>{message}</p>

                            {/* Eye icon for toggling password visibility */}
                            <Button
                              color="link"
                              className="position-absolute"
                              style={{
                                top: '50%',
                                right:'-20%', // Adjusts the positioning inside the input box
                                transform: 'translateY(-50%)',
                                zIndex: 1,
                                padding: '0',
                              }}
                              onClick={showPassword}
                            >
                              {open === 'password' ? (
                                <FaRegEyeSlash style={{ color: 'black' }} />
                              ) : (
                                <FaRegEye style={{ color: 'black' }} />
                              )}
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
<div className='d-flex justify-content-end' style={{right:0}}><Button type="submit" color="success" className="mt-4 px-4 py-2">
                        Login now
                      </Button></div>
                      
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
