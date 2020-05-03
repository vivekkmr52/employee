import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class ViewEmployee extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            modal: false,
            employeeDetails: ''
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

        axios({
            method: 'GET',
            url: `https://devfrontend.gscmaven.com/wmsweb/webapi/employee/${this.props.employeeId}`,
            headers: {
                userid: localStorage.getItem('userid')
            }
        }).then((employeeDetails) => {
            this.setState({
                employeeDetails: employeeDetails.data
            })
        }).catch((error) => {
            console.log(error);
        })

    }
    
    render() {
        const { employeeDetails } = this.state;
        return (
            <div>
                <Button color="info" onClick={this.toggle}>View</Button> <br />
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Employee Details</ModalHeader>
                    <ModalBody>
                        <b>Name</b>: {employeeDetails.name} <br />
                        <b>Employee Code</b>: {employeeDetails.idtableEmployeeId} <br />
                        <b>Email</b>: {employeeDetails.tableEmployeeEmailAddress} <br />
                        <b>D.O.B</b>: {employeeDetails.tableEmployeeDOB} <br />
                        <b>D.O.J</b>: {employeeDetails.tableEmployeeDOJ} <br />
                        <b>Salary</b>: {employeeDetails.tableEmployeeSalary} <br />
                        <b>Role</b>: {employeeDetails.tableEmployeeRole} <br />
                        <b>Gender</b>: {employeeDetails.tableEmployeeGender} <br />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ViewEmployee
