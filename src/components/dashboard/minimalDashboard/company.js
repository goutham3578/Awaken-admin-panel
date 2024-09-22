import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
import * as Icon from 'react-feather';


const company = [
  {
    id: 1,
    icon: Icon.Clock,
    title: 'Today Companies',
    earn: '23',
    color: 'primary',
  },
  {
    id: 2,
    icon: Icon.Edit,
    title: 'Week Companies',
    earn: '56',
    color: 'cyan',
  },
  {
    id: 3,
    icon: Icon.Calendar,
    title: 'Month Companies',
    earn: '95',
    color: 'purple',
  },
  {
    id: 4,
    icon: Icon.Users,
    title: 'Total Companies',
    earn: '86',
    color: 'warning',
  },
];

const Company = () => {
  return (
    <Card>
      <Row>
        {company.map((item) => (
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

export default Company;
