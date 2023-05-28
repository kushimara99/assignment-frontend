import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddDepModal } from "./AddDepModal";
import { EditDepModal } from "./EditDepModal";

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow: false, editModalShow: false };
  }
//fetch data from an API
  componentDidMount() {
    fetch(process.env.REACT_APP_API + "department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data });
      });
  }
  //Call fetch method after an update
  componentDidUpdate() {
    this.componentDidMount();
  }

  //Remove an Department
  deleteDep(depid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "department/" + depid, {
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
    const { deps, depid, depname } = this.state;
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
            Add Department
          </Button>

          <AddDepModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          ></AddDepModal>
        </ButtonToolbar>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((dep) => (
              <tr key={dep.departmentId}>
                <td>{dep.departmentId}</td>
                <td>{dep.departmentName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="warning"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          depid: dep.departmentId,
                          depname: dep.departmentName,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="danger"
                      onClick={() => this.deleteDep(dep.departmentId)}
                    >
                      Delete
                    </Button>
                    <EditDepModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      depid={depid}
                      depname={depname}
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
