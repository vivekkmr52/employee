import React, { Component } from 'react'
import { Form, FormGroup, Input, FormFeedback, Container, Button } from 'reactstrap'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            roleSelected: '',
            role: ''
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

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleEmployeeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleEmployeePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleRole = (event) => {
        this.setState({
            roleSelected: event.target.value
        })
    }

    submitSignUp = (e) => {
        e.preventDefault();

        axios({
            method: 'POST',
            url: `https://devfrontend.gscmaven.com/wmsweb/webapi/user/signup`,
            data: {
                "idtableUserId": 1,
                "userName": this.state.name,
                "userPass": this.state.password,
                "userRole": this.state.roleSelected,
                "userEmail": this.state.email
            }
        }).then(() => {
            const { history } = this.props;
            history.push("/")
        }).catch((error) => {
            console.log(error);
        })
    }


    render() {
        return (
            <Container>
                <Form id='signup-form' onSubmit={this.submitSignUp}>
                    <FormGroup>
                        Name:
                        <Input type="text" required={true} name="name" className='login-input' value={this.state.name} onChange={this.handleName} placeholder="Name" />
                        <FormFeedback>Please Enter Name </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        Email:
                        <Input type="email" required={true} name="email" className='login-input' value={this.state.email} onChange={this.handleEmployeeEmail} placeholder="example@exam.ex" />
                    </FormGroup>
                    <FormGroup>
                        Password:
                        <Input type="password" required={true} pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,}$' name="password" className='login-input' value={this.state.password} onChange={this.handleEmployeePassword} placeholder='********' />
                    </FormGroup>
                    <FormGroup>
                        Role:
                        <Input type="select" required={true} name="role" className='login-input' value={this.state.roleSelected} onChange={this.handleRole} placeholder="Role">
                            {this.state.role.data !== undefined &&
                                this.state.role.data.map((role, i) => <option key={i}>{role.role}</option>)
                            }
                        </Input>
                    </FormGroup>
                </Form>
                <Button type='submit' form='signup-form'>Sign Up</Button>
            </Container>
        )
    }
}

SignUp = withRouter(SignUp)
export default SignUp
