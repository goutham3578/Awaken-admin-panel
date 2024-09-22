import React, { useState } from 'react';
import { addHeader } from '../../../api/headers';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
   Header,
   Body,
   Footer,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from 'reactstrap';
// import { Loader } from 'react-feather';

  const ComposeEmail = () => {
  const [compose , setCompose ] = useState(true);
  const resetInputValues = () => {
    const radioButtons = document.querySelectorAll('input[type="radio"][name="messageType"]');
    radioButtons.forEach(button => {
      button.checked = false;
    });
    document.getElementById('subject').value=null;
    document.getElementById('msg').value=null;
  }
  const toggle = () => {
      setCompose(!compose);
      resetInputValues();
    };
  const [load,setload]=useState(false);
  const handleSubmit = async() => {
    // Retrieve values from the form
    setload(true);
    try {
      const messageType = document.querySelector('input[name="messageType"]:checked').value;
    } catch (e) {
      window.alert('Please select message type');
      setload(false);
      return
    }
    const messageType = document.querySelector('input[name="messageType"]:checked').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('msg').value;
    const sheetLink = document.getElementById('URL').value;
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
    const port = document.getElementById('Port').value;
    const server = document.getElementById('server').value;
    // console.log(messageType);
    // console.log(sheetLink);
    // console.log(mail);
    // console.log(password);
    // console.log(port);
    // console.log(server);
    if (!messageType || !subject || !body || !sheetLink || !mail || !password || !port ||!server) {
      window.alert('Please fill in all required fields.');
      setload(false);
      return; // Stop further execution
    }
    // Determine content type based on message type
    let contentType;
    if (messageType === 'plainType') {
      contentType = 'plain';
    } else {
      contentType = 'html';
    }
  
    // Construct message content
    const messageContent = `Hello {name},\n\n${body}`;
    // Prepare data to send in the request
    const dataToSend = {
      email: mail,
      password: password,
      subject: subject,
      content_type: contentType,
      message_content: messageContent,
      smtp_server: server,
      smtp_port: port,
      sheet_url: sheetLink
    };
    
      // const URL ='https://emailbbot2.azurewebsites.net/api/emailnew_trigger?code=wLyNTYw9kCfqXvpK5Iq7jM4sopq_HSG1SFZ4ob9DUcmgAzFusDY7bg%3D%3D';
      // const response = await fetch(URL, await addHeader(dataToSend, 'POST'));
      // const data = await response.json();
      // if (response.status == 200){
      //   window.alert("Email sent successfully");
      // }
      
    // Send POST request to the server
//     await fetch('https://emailbbot2.azurewebsites.net/api/emailnew_trigger?code=wLyNTYw9kCfqXvpK5Iq7jM4sopq_HSG1SFZ4ob9DUcmgAzFusDY7bg%3D%3D', {
//       method: 'POST',
//       mode:'no-cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(dataToSend),
//     })
//     .then(response => {
//       // Check if the response is OK
//       console.log(response);
//       if (response.status === 200) {
//         // Successful response
//         setload(false);
//         window.alert("Email sent Successfully");
//         return response;// Return the promise
//             // .then(data => {
//             //     // Handle the JSON data
//             //     console.log('Data sent successfully:', data);
//             //     // Optionally, perform any actions after successful data submission
//             //     return data; // Return the data if needed further down the promise chain
//             // })
//             // .catch(error => {
//             //     // Handle JSON parsing error
//             //     console.error('Error parsing JSON:', error);
//             //     throw new Error('Error parsing JSON');
//             // });
//     } else {
//         throw new Error('Network response was not ok');
//         setload(false);
//     }
    
//   })
//   .then(data => {
//     // Optionally, you can perform any actions after successful data submission
//     console.log('Data sent successfully:', data);
// })
// .catch(error => {
//     // Handle fetch errors
//     console.error('There was a problem with your fetch operation:', error);
//     window.alert("Failed to send mail: " + error.message); // Display alert for failure
//     setload(false);
//   });

  try {
    const response = await fetch('https://emailbbot2.azurewebsites.net/api/emailnew_trigger?code=wLyNTYw9kCfqXvpK5Iq7jM4sopq_HSG1SFZ4ob9DUcmgAzFusDY7bg%3D%3D', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      // Successful response
      setload(false);
      window.alert("Email sent Successfully");
      const data = await response.json(); // Extract JSON from the response
      console.log('Data sent successfully:', data);
     const resetInputValues = () => {
    const radioButtons = document.querySelectorAll('input[type="radio"][name="messageType"]');
    radioButtons.forEach(button => {
      button.checked = false;
    });
  }
  resetInputValues();
      document.getElementById('subject').value=null;
      document.getElementById('msg').value=null;
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    window.alert("Failed to send mail: " + error.message); // Display alert for failure
    setload(false);
    throw error;
  }


    // .then(data => {
    //   // Handle successful response
    //   window.alert("Email sent Successfully");
    //   console.log('Data sent successfully:', data);
    //   // Optionally, you can perform any actions after successful data submission
    // })
    // .catch(error => {
    //   // Handle fetch errors
    //   console.error('There was a problem with your fetch operation:', error);
    //   window.alert("Failed to send mail"); // Display alert for failure
    //   // Handle error appropriately, e.g., show error message to the user
    // });
   
    // Close compose window
    toggle();
  };
  
  return (
    <>
      <div isOpen={compose } size="lg">
        <header className="fs-4" toggle={toggle}><strong>Compose New Message</strong></header>
        <div>
          <Form>
            {load&&<div className="loading">
                      <Spinner color="primary" />
                   </div>
            }
            <div className="form-body">
              <Row>
                <Col md="8" sm="12">
                  <FormGroup>
                    <Label for="URL">Sheet URL</Label>
                    <Input type="text" id="URL" name="URL" defaultValue='https://docs.google.com/spreadsheets/d/18GtCSV2QwXFXHPKlOuAguqs7WfZ3upDo3mCGrgbb2oA/gviz/tq?tqx=out:csv&sheet=Sheet1'/>
                  </FormGroup>
                </Col><br></br>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="mail">E-Mail</Label>
                    <Input type="email" id="mail" name="mail" defaultValue='Sahithi@spotmies.us'/>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" name="password" defaultValue="S@t1$h_S@hithi"/>
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="Port">SMTP-Port</Label>
                    <Input type="number" id="Port" name="Port" defaultValue='587'/>
                    <Label for="server">SMTP-server</Label>
                    <Input type="text" id="server" name="server" defaultValue="http://smtp.zoho.in" />
                  </FormGroup>
                </Col>
                <Col sm="12" md="8">
                    <FormGroup>
                    <Label for="messageType">Message Type</Label><br></br>
                    <div className="btn-group" role="group" aria-label="Message Type">
                        <input type="radio" className="btn-check" value='htmlType' name="messageType" id="htmlType" autoComplete="off" />
                        <label className="btn btn-primary" htmlFor="htmlType">HTML</label>
                        <input type="radio" className="btn-check" value='plainType' name="messageType" id="plainType" autoComplete="off" />
                        <label className="btn btn-primary" htmlFor="plainType">Text</label>
                    </div>
                    </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input type="text" id="subject" name="subject" />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="msg">Email Message</Label>
                    <textarea style={{height:'200px'}} name="msg" id="msg" class="form-control" placeholder="Explain Your Query here"></textarea>
                  </FormGroup>
                </Col>
              </Row>

              {/* <FormGroup>
                <Label>Attachment</Label>
                <Input type="file" className="form-control-file" id="projectinput8" />
              </FormGroup> */}
            </div>
          </Form>
        </div>
        <footer>
          <Button color="primary" onClick={handleSubmit}>
            Send
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </footer>
      </div>
    </>
  );
};

export default ComposeEmail;
