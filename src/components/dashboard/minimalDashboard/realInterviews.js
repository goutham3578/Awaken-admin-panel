import { Row, Col, Card, Progress, CardBody } from 'reactstrap';

import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDashboard } from '../../../store/api/dashboard';


// const users = [
//   {
//     id: 1,
//     icon: Icon.Clock,
//     title: 'Today Users',
//     earn: '23',
//     color: 'primary',
//   },
//   {
//     id: 2,
//     icon: Icon.Edit,
//     title: 'Week Users',
//     earn: '56',
//     color: 'cyan',
//   },
//   {
//     id: 3,
//     icon: Icon.Calendar,
//     title: 'Month Users',
//     earn: '95',
//     color: 'purple',
//   },
//   {
//     id: 4,
//     icon: Icon.Users,
//     title: 'Total Users',
//     earn: '86',
//     color: 'warning',
//   },
// ];

const RealInterview = () => {


  const dispatch = useDispatch();
  const state = useSelector((stat) => stat);

  useEffect(() => {
    dispatch(fetchDashboard());
    if (state.dashboarddata) {
      if (state.dashboarddata.data) {
        console.log("data", state.dashboarddata?.data?.data[0].value);
      }
    }
  }, []);
  const users = [
    {
      id: 1,
      icon: Icon.Clock,
      title: 'Today Real Interviews',
      earn: state.dashboarddata?.data?.data[3].value ? state.dashboarddata?.data?.data[31].value : "0",
      color: 'primary',
    },
    {
      id: 2,
      icon: Icon.Edit,
      title: 'Week Real Interviews',
      earn: state.dashboarddata?.data?.data[2].value ? state.dashboarddata?.data?.data[30].value : "0",
      color: 'cyan',
    },
    {
      id: 3,
      icon: Icon.Calendar,
      title: 'Month Real Interviews',
      earn: state.dashboarddata?.data?.data[1].value ? state.dashboarddata?.data?.data[29].value : "0",
      color: 'purple',
    },
    {
      id: 4,
      icon: Icon.Users,
      title: 'Total Real Interviews',
      earn: state.dashboarddata?.data?.data[0].value ? state.dashboarddata?.data?.data[28].value : "0",
      color: 'warning',
    },
  ];

  return (
    <Card>
      <Row>
        {users.map((item) => (
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

export default RealInterview;
