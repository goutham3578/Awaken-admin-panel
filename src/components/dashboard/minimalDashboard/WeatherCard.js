import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { fetchDashboard } from '../../../store/api/dashboard';

const WeatherCard = () => {
  const dispatch = useDispatch();
  const state = useSelector((stat) => stat);
  useEffect(() => {
    dispatch(fetchDashboard());
    if (state.dashboarddata) {
      if (state.dashboarddata.data) {
        console.log('data', state.dashboarddata?.data?.data[0].value);
      }
    }
  }, []);
  return (
    <Card className="bg-cyan">
      <CardBody>
        <Row>
          <Col xs="12" className="text-white text-start" style={{ fontSize: '25px' }}>
            <span className="">Number Of <br />Students</span>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="text-black text-end">
            <div className="display-2" style={{ fontWeight: 'revert' }}>
            {state.dashboarddata?.data?.data[8].value?state.dashboarddata?.data?.data[8].value:"0"}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default WeatherCard;
