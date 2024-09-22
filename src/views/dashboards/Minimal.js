// import { Row, Col, Button } from 'reactstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// // import Chat from '../../components/dashboard/minimalDashboard/Chat';
// // import Messages from '../../components/dashboard/minimalDashboard/Messages';
// // import RecentComments from '../../components/dashboard/minimalDashboard/RecentComments';
// import RevenueCards from '../../components/dashboard/minimalDashboard/RevenueCards';
// import ReviewCard from '../../components/dashboard/minimalDashboard/ReviewCard';
// // import Sales from '../../components/dashboard/minimalDashboard/Sales';
// // import SalesDifference from '../../components/dashboard/minimalDashboard/SalesDifference';
// // import SalesOverview from '../../components/dashboard/minimalDashboard/SalesOverview';
// // import TodoList from '../../components/dashboard/minimalDashboard/TodoList';
// // import VisitStatistics from '../../components/dashboard/minimalDashboard/VisitStatistics';
// import WeatherCard from '../../components/dashboard/minimalDashboard/WeatherCard';
// import YearlySales from '../../components/dashboard/minimalDashboard/YearlySales';
// import Coupons from '../../components/dashboard/minimalDashboard/coupons';
// import Enrolledcourses from '../../components/dashboard/minimalDashboard/enrolleCourses';
// import Interviews from '../../components/dashboard/minimalDashboard/interviews';
// import CompletedInterviews from '../../components/dashboard/minimalDashboard/CompletedInterviews';
// import IncompletedInterviews from '../../components/dashboard/minimalDashboard/IncompletedInterviews';
// import { fetchDashboard } from '../../store/api/dashboard';
// import interviewCard from '../../components/dashboard/minimalDashboard/InterviewCard';
// import InterviewCard from '../../components/dashboard/minimalDashboard/InterviewCard';
// import UserDetails from '../../components/dashboard/minimalDashboard/UserDetails';
// import React, { useState } from 'react';
// import RealInterview from '../../components/dashboard/minimalDashboard/realInterviews';
// import RealIncomopleteInterview from '../../components/dashboard/minimalDashboard/realIncompletedInterviews';
// import RealComopleteInterview from '../../components/dashboard/minimalDashboard/realCompletedInterviews';

// const Minimal = () => {
//   const dispatch = useDispatch();
//   const state = useSelector((stat) => stat);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   useEffect(() => {
//     dispatch(fetchDashboard());
//     if (state.dashboarddata) {
//       console.log("data", state.dashboarddata);
//     }
//   }, []);

//   return (
//     <>
//       {/*********************Sales Overview ************************/}

//       {/* {state.dashboarddata && state.dashboarddata.data && state.dashboarddata.data.map((e) => <li>{e.name}</li>)}
//      */}
//       <Row>
//         <Col lg="8">
//           <YearlySales />
//         </Col>
//         <Col lg="4">
//           <WeatherCard />
//           <ReviewCard />
//           {/* <InterviewCard></InterviewCard> */}
//         </Col>
//         {/* <Col lg="6">
//           <RecentComments />
//         </Col>
//         <Col lg="6">
//           <SalesOverview />
//         </Col> */}
//         {/* <Col lg="8">
//           <SalesDifference />
//         </Col>
//         <Col lg="4">
//           <Sales />
//           <VisitStatistics />
//         </Col> */}

//         {/* <Col lg="4" className='d-flex align-items-stretch'>
//           <TodoList />
//         </Col>
//         <Col lg="4" className='d-flex align-items-stretch'>
//           <Messages />
//         </Col>
//         <Col lg="4" className='d-flex align-items-stretch'>
//           <Chat />
//         </Col> */}
//       </Row>
//     </>
//   );
// };

// export default Minimal;
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row, Col, Button, Table, Badge, ModalBody, Modal } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // Import the necessary components
import { MdAddCircleOutline } from 'react-icons/md';
import bag from '../../assets/images/svg/bag.svg';
import pending from '../../assets/images/svg/pending.svg';
import completed from '../../assets/images/svg/completed.svg';
import { useNavigate } from 'react-router-dom';

import { useStores } from '../../store1';
import { Loader } from 'react-feather';
import { useObserver } from 'mobx-react';
import RegisterFormik from '../auth/RegisterFormik';

// Register the scales and components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [popup, setPopUp] = useState(false);
  const { Leads } = useStores();
  const userLocal = JSON.parse(localStorage.getItem("User"))
  useEffect(() => {
    Leads.getLeads('');
  }, []);

  const formatDate = (date) => {
    const originalDate = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  // Dummy data for chart
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [6, 10, 15, 8, 14, 9, 13],
        fill: false,
        borderColor: '#1214B1',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        grid: {
          color: 'rgba(18, 20, 177, 0.2)', // Change the X-axis gridline color
        },
      },
      x: {
        grid: {
          display: false, // Change the Y-axis gridline color
        },
      },
    },
  };
  const handleclick = (value) => {
    if (value == 'financial') navigate('/dashboards/minimal/FinancialLeads');
    if (value == 'pending') navigate('/dashboards/minimal/pendingleads');
    if (value == 'completed') navigate('/dashboards/minimal/completedleads');
  };

  const showstatus = (value) => {
    if (value == 'approved') {
      return 'Approved';
    } else if (value == 'adminNew') {
      return 'New Lead';
    } else {
      return 'Pending';
    }
  };

  const checkColor=(value)=>{
    if (value == 'approved') {
      return '#00AB11';
    } else if (value == 'adminNew') {
      return '#344071';
    } else {
      return '#FFEAA0';
    }
  }


const {User}=useStores();
console.log(User.user.firstName)
  return useObserver(() => (
    <div className="container rounded-3 p-3" style={{ backgroundColor: '#edf1f5' }}>
      {/* Greeting and Lead Cards */}
      <Row className="mb-4 d-flex align-items-center p-3">
        <Col md="8">
          <h3 style={{ fontWeight: 500 }}>
            Good morning,{' '}
            <span className="text-success " style={{ fontWeight: 500 }}>
             {userLocal?.firstName+' '+userLocal?.lastName}
            </span>
          </h3>
        </Col>
        <Col md="4" className="d-flex justify-content-end" style={{ paddingRight: '2%' }}>
          <Button
            color="success"
            className="rounded-pill p-3 fs-4 align-items-center d-flex gap-2"
            onClick={() => setPopUp(true)}
          >
            <MdAddCircleOutline className="fs-3" />
            Create new Financial planner
          </Button>
        </Col>
      </Row>
      <Row>
        <Modal isOpen={popup} toggle={() => setPopUp(!popup)} centered className="centered-modal">
          <ModalBody style={{ height: '80vh', backgroundColor: 'white', borderRadius: '2%' }}>
            <RegisterFormik setPopUp={setPopUp} />
          </ModalBody>
        </Modal>

        <Col md="4">
          <Card className="shadow rounded-3 bg-white" onClick={() => handleclick('financial')}>
            <CardBody>
              <Row className="d-flex align-items-center justify-content-center mb-3 pb-2 border-bottom border-gray">
                <Col xs="2">
                  <img src={bag} alt="bag" style={{ width: '30px', borderRadius: '100%' }} />
                </Col>
                <Col xs="10" className="m-0">
                  <p style={{ fontWeight: 800 }} className="m-0">
                    New Leads
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-between align-items-center mt-2">
                <Col md="9">
                  <h5 className="text-awaken fw-semibold fs-4 ">New Leads</h5>
                </Col>
                <Col md="3">
                  <h3 className="fw-semibold" style={{ fontSize: 50 }}>
                    {Leads.counts.newLeads}
                  </h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="shadow rounded-3 bg-white" onClick={() => handleclick('pending')}>
            <CardBody>
              <Row className="d-flex align-items-center justify-content-center mb-3 pb-2 border-bottom border-gray">
                <Col xs="2">
                  <img src={pending} alt="bag" style={{ width: '30px', borderRadius: '100%' }} />
                </Col>
                <Col xs="10" className="m-0">
                  <p style={{ fontWeight: 800 }} className="m-0">
                    Pending Leads
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-between align-items-center mt-2">
                <Col md="9">
                  <h5 className="text-awaken2 fw-semibold fs-4">Pending Leads</h5>
                </Col>
                <Col md="3">
                  <h3 className="fw-semibold" style={{ fontSize: 50 }}>
                    {Leads.counts.pendingLeads}
                  </h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="shadow rounded-3 bg-white" onClick={() => handleclick('completed')}>
            <CardBody>
              <Row className="d-flex align-items-center justify-content-center mb-3 pb-2 border-bottom border-gray">
                <Col xs="2">
                  <img src={completed} alt="bag" style={{ width: '30px', borderRadius: '100%' }} />
                </Col>
                <Col xs="10" className="m-0">
                  <p style={{ fontWeight: 800 }} className="m-0">
                    Completed Leads
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-between align-items-center mt-2">
                <Col md="9">
                  <h5 className="text-success fw-semibold fs-4">Completed Leads</h5>
                </Col>
                <Col md="3">
                  <h3 className="fw-semibold" style={{ fontSize: 50 }}>
                    {Leads.counts.completedLeads}
                  </h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <h5 className="fw-semibold mt-5" style={{ fontSize: 20 }}>
        Recent activity
      </h5>
      {/* Recent Activity */}
      <Row>
        <Col md="8">
          <Card className="shadow m-0 p-0 rounded-3">
            {Leads.loading ? (
              <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
            ) : (
              <CardBody>
                <Table hover responsive>
                  <thead>
                    <tr className="bg-white">
                      <th style={{ color: '#344071', fontWeight: 'normal' }}>S.no</th>
                      <th style={{ color: '#344071', fontWeight: 'normal' }}>
                        Name of the Financial planner
                      </th>
                      <th style={{ color: '#344071', fontWeight: 'normal' }}>created on</th>
                      <th style={{ color: '#344071', fontWeight: 'normal' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Leads.allLeads.map((lead, index) => (
                      <tr key={index} className="align-items-center ">
                        <td className="text-formtextcolor">{index + 1}</td>
                        <td className="text-formtextcolor">
                          {lead.awareness.personalDetails.name}
                        </td>
                        <td className="text-formtextcolor">{formatDate(lead.createdAt)}</td>
                        <td className="d-flex align-items-center">
                          <p
                            className="border border-reaidy-orange text-white"
                            style={{ borderRadius: 5, padding: '5%',backgroundColor:checkColor(lead.status)}}
                          >
                            {showstatus(lead.status)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            )}
          </Card>
        </Col>

        {/* Side Stats */}
        <Col md="4">
          <Card className="mb-4 shadow bg-white rounded-3">
            <CardBody>
              <div className="d-flex justify-content-between">
                <h6 className="fw-semibold" style={{ fontSize: 15 }}>
                  Leads from last week
                </h6>
                <select className="bg-dropdown rounded-3 fs-6 border-dropdown">
                  <option value="" disabled selected>
                    Select a range
                  </option>
                  <option value="01 jun - 06 june">01 Jun - 06 June</option>
                  <option value="07 jun - 12 june">07 Jun - 12 June</option>
                  <option value="13 jun - 18 june">13 Jun - 18 June</option>
                  <option value="19 jun - 24 june">19 Jun - 24 June</option>
                </select>
              </div>
              <Line data={chartData} options={chartOptions} />
            </CardBody>
          </Card>

          <Card className="shadow bg-white rounded-3">
            <CardBody>
              <Row>
                <h6 className="text-awaken fw-semibold fs-4 ">Total Leads</h6>
              </Row>
              <Row>
                <p className="fw-semibold text-center" style={{ fontSize: 60 }}>
                  {Leads.allLeads.length}
                </p>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  ));
};

export default Dashboard;
