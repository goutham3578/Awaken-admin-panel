import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
import * as Icon from 'react-feather';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../../store/api/dashboard';

// const incompletedInterviews = [
//     {
//         id: 1,
//         icon: Icon.Clock,
//         title: 'Today Incompleted Interviews',
//         earn: '23',
//         color: 'primary',
//         iconcolor: 'danger',
//     },
//     {
//         id: 2,
//         icon: Icon.Edit,
//         title: 'Week Incompleted Interviews',
//         earn: '56',
//         color: 'cyan',
//         iconcolor: 'danger',
//     },
//     {
//         id: 3,
//         icon: Icon.Calendar,
//         title: 'Month Incompleted Interviews',
//         earn: '95',
//         color: 'purple',
//         iconcolor: 'danger',
//     },
//     {
//         id: 4,
//         icon: Icon.Users,
//         title: 'Total Incompleted Interviews',
//         earn: '86',
//         color: 'warning',
//         iconcolor: 'danger',
//     },
// ];

const IncompletedInterviews = () => {
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

  const incompletedInterviews = [
    {
        id: 1,
        icon: Icon.Clock,
        title: 'Today Incompleted Interviews',
        earn: state.dashboarddata?.data?.data[31].value?state.dashboarddata?.data?.data[43].value:"0",
        color: 'primary',
        iconcolor: 'danger',
    },
    {
        id: 2,
        icon: Icon.Edit,
        title: 'Week Incompleted Interviews',
        earn: state.dashboarddata?.data?.data[30].value?state.dashboarddata?.data?.data[42].value:"0",
        color: 'cyan',
        iconcolor: 'danger',
    },
    {
        id: 3,
        icon: Icon.Calendar,
        title: 'Month Incompleted Interviews',
        earn: state.dashboarddata?.data?.data[29].value?state.dashboarddata?.data?.data[41].value:"0",
        color: 'purple',
        iconcolor: 'danger',
    },
    {
        id: 4,
        icon: Icon.Users,
        title: 'Total Incompleted Interviews',
        earn: state.dashboarddata?.data?.data[28].value?state.dashboarddata?.data?.data[40].value:"0",
        color: 'warning',
        iconcolor: 'danger',
    },
];
    return (
        <Card>
            <Row>
                {incompletedInterviews.map((item) => (
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

export default IncompletedInterviews;
