import React, { Component } from 'react'
import { Form, FormGroup, Input, Container, Button, Row, Col } from 'reactstrap'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmployeeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleEmployeePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `https://devfrontend.gscmaven.com/wmsweb/webapi/user/login?email=${this.state.email}&password=${this.state.password}`,
        }).then((signIn) => {
            console.log(signIn.data)
            localStorage.setItem('userid', signIn.data)
            const { history } = this.props;
            history.push("/home")
        }).catch((error) => {
            console.log(error);
        })
    }

    registerUser = (e) => {
        e.preventDefault()
        const { history } = this.props;
        history.push("/signup")
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form id='login-form' onSubmit={this.submitLogin}>
                            <FormGroup>
                                Email:
                        <Input type="email" required={true} name="email" className='login-input' value={this.state.email} onChange={this.handleEmployeeEmail} placeholder="example@exam.ex" />
                            </FormGroup>
                            <FormGroup>
                                Password:
                        <Input type="password" required={true} name="password" className='login-input' value={this.state.password} onChange={this.handleEmployeePassword} placeholder='********' />
                            </FormGroup>
                        </Form>
                        <Button type='submit' form='login-form'>Login</Button>
                    </Col>
                    <Col>
                        Please Register for a new account
                        <div>
                            <Button onClick={this.registerUser}>Register</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

Login = withRouter(Login)
export default Login
