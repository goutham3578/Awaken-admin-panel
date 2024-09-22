import { Col, Card, CardBody, Row } from 'reactstrap';
import Chart from 'react-apexcharts';
import interview from '../../../assets/images/bg/interview.png'


const InterviewCard = () => {
  
  const optionsvisit = {
    chart: {
      id: 'donut-chart',
      fontFamily: '"Nunito", sans-serif',
      height: 100,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    colors: ['#01c0c8', '#7d5ab6'],
    tooltip: {
      fillSeriesColor: false,
    },
    responsive: [
      {
        breakpoint: 1500,
        options: {
          height: 60
        }
      },
    ]
  };
  const seriesvisit = [71.50, 28.50];

  return (
    <Card className="bg-primary text-white ">
      <CardBody className="d-flex align-items-start flex-column">
        <Row>
          <Col>
            <div className='mb-4' style={{width:'120px'}}>
              <p className="fs-3 mb-5">Interview Details</p>
            </div>
            <div style={{width:'120px'}}>
              <h4>Available Interviews - 700</h4>
              {/* <h4>Used - 500</h4> */}
            </div>
          </Col>
          <Col className='text-end'>
            {/* <Chart options={optionsvisit} series={seriesvisit} type="pie" /> */}
            <img src={interview} className='w-5' style={{ width: '88px', height: '100px' }} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default InterviewCard;
