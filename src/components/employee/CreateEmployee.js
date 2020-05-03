import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form } from 'reactstrap';
import axios from 'axios';

class CreateEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            name: '',
            empCode: '',
            email: '',
            DOB: '',
            DOJ: '',
            salary: '',
            role: '',
            gender: '',
            roleSelected: ''
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `https://devfrontend.gscmaven.com/wmsweb/webapi/user/role`,
        }).then((role) => {
            this.setState({
                role,
                roleSelected: role.data[0].role
            })
        }).catch((error) => {
            console.log(error);
        })
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleEmployeeCode = (event) => {
        this.setState({
            empCode: event.target.value
        })
    }

    handleEmployeeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleDOB = (event) => {
        this.setState({
            DOB: event.target.value
        })
    }

    handleDOJ = (event) => {
        this.setState({
            DOJ: event.target.value
        })
    }

    handleSalary = (event) => {
        this.setState({
            salary: event.target.value
        });
    }

    handleRole = (event) => {
        this.setState({
            roleSelected: event.target.value
        })
    }

    handleGender = (event) => {
        this.setState({
            gender: event.target.value
        })
    }

    createEmployee = (event) => {
        event.preventDefault();

        axios({
            method: 'POST',
            url: `https://devfrontend.gscmaven.com/wmsweb/webapi/employee/`,
            headers: {
                userid: localStorage.getItem('userid')
            },
            data: {
                "name": this.state.name,
                "tableEmployeeEmailAddress": this.state.email,
                "tableEmployeeDOB": this.state.DOB,
                "tableEmployeeDOJ": this.state.DOJ,
                "tableEmployeeSalary": this.state.salary,
                "tableEmployeeGender": this.state.gender,
                "tableEmployeeRole": this.state.roleSelected
            }
        }).then((role) => {
            this.setState({
                modal: !this.state.modal
            })
            this.props.loadEmployeeList(true)

        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className='create-employee'>
                <Button color="primary" onClick={this.toggle}>Create Employee</Button>{' '}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create Employee</ModalHeader>
                    <ModalBody>
                        <Form id='login-form' onSubmit={this.createEmployee}>
                            <FormGroup>
                                Name:
                                <Input type="text" required={true} name="name" className='input-form' pattern="^[A-Za-z]+$" value={this.state.name} onChange={this.handleName} placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                Employee Code:
                                <Input type="text" required={true} name="empCode" className='input-form' pattern="[A-Za-z0-9]+" value={this.state.empCode} onChange={this.handleEmployeeCode} placeholder="Employee Code" />
                            </FormGroup>
                            <FormGroup>
                                Email:
                                <Input type="email" required={true} name="email" className='input-form' value={this.state.email} onChange={this.handleEmployeeEmail} placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                D.O.B:
                                <Input type="Date" required={true} name="DOB" className='input-form' value={this.state.DOB} onChange={this.handleDOB} />
                            </FormGroup>
                            <FormGroup>
                                D.O.J:
                                <Input type="date" required='true' name="DOJ" className='input-form' value={this.state.DOJ} onChange={this.handleDOJ} />
                            </FormGroup>
                            <FormGroup>
                                Salary:
                                <Input type="text" required={true} name="salary" className='input-form' pattern='^[1-9]*\.?[0-9]{0,3}' value={this.state.salary} onChange={this.handleSalary} placeholder="Salary" />
                            </FormGroup>
                            <FormGroup>
                                Role:
                                <Input type="select" required={true} name="role" className='input-form' value={this.state.roleSelected} onChange={this.handleRole} placeholder="Role">
                                    {this.state.role.data !== undefined &&
                                        this.state.role.data.map((role, i) => <option key={i}>{role.role}</option>)
                                    }
                                </Input>
                            </FormGroup>
                            Gender:
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" required={true} name="gender" value='male' checked={this.state.gender === "male"} onChange={this.handleGender} />{' '}
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="gender" value='female' checked={this.state.gender === "female"} onChange={this.handleGender} />{' '}
                                    Female
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' form='login-form'>Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreateEmployee
