import { Col, Card, CardBody, Row } from 'reactstrap';
import Chart from 'react-apexcharts';



const ReviewCard = () => {
  const data = localStorage.getItem('user');
  const user = JSON.parse(data)



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
            <div className='mb-3'>
              <p className="fs-3 mb-4">Credits</p>
            </div>
            <div>
              <h5 ><span></span><p style={{ width: '150px', fontSize: '28px' }}>₹{user?.credits?.coins}</p></h5>

              {/* <h5 ><span>Credit Id -</span> <br />  <p style={{ width: '150px', fontSize: '10px' }}>{user?.credits?._id}</p></h5> */}
              <h5 ><p style={{ width: '150px', fontSize: '16px', fontWeight: 'bold' }}>({user?.credits?.coins / 100}<span> Interviews</span>)</p></h5>

              {/* <h4>Used - 500</h4> */}
            </div>
          </Col>
          <Col className='text-end'>
            <Chart options={optionsvisit} series={seriesvisit} type="pie" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
