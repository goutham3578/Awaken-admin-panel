import React, { useEffect } from 'react';
import { Card, CardBody, Row, Col, Button, Table, Badge } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { useStores } from '../../store1';
import { Loader } from 'react-feather';
import { useObserver } from 'mobx-react';
const CompletedLeads = () => {
  const { Leads } = useStores();

  useEffect(() => {
    Leads.getLeads('approved');
  }, []);

  const formatDate = (date) => {
    const originalDate = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return useObserver(() => (
    <div style={{ width: '100%' }}>
      <h1 className="text-white text-center fw-semibold" style={{ marginBottom: '2%' }}>
        Completed Leads
      </h1>
      <Row>
        <Col>
          <Card className="shadow m-0 p-0 rounded-3">
            <CardBody>
              {Leads.loading ? (
                <Loader />
              ) : (
                <Table hover responsive>
                  <thead className="bg-white">
                    <tr>
                      <th className="text-center" style={{ color: '#344071', fontWeight: 'bold' }}>
                        S.no
                      </th>
                      <th className="text-center" style={{ color: '#344071', fontWeight: 'bold' }}>
                        Name of the Financial planner
                      </th>
                      <th className="text-center" style={{ color: '#344071', fontWeight: 'bold' }}>
                        Name of the client
                      </th>
                      <th className="text-center" style={{ color: '#344071', fontWeight: 'bold' }}>
                        Created on
                      </th>
                      <th className="text-center" style={{ color: '#344071', fontWeight: 'bold' }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Leads.completedLeads.map((lead, index) => (
                      <tr key={index} className="align-items-center">
                        <td className="text-center text-formtextcolor fs-4">{index + 1}</td>
                        <td className="text-center text-formtextcolor fs-4">
                          {lead?.assignedTo.firstName + ' ' + lead.assignedTo.lastName}
                        </td>
                        <td className="text-center text-formtextcolor fs-4">
                          {lead?.awareness?.personalDetails?.name}
                        </td>
                        <td className="text-center text-formtextcolor fs-4">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td className="text-center d-flex justify-content-center align-items-center">
                          <Button className="text-white bg-success rounded-3">View Report</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  ));
};

export default CompletedLeads;
