import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
import * as Icon from 'react-feather';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../../store/api/dashboard';

// const completedInterviews = [
//     {
//         id: 1,
//         icon: Icon.Clock,
//         title: 'Today Completed Interviews',
//         earn: '23',
//         color: 'primary',
//         iconcolor: 'success',
//     },
//     {
//         id: 2,
//         icon: Icon.Edit,
//         title: 'Week Completed Interviews',
//         earn: '56',
//         color: 'cyan',
//         iconcolor: 'success',
//     },
//     {
//         id: 3,
//         icon: Icon.Calendar,
//         title: 'Month Completed Interviews',
//         earn: '95',
//         color: 'purple',
//         iconcolor: 'success',
//     },
//     {
//         id: 4,
//         icon: Icon.Users,
//         title: 'Total Completed Interviews',
//         earn: '86',
//         color: 'warning',
//         iconcolor: 'success'
//     },
// ];

const CompletedInterviews = () => {
    
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
  const completedInterviews = [
    {
        id: 1,
        icon: Icon.Clock,
        title: 'Today Completed Interviews',
        earn: state.dashboarddata?.data?.data[27].value?state.dashboarddata?.data?.data[27].value:"0",
        color: 'primary',
        iconcolor: 'success',
    },
    {
        id: 2,
        icon: Icon.Edit,
        title: 'Week Completed Interviews',
        earn: state.dashboarddata?.data?.data[26].value?state.dashboarddata?.data?.data[26].value:"0",
        color: 'cyan',
        iconcolor: 'success',
    },
    {
        id: 3,
        icon: Icon.Calendar,
        title: 'Month Completed Interviews',
        earn: state.dashboarddata?.data?.data[25].value?state.dashboarddata?.data?.data[25].value:"0",
        color: 'purple',
        iconcolor: 'success',
    },
    {
        id: 4,
        icon: Icon.Users,
        title: 'Total Completed Interviews',
        earn: state.dashboarddata?.data?.data[24].value?state.dashboarddata?.data?.data[24].value:"0",
        color: 'warning',
        iconcolor: 'success'
    },
];
    return (
        <Card>
            <Row>
                {completedInterviews.map((item) => (
                    <Col lg="3" md="6" className="border-end" key={item.id}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div>
                                    <item.icon className={`text-${item.iconcolor}`} />
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

export default CompletedInterviews;
