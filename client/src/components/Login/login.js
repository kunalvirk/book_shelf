import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/';

class Login extends Component {

    state = {
        email : '',
        password : '',
        error : '',
        success : false
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    handleEmailChange = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.login.isAuth) {
            this.props.history.push('/user');
        }
    }

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Login Here</h2>
                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            onChange={this.handleEmailChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                        />
                    </div>
                    <button type="submit">Log In</button>
                    <div className="error">
                        {
                            user.login ? <div>{user.login.message}</div> : null
                        }
                    </div>
                </form>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(Login);