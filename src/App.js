import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import axios from 'axios';

import Login from './components/login/Login';
import Employee from './components/employee/Employee';
import SignUp from './components/signup/SignUp';

class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginError: false
        }
    }
    
    componentDidMount() {
        const clientId = 175
        axios.defaults.headers.common['clientId'] = clientId;
    }
    
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" error={this.state.loginError}>
                            <Login />
                        </Route>
                        <Route path="/home">
                            <Employee />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
