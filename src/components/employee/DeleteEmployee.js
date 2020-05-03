import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from 'axios'

export class DeleteEmployee extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    deleteUser = () => {
        console.log('User deleted')

        axios({
            method: 'DELETE',
            url: `https://devfrontend.gscmaven.com/wmsweb/webapi/employee/${this.props.employeeId}`,
            headers: {
                userid: localStorage.getItem('userid')
            }
        }).then((employeeDeleted) => {
            this.props.loadEmployeeList(true)
            this.setState({
                modal: !this.state.modal
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    
    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Delete</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Delete Employee</ModalHeader>
                    <ModalBody>
                        Are you sure you want to Delete this employee details?
                        <p><b>Email: </b>{this.props.email}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deleteUser}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default DeleteEmployee
