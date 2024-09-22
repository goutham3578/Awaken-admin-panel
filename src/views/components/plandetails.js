/*eslint-disable*/ 
import React, { useState } from 'react';
import { Button, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdAddCircleOutline } from "react-icons/md";

const PlanDetailsForm = () => {
  const [columns, setColumns] = useState({
    PlanType: [
      "ZERO to ONE",
      "Basic",
      "Comprehensive",
      "Wealth Management"
    ],
    Frequency: [
      "Quarterly",
      "Half yearly",
      "Yearly"
    ],
    Occupation: [
      "N/A",
      "Service",
      "Self Employed",
      "Business",
      "Home maker",
      "Professional",
      "Retired",
      "Student"
    ],
    Gender: [
      "Male",
      "Female"
    ],
    MaritalStatus: [
      "Single",
      "Married",
      "Divorced"
    ]
  });

  // Handler to add a new field to a specific column
  const handleAddNew = (column) => {
    setColumns(prevState => ({
      ...prevState,
      [column]: [...prevState[column], ''] // Adds an empty input field to the specified column
    }));
  };

  // Handler to update an input field in a specific column
  const handleChange = (column, index, value) => {
    const updatedColumn = [...columns[column]];
    updatedColumn[index] = value;
    setColumns(prevState => ({
      ...prevState,
      [column]: updatedColumn
    }));
  };

  return (
    <div className="border border-primary rounded pt-2 mt-5">
      {/* Header */}
      <Row className="">
        {Object.keys(columns).map((column, index) => (
          <Col key={index} className="text-center font-weight-bold border-right mb-2">
            {column.replace(/([A-Z])/g, ' $1').trim()}
          </Col>
        ))}
      </Row>

      {/* Input Fields for Each Column */}
      <Row className='mx-0'>
        {Object.keys(columns).map((column, colIndex) => (
          <Col key={colIndex} className="border border-primary py-2">
            {columns[column].map((value, rowIndex) => (
              <Input
                key={rowIndex}
                type="text"
                value={value}
                onChange={(e) => handleChange(column, rowIndex, e.target.value)}
                className="mb-2"
              />
            ))}
            <Button
              color="primary"
              className="d-flex align-items-center justify-content-center w-100"
              onClick={() => handleAddNew(column)}
            >
              <MdAddCircleOutline /> Add New
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PlanDetailsForm;
