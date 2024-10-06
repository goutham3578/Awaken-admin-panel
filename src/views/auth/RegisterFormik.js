// import React, { useEffect, useState } from 'react';
// import { Button, FormGroup, Container, Row, Col, Navbar, NavItem, Nav, Alert } from 'reactstrap';
// import { Formik, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import awaken from '../../assets/images/svg/awaken.svg';
// import AuthLogo from '../../layouts/logo/AuthLogo';
// import FactInput from '../components/FactInput';
// import { apiPostPut } from '../../api/api_methods';

// const RegisterFormik = () => {
//   const [open, setOpen] = useState('password');
//   const showPassword = () => {
//     setOpen(open === 'password' ? 'text' : 'password');
//   };

//   const navigate = useNavigate();
//   const [load, setLoad] = useState(false);
//   const [id, setId] = useState('');

//   useEffect(() => {
//     getIdFromUrl();
//     disableAutofill();
//   }, []);

//   // const getIdFromUrl = () => {
//   //   try {
//   //     const url = window.location.href;
//   //     if (url.includes('/auth')) {
//   //       return null;
//   //     }
//   //     const id1 = url.split('/').pop();
//   //     setId(id1);
//   //     initialValues.clusterId = id1;
//   //   } catch (error) {
//   //     return null;
//   //   }
//   // };

//   const [initialValues, setInitialValues] = useState({
//     firstname: '',
//     lastname: '',
//     mobile: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     acceptTerms: false,
//     clusterId: '',
//   });

//   const getIdFromUrl = () => {
//     try {
//       const url = window.location.href;
//       if (url.includes('/auth')) {
//         return null;
//       }
//       const id1 = url.split('/').pop();
//       setId(id1);
//       setInitialValues((prevValues) => ({
//         ...prevValues,
//         clusterId: id1,
//       }));
//     } catch (error) {
//       return null;
//     }
//   };

//   const handleclick = () => {
//     navigate('/loginformik');
//   };
//   const [firstname, setfirstname] = useState('');
//   const [lastname, setlastname] = useState('');

//   const [mobile, setmobile] = useState('');

//   const [email, setemail] = useState('');

//   const [password, setpassword] = useState('');
//   const [confirmpassword, setconfirmpassword] = useState('');

//   const handlenames = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case 'firstname':
//         setfirstname(value);
//         console.log(value);
//         break;
//       case 'lastname':
//         setlastname(value);
//         break;
//       case 'mobile':
//         setmobile(value);
//         break;
//       case 'email':
//         setemail(value);
//         break;
//       case 'password':
//         setpassword(value);
//         break;
//       case 'confirmPassword':
//         setconfirmpassword(value);
//         break;
//       default:
//         break;
//     }
//   };
//   const body = {
//     firstName: firstname,
//     lastName: lastname,
//     email: email,
//     password: password,
//     mobileNumber: mobile,
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     console.log('in handlesubmit');
//     console.log('Password:', password, 'Confirm Password:', confirmpassword);
//     console.log(firstname, lastname, email, password, confirmpassword, mobile);
//     if (password === confirmpassword) {
//       const response = await apiPostPut(body, '/users/create-user', 'POST');
//       if (response.status == 200) {
//         navigate('/loginformik');
//       } else {
//         Alert('Something went wrong');
//       }
//     } else {
//       console.log('Passwords do not match');
//     }
//   };

//   const validationSchema = Yup.object().shape({
//     firstname: Yup.string().required('First Name is required'),
//     lastname: Yup.string().required('Last Name is required'),
//     mobile: Yup.string().required('Mobile is required'),
//     email: Yup.string().email('Email is invalid').required('Email is required'),
//     password: Yup.string()
//       .min(6, 'Password must be at least 6 characters')
//       .required('Password is required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Confirm Password is required'),
//     acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
//   });

//   // const onSubmit = (fields, { setSubmitting, resetForm }) => {
//   //   console.log('Form submission initiated:', fields);
//   //   setLoad(true);

//   //   // Simulate an API call
//   //   setTimeout(() => {
//   //     console.log('Submitted fields:', fields);
//   //     resetForm(); // Reset the form after submission
//   //     setLoad(false); // Stop loading
//   //     setSubmitting(false); // Set submitting to false after submission
//   //   }, 1000);
//   // };

//   const disableAutofill = () => {
//     const inputs = document.querySelectorAll(
//       'input[name="email"], input[name="mobile"], input[name="password"], input[name="confirmPassword"]',
//     );
//     inputs.forEach((input) => {
//       input.setAttribute('autocomplete', 'off');
//     });
//   };

//   return (
//     <div className="loginBox">
//       <Navbar color="light" light expand="md">
//         <Row className="w-100 justify-content-between">
//           <Col md="auto">
//             <Link to="/">
//               <AuthLogo />
//             </Link>
//           </Col>
//           <Col md="auto" className="d-flex align-items-center">
//             <Nav className="ml-auto gap-5" navbar>
//               <NavItem>
//                 <NavLink
//                   href="#"
//                   className="fs-3"
//                   style={{ textDecoration: 'none', color: '#344071' }}
//                 >
//                   About
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink
//                   href="#"
//                   className="fs-3"
//                   style={{ textDecoration: 'none', color: '#344071' }}
//                 >
//                   FAQ
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink
//                   href="#"
//                   className="fs-3"
//                   style={{ textDecoration: 'none', color: '#344071' }}
//                 >
//                   Contact Us
//                 </NavLink>
//               </NavItem>
//             </Nav>
//           </Col>
//           <Col className="d-flex align-items-center justify-content-end">
//             <NavItem>
//               <Button style={{ backgroundColor: '#03AE52', color: 'white', borderRadius: 10 }}>
//                 Book a Free Demo
//               </Button>
//             </NavItem>
//           </Col>
//         </Row>
//       </Navbar>

//       <Container fluid className="d-flex flex-column vh-100 p-0" style={{ width: '100%' }}>
//         <Row className="p-0 m-0 w-100" style={{ width: '100%' }}>
//           {/* Left side illustration */}
//           <Col
//             className="d-none d-md-block "
//             style={{ width: '50%', marginLeft: '-7%', marginTop: '-7%' }}
//           >
//             <img src={awaken} alt="Login" width="100%" height="80%" />
//           </Col>

//           {/* Right side form */}
//           <Col
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               width: '50%',
//               marginTop: '-10%',
//             }}
//           >
//             {/* Login Link */}
//             <Row className="w-100 d-flex justify-content-end px-4 pt-5">
//               <Col md="auto" className="d-flex justify-content-end align-items-center">
//                 <span className="fs-5" style={{ color: '#1214B1' }}>
//                   Already have an account?
//                 </span>
//                 <Button
//                   style={{ borderWidth: 1, borderColor: '#1214B1' }}
//                   color="primary"
//                   outline
//                   className="ms-2"
//                   onClick={handleclick}
//                 >
//                   Login
//                 </Button>
//               </Col>
//             </Row>

//             {/* Signup Form */}
//             <Row
//               style={{
//                 display: 'flex',
//                 alignItems: 'start',
//                 justifyContent: 'start',
//                 marginLeft: 0,
//               }}
//             >
//               <Col md="12" lg="10">
//                 <h2 className="mb-4" style={{ fontWeight: 'bold', paddingTop: '15%' }}>
//                   Enter details to Sign up
//                 </h2>
//                 <Formik initialValues={initialValues} validationSchema={validationSchema}>
//                   {({ errors, touched, values, handleChange }) => (
//                     <Form onSubmit={handlesubmit}>
//                       <Row>
//                         <Col md="6" className="mb-3">
//                           <FormGroup>
//                             <FactInput
//                               name="firstname"
//                               type="text"
//                               label="First Name"
//                               value={firstname}
//                               onChange={handlenames}
//                             />
//                             <ErrorMessage
//                               name="firstname"
//                               component="div"
//                               className="invalid-feedback"
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md="6" className="mb-3">
//                           <FormGroup>
//                             <FactInput
//                               name="lastname"
//                               type="text"
//                               label="Last Name"
//                               value={lastname}
//                               onChange={handlenames}
//                             />
//                             <ErrorMessage
//                               name="lastname"
//                               component="div"
//                               className="invalid-feedback"
//                             />
//                           </FormGroup>
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col md="6" className="mb-3">
//                           <FormGroup>
//                             <FactInput
//                               name="mobile"
//                               type="text"
//                               label="Mobile No."
//                               value={mobile}
//                               onChange={handlenames}
//                               style={{ height: '20%' }}
//                             />
//                             <ErrorMessage
//                               name="mobile"
//                               component="div"
//                               className="invalid-feedback"
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md="6" className="mb-3">
//                           <FormGroup>
//                             <FactInput
//                               name="email"
//                               type="text"
//                               label="Email"
//                               value={email}
//                               onChange={handlenames}
//                             />
//                             <ErrorMessage
//                               name="email"
//                               component="div"
//                               className="invalid-feedback"
//                             />
//                           </FormGroup>
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col md="6" className="mb-3">
//                           <FormGroup>
//                             <div className="position-relative">
//                               <FactInput
//                                 name="password"
//                                 type={open}
//                                 label="Set Password"
//                                 value={password}
//                                 onChange={handlenames}
//                               />
//                               <ErrorMessage
//                                 name="password"
//                                 component="div"
//                                 className="invalid-feedback"
//                               />
//                               <Button
//                                 color="link"
//                                 className="position-absolute"
//                                 style={{
//                                   top: '50%',
//                                   right: '15%', // Adjusts the positioning inside the input box
//                                   transform: 'translateY(-50%)',
//                                   zIndex: 1,
//                                   padding: '0',
//                                 }}
//                                 onClick={showPassword}
//                               >
//                                 {open === 'password' ? <FaRegEyeSlash /> : <FaRegEye />}
//                               </Button>
//                             </div>
//                           </FormGroup>
//                         </Col>
//                         <Col md="6" className="mb-3">
//                           <FormGroup>
//                             <FactInput
//                               name="confirmPassword"
//                               type="text"
//                               label="Confirm Password"
//                               value={confirmpassword}
//                               onChange={handlenames}
//                             />
//                             <ErrorMessage
//                               name="confirmPassword"
//                               component="div"
//                               className="invalid-feedback"
//                             />
//                           </FormGroup>
//                         </Col>
//                       </Row>

//                       <Button
//                         type="submit"
//                         color="success"
//                         className="mt-4 px-4 py-3"
//                         style={{ borderRadius: 10 }}
//                       >
//                         Sign up now
//                       </Button>
//                     </Form>
//                   )}
//                 </Formik>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default RegisterFormik;

import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Container, Row, Col, Alert } from 'reactstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Layer from '../../assets/images/svg/Layer.png';
import FactInput from '../components/FactInput';
import { apiPostPut } from '../../api/api_methods';
import { IoCloseCircleOutline } from 'react-icons/io5';
const RegisterFormik = ({ setPopUp }) => {
  const [open, setOpen] = useState('password');
  const navigate = useNavigate();
  const [id, setId] = useState('');

  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    clusterId: '',
  });

  useEffect(() => {
    getIdFromUrl();
  }, []);

  const getIdFromUrl = () => {
    try {
      const url = window.location.href;
      if (!url.includes('/auth')) {
        const id1 = url.split('/').pop();
        setId(id1);
        setInitialValues((prevValues) => ({
          ...prevValues,
          clusterId: id1,
        }));
      }
    } catch (error) {
      return null;
    }
  };

  const handleClick = () => {
    navigate('/loginformik');
  };

  const handlenames = (e) => {
    const { name, value } = e.target;
    setInitialValues({ ...initialValues, [name]: value });
  };
  const [message,setMessage]=useState()
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, mobile, email, password, confirmPassword } = initialValues;
    if (password === confirmPassword) {
      const body = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        mobileNumber: mobile,
      };
      const response = await apiPostPut(body, '/users/create-user', 'POST');
      if (response.status === 200) {
         setPopUp(false);
         alert("user created successfully")
      } else {
        Alert('Something went wrong');
        setMessage(response?.body?.message)
      }
    } else {
      console.log('Passwords do not match');
    }
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    mobile: Yup.string().required('Mobile is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const showPassword = () => setOpen(open === 'password' ? 'text' : 'password');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflowY:'scroll',
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none',    
        margin:0,
        padding:0     
      }}
    >
      <IoCloseCircleOutline
        size={20}
        style={{
          position: 'absolute',
          top: '10px', // Adjust as needed
          right: '10px', // Adjust as needed
          cursor: 'pointer',
        }}
        onClick={() => setPopUp(false)}
      />{' '}
      <Container fluid className="d-flex justify-content-center" style={{padding:"6% 0"}} >
        <Row className="m-0 h-100">
          {/* Left side illustration */}
          <Col md="6" className="d-none d-md-block p-0 center d-flex justify-content-center align-items-center">
            <img
              src={Layer}
              alt="Login"
              style={{   width: '90%', // Use full width
                height: '90%',objectFit: 'cover'}}
            />
          </Col>

          {/* Right side form */}
          <Col md="6" className="d-flex flex-column" >
            {/* Login Link */}
            <Row className="d-flex justify-content-end"></Row>

            {/* Signup Form */}
            <Row>
              <Col md="12">
                <h2 className="mb-5" style={{ fontWeight: 'bold' }}>
                  Create a new financial planner
                </h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema}>
                  {() => (
                    <Form onSubmit={handlesubmit}>
                      <Row>
                        <Col md="6" className="mb-3">
                          <FormGroup>
                            <FactInput
                              name="firstname"
                              type="text"
                              label="First Name"
                              value={initialValues.firstname}
                              onChange={handlenames}
                            />
                            <ErrorMessage
                              name="firstname"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6" className="mb-3">
                          <FormGroup>
                            <FactInput
                              name="lastname"
                              type="text"
                              label="Last Name"
                              value={initialValues.lastname}
                              onChange={handlenames}
                            />
                            <ErrorMessage
                              name="lastname"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6" className="mb-3">
                          <FormGroup>
                            <FactInput
                              name="mobile"
                              type="text"
                              label="Mobile No."
                              value={initialValues.mobile}
                              onChange={handlenames}
                            />
                            <ErrorMessage
                              name="mobile"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6" className="mb-3">
                          <FormGroup>
                            <FactInput
                              name="email"
                              type="email"
                              label="Email"
                              value={initialValues.email}
                              onChange={handlenames}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6" className="mb-3">
                          <FormGroup>
                            <div className="position-relative">
                              <FactInput
                                name="password"
                                type={open}
                                label="Set Password"
                                value={initialValues.password}
                                onChange={handlenames}
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                              <Button
                                color="link"
                                className="position-absolute"
                                style={{
                                  top: '50%',
                                  right: '10%',
                                  transform: 'translateY(-50%)',
                                  zIndex: 1,
                                }}
                                onClick={showPassword}
                              >
                                {open === 'password' ? <FaRegEyeSlash /> : <FaRegEye />}
                              </Button>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6" className="mb-3">
                          <FormGroup>
                            <FactInput
                              name="confirmPassword"
                              type="password"
                              label="Confirm Password"
                              value={initialValues.confirmPassword}
                              onChange={handlenames}
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
<p style={{color:'red'}}>{message}</p>
<div className="d-flex justify-content-end"> {/* Wrap button in this div */}
                  <Button
                    type="submit"
                    color="success"
                    className="px-4 py-3"
                    style={{
                      borderRadius: 10,
                      width: '25%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    start now
                  </Button>
                </div>
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

export default RegisterFormik;
