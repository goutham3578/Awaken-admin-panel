import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row, Col, Button, Table, Badge } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { useStores } from '../../store1';
import { Loader } from 'react-feather';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

const FinancialLeads = () => {
  const { Leads } = useStores();
  const [values, setValues] = useState([]);
  useEffect(() => {
    Leads.getLeads('new');
  }, []); // Empty dependency array, so this runs only once on mount

  // 2. Update values when Leads.agents is populated
  useEffect(() => {
    if (Leads.agents.length > 0) {
      const agentNames = Leads.agents
        .map((value) => {
          if (value && value.firstName && value.lastName) {
            return value.firstName + ' ' + value.lastName;
          }
          return null;
        })
        .filter(Boolean); // Remove null values

      setValues(agentNames);
      console.log('Updated values:', agentNames);
    }
  }, [Leads.agents]);

  const formatDate = (date) => {
    const originalDate = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const selectElement = document.getElementById('mySelect');

  // values.forEach((value) => {
  //   const option = document.createElement('option');
  //   option.textContent = value; // Set the displayed text
  //   option.value = value; // Set the value for form submission
  //   selectElement.appendChild(option); // Append to select element
  // });

  return useObserver(() => (
    <div style={{ width: '100%' }}>
      <h1 className="text-white text-center fw-semibold" style={{ marginBottom: '2%' }}>
        New leads from Financial Planner
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
                      <th
                        className="text-center"
                        style={{ color: '#344071', fontWeight: 'normal' }}
                      >
                        S.no
                      </th>

                      <th
                        className="text-center"
                        style={{ color: '#344071', fontWeight: 'normal' }}
                      >
                        Name of the client
                      </th>
                      <th
                        className="text-center"
                        style={{ color: '#344071', fontWeight: 'normal' }}
                      >
                        Created on
                      </th>
                      <th
                        className="text-center"
                        style={{ color: '#344071', fontWeight: 'normal' }}
                      >
                        Allocated to
                      </th>
                      <th
                        className="text-center"
                        style={{ color: '#344071', fontWeight: 'normal' }}
                      >
                        View
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Leads.newLeads.map((lead, index) => (
                      <tr key={index} className="align-items-center">
                        <td className="text-center text-formtextcolor fs-4">{index + 1}</td>
                        <td className="text-center text-formtextcolor fs-4">
                          {lead.awareness.personalDetails.name}
                        </td>

                        <td className="text-center text-formtextcolor fs-4">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td className="text-center text-formtextcolor fs-4">
                          <select id="mySelect" style={{ width: '35%', borderRadius: 5 }}>
                            {values.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option> // Add key prop
                            ))}
                          </select>
                        </td>
                        <td className="text-center d-flex justify-content-center align-items-center">
                          <Button
                            className="border border-reaidy-orange text-reaidy-orange"
                            style={{ fontSize: 12 }}
                          >
                            Allocated To
                          </Button>
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

export default FinancialLeads;
