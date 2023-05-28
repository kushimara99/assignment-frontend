import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalShow: false };
  }

//fetch data from an API
  componentDidMount() {
    fetch(process.env.REACT_APP_API + "employee")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ emps: data });
      });
  }

  //Call fetch method after an update
  componentDidUpdate() {
    this.componentDidMount();
  }

  //Remove an Employee
  deleteEmp(empid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "employee/" + empid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  //Summary of Employees
  render() {
    const {
      emps,
      empid,
      empfirstname,
      emplastname,
      empemail,
      empdob,
      empage,
      empsalary,
      empdep,
    } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <ButtonToolbar>
          <Button
            variant="primary"
            style={{ marginTop: "10px" }}
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Employee
          </Button>

          <AddEmpModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          ></AddEmpModal>
        </ButtonToolbar>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((emp) => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.dob}</td>
                <td>{emp.age}</td>
                <td>{emp.salary}</td>
                <td>{emp.department}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="warning"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          empid: emp.employeeId,
                          empfirstname: emp.firstName,
                          emplastname: emp.lastName,
                          empemail: emp.email,
                          empdob: emp.dob,
                          empage: emp.age,
                          empsalary: emp.salary,
                          empdep: emp.department,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="danger"
                      onClick={() => this.deleteEmp(emp.employeeId)}
                    >
                      Delete
                    </Button>
                    <EditEmpModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      empid={empid}
                      empfirstname={empfirstname}
                      emplastname={emplastname}
                      empemail={empemail}
                      empdob={empdob}
                      empage={empage}
                      empsalary={empsalary}
                      empdep={empdep}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
