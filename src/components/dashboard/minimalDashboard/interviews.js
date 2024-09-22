import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
import * as Icon from 'react-feather';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../../store/api/dashboard';
// import { useEffect } from 'react';

// const interviews = [
//   {
//     id: 1,
//     icon: Icon.Clock,
//     title: 'Today interviews',
//     earn: '23',
//     color: 'primary',
//   },
//   {
//     id: 2,
//     icon: Icon.Edit,
//     title: 'Week interviews',
//     earn: '56',
//     color: 'cyan',
//   },
//   {
//     id: 3,
//     icon: Icon.Calendar,
//     title: 'Month interviews',
//     earn: '95',
//     color: 'purple',
//   },
//   {
//     id: 4,
//     icon: Icon.Users,
//     title: 'Total interviews',
//     earn: '86',
//     color: 'warning',
//   },
// ];

const Interviews = () => {
  
  const dispatch = useDispatch();
  const state = useSelector((stat) => stat);
  useEffect(() => {
    dispatch(fetchDashboard());
    if (state.dashboarddata) {
     if(state.dashboarddata.data){
      console.log("data",state.dashboarddata?.data?.data[0].value);
     }
    }
  }, []);
  const interviews = [
    {
      id: 1,
      icon: Icon.Clock,
      title: 'Today interviews',
      earn: state.dashboarddata?.data?.data[23].value?state.dashboarddata?.data?.data[23].value:"0",
      color: 'primary',
    },
    {
      id: 2,
      icon: Icon.Edit,
      title: 'Week interviews',
      earn: state.dashboarddata?.data?.data[22].value?state.dashboarddata?.data?.data[22].value:"0",
      color: 'cyan',
    },
    {
      id: 3,
      icon: Icon.Calendar,
      title: 'Month interviews',
      earn: state.dashboarddata?.data?.data[21].value?state.dashboarddata?.data?.data[21].value:"0",
      color: 'purple',
    },
    {
      id: 4,
      icon: Icon.Users,
      title: 'Total interviews',
      earn: state.dashboarddata?.data?.data[20].value?state.dashboarddata?.data?.data[20].value:"0",
      color: 'warning',
    },
  ];
  return (
    <Card>
      <Row>
        {interviews.map((item) => (
          <Col lg="3" md="6" className="border-end" key={item.id}>
            <CardBody>
              <div className="d-flex align-items-center">
                <div>
                  <item.icon className="text-dark" />
                  <p className="mb-3 mt-2 font-weight-bold fs-6 text-muted">
                    {item.title}
                  </p>
                </div>

                <div className="ms-auto">
                  <h2 className={`text-${item.color}`}>{item.earn}</h2>
                </div>
              </div>

              <Progress value={item.earn} color={item.color} />
            </CardBody>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default Interviews;

// // Interviews.js
// import React from 'react';
// // import { connect } from 'react-redux';
// // import PropTypes from 'prop-types';

// import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
// // import { fetchInterviewData as fetchInterviewDataAction } from '../../../store/api/actions';

// const Interviews = () => {
//   // useEffect(() => {
//   //   // Use fetchInterviewData directly without redeclaring it
//   //   fetchInterviewData();
//   // }, [fetchInterviewData]);

//   // if (loading) {
//   //   return <p>Loading...</p>;
//   // }

//   // if (error) {
//   //   return <p>Error: {error}</p>;
//   // }

//   return (
//     <Card>
//       <Row>
//         {[{ name: "name", label: "lable", value: "value" }].map((item) => (
//           <Col lg="3" md="6" className="border-end" key={item.name}>
//             <CardBody>
//               <div className="d-flex align-items-center">
//                 <div>
//                   <p className="mb-3 mt-2 font-weight-bold fs-6 text-muted">
//                     {item.label}
//                   </p>
//                 </div>

//                 <div className="ms-auto">
//                   <h2>{item.value}</h2>
//                 </div>
//               </div>

//               <Progress value={item.value} color="primary" />
//             </CardBody>
//           </Col>
//         ))}
//       </Row>
//     </Card>
//   );
// };






// export default Interviews;
