import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDashboard } from '../../../store/api/dashboard';


// const enrolledcourses = [
//   {
//     id: 1,
//     icon: Icon.Clock,
//     title: 'Today enrolled courses',
//     earn: '23',
//     color: 'primary',
//   },
//   {
//     id: 2,
//     icon: Icon.Edit,
//     title: 'Week enrolled courses',
//     earn: '56',
//     color: 'cyan',
//   },
//   {
//     id: 3,
//     icon: Icon.Calendar,
//     title: 'Month enrolled courses',
//     earn: '95',
//     color: 'purple',
//   },
//   {
//     id: 4,
//     icon: Icon.Users,
//     title: 'Total enrolled courses',
//     earn: '86',
//     color: 'warning',
//   },
// ];

const Enrolledcourses = () => {

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

  const enrolledcourses = [
    {
      id: 1,
      icon: Icon.Clock,
      title: 'Today enrolled courses',
      earn: state.dashboarddata?.data?.data[19].value?state.dashboarddata?.data?.data[19].value:"0",
      color: 'primary',
    },
    {
      id: 2,
      icon: Icon.Edit,
      title: 'Week enrolled courses',
      earn: state.dashboarddata?.data?.data[18].value?state.dashboarddata?.data?.data[18].value:"0",
      color: 'cyan',
    },
    {
      id: 3,
      icon: Icon.Calendar,
      title: 'Month enrolled courses',
      earn: state.dashboarddata?.data?.data[17].value?state.dashboarddata?.data?.data[17].value:"0",
      color: 'purple',
    },
    {
      id: 4,
      icon: Icon.Users,
      title: 'Total enrolled courses',
      earn: state.dashboarddata?.data?.data[16].value?state.dashboarddata?.data?.data[16].value:"0",
      color: 'warning',
    },
  ];
  return (
    <Card>
      <Row>
        {enrolledcourses.map((item) => (
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

export default Enrolledcourses;
