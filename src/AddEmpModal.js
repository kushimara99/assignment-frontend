import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class AddEmpModal extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [] };
      // Bind the Submit method
    this.handleSubmit = this.handleSubmit.bind(this);
    // Bind the calculateAge method
    this.calculateAge = this.calculateAge.bind(this); 
  }

      //get all departments
  componentDidMount() {
    fetch(process.env.REACT_APP_API + "department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data });
      });
  }

  //Submit Form Method
  handleSubmit(event) { 
    console.log(event);
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: 1,
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        dob: event.target.dob.value,
        age: event.target.age.value,
        salary: event.target.salary.value,
        department: event.target.department.value,
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


  //Age auto calculation after picking up a date
  calculateAge(event) {
    const dob = new Date(event.target.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    event.target.form.age.value = age; // Update the age input field value
  }

  //Submit Add Form
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12}>
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col sm={6}>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" required />
                      </Form.Group>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          required
                          placeholder="ex:jordan@gmail.com"
                        />
                      </Form.Group>
                      <Form.Group controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" name="age" required />
                      </Form.Group>
                      <Form.Group controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select">
                          {this.state.deps.map((dep) => (
                            <option key={dep.departmentId}>
                              {dep.departmentName}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" required />
                      </Form.Group>
                      <Form.Group controlId="dob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="dob"
                          required
                          onChange={this.calculateAge}
                        />
                      </Form.Group>

                      <Form.Group controlId="salary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="number" name="salary" required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr></hr>
                  <br></br>
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
