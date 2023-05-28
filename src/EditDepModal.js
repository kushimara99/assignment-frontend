import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditDepModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Add Department
  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "department", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentId: event.target.DepartmentId.value,
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

    //Edit Department Form
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
              Edit Department
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentId">
                    <Form.Label>Department ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentId"
                      required
                      disabled
                      defaultValue={this.props.depid}
                      placeholder="Add Department ID here.."
                    />
                  </Form.Group>
                  <Form.Group controlId="DepartmentName">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      defaultValue={this.props.depname}
                      placeholder="Add Department Name here.."
                    />
                  </Form.Group>
                  <br></br>
                  <hr></hr>
                  <Form.Group
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button variant="info" type="submit">
                      Update
                    </Button>
                    <Button variant="danger"  style={{ marginLeft: "5px" }} onClick={this.props.onHide}>
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
