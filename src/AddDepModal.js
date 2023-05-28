import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class AddDepModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentId: 1,
        departmentName: event.target.DepartmentName.value,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Department
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentName">
                    <Form.Label>Department Name<span style={{ color: "danger" }}>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      placeholder="Type Department Name here.."
                    />
                  </Form.Group>
                  <br></br>
                  <hr></hr>
                  <Form.Group
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button variant="info" type="submit">
                      Submit
                    </Button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "5px" }}
                      onClick={this.props.onHide}
                    >
                      Close
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
