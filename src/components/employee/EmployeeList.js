import React, { Component } from 'react'

import ViewEmployee from './ViewEmployee'
import UpdateEmployee from './UpdateEmployee';
import { DeleteEmployee } from './DeleteEmployee';

class EmployeeList extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    editEmployee = (id) => e => {
        console.log('Edit was clicked', id);
    }

    deleteEmployee = (id) => e => {
        console.log('Delete was clicked', id);
    }

    renderTableData = () => {
        if (this.props.employeeList.data !== undefined) {
            return this.props.employeeList.data.map((employee, index) => {
                const { idtableEmployeeId, name, tableEmployeeDOB, tableEmployeeDOJ, tableEmployeeEmailAddress, tableEmployeeGender, tableEmployeeRole, tableEmployeeSalary } = employee //destructuring

                let Date = (date) => {
                    let ForamattedDate = date.split('-');
                    return ForamattedDate[2] + '/' + ForamattedDate[1] + '/' + ForamattedDate[0];
                }

                return (
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{idtableEmployeeId}</td>
                        <td>{tableEmployeeEmailAddress}</td>
                        <td>{Date(tableEmployeeDOB)}</td>
                        <td>{Date(tableEmployeeDOJ)}</td>
                        <td>{tableEmployeeSalary}</td>
                        <td>{tableEmployeeRole}</td>
                        <td>{tableEmployeeGender}</td>
                        <td>
                            <ViewEmployee employeeId={idtableEmployeeId} />
                            <UpdateEmployee employeeId={idtableEmployeeId} loadEmployeeList={this.props.loadEmployeeList} />
                            <DeleteEmployee employeeId={idtableEmployeeId} email={tableEmployeeEmailAddress} loadEmployeeList={this.props.loadEmployeeList} />
                        </td>
                    </tr>
                )
            })
        }
    }
    render() {
        return (
            <>
                {this.renderTableData()}
            </>
        )
    }
}

export default EmployeeList
