import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';

class Employee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeList: []
        }
    }

    componentDidMount() {
        
        axios.interceptors.response.use(
            response => response,
          error => {
            this.setState({
                loginError: true
            })
            const { history } = this.props;
            history.push("/")
            console.log('Error from router')
            localStorage.removeItem('userid')
            // const {status} = error.response;
            // if (status === 400 ) {
            //   store.dispatch('snackBar', snackbarObj)
            // } 
           return Promise.reject(error);
          }
        )

        this.getEmployeeList();
    }

    getEmployeeList = () => {
        axios({
            method: 'GET',
            url: `https://devfrontend.gscmaven.com/wmsweb/webapi/employee/`,
            headers: {
                userid: localStorage.getItem('userid')
            }
        }).then((employeeList) => {
            this.setState({
                employeeList
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    loadEmployeeList = (loadList) => {
        if(loadList) {
            this.getEmployeeList()
        }
    }

    render() {
        return (
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee Code</th>
                            <th>Email</th>
                            <th>D.O.B</th>
                            <th>D.O.J</th>
                            <th>Salary</th>
                            <th>Role</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <EmployeeList employeeList={this.state.employeeList} loadEmployeeList={this.loadEmployeeList} />
                    </tbody>
                </Table>
                <CreateEmployee loadEmployeeList={this.loadEmployeeList} />
            </Container>
        )
    }
}

Employee = withRouter(Employee);
export default Employee
