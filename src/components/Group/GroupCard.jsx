import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';

const GroupCard = (props) => {
  const userData = localStorage.getItem('user');
  const host = JSON.parse(userData).clusterId.host;

  const handleCopyClick = (id) => {
    return () => {
      // Create a textarea element to temporarily hold the text
      const textarea = document.createElement('textarea');
      textarea.value = host + '/login?group=' + id;

      // Append the textarea to the document
      document.body.appendChild(textarea);

      // Select the text in the textarea and copy it to the clipboard
      textarea.select();
      document.execCommand('copy');

      // Remove the textarea from the document
      document.body.removeChild(textarea);
      alert('Id copied !!!');
    };
  };

  return (
    <Card style={{ width: '100%', height: '250px' }} className="bg-cyan m-1">
      <CardBody>
        <Row>
          <Col xs="12" className="text-white text-start d-flex flex-column">
            <h3 className=""> {props.name}</h3>
            <p className=""> {props.desc}</p>
            <h4 className="mt-2">{props.len}</h4>
            <p>students</p>
            <span className="border bg-white text-dark flex d-flex align-items-center justify-content-between  p-2">
              <small>
                {host}/login?group= <br></br> {props.id}
              </small>
              <span onClick={handleCopyClick(props.id)}>
                <i className="bi bi-clipboard"></i>
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="text-black text-end"></Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default GroupCard;
