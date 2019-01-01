import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllUsers, registerUser} from '../actions';

class Register extends Component {

    state = {
        firstname : '',
        lastname:'',
        email:'',
        password:'',
        error:''
    }

    componentWillMount() {
        this.props.dispatch(getAllUsers())
    }

    handleInputName = event => {
        this.setState({
            firstname : event.target.value
        })
    }

    handleInputLastName = event => {
        this.setState({
            lastname : event.target.value
        })
    }

    handleInputEmail = event => {
        this.setState({
            email : event.target.value
        })
    }

    handleInputPassword = event => {
        this.setState({
            password : event.target.value
        })
    }

    submitForm = e => {
        e.preventDefault();
        console.log(this.state)
        this.props.dispatch(registerUser(
            {
                firstname : this.state.firstname,
                lastname:this.state.lastname,
                email:this.state.email,
                password:this.state.password,
            },
            this.props.user.users
        ))
    }

    showUsers = collection => (
        collection.users ?
            collection.users.map(user => (
                <tr key={user._id}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                </tr>
            ))
        :null
    )
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.success) {
            this.setState({
                firstname : '',
                lastname:'',
                email:'',
                password:'',
            })
        }
    }

    render() {
        let userCollection = this.props.user;
        return (
            <div className="rl_container">
                <h2>Register</h2> 
                <form onSubmit={this.submitForm}>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter First Name"
                            value={this.state.firstname}
                            onChange={e => this.handleInputName(e)}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Last Name"
                            value={this.state.lastname}
                            onChange={e => this.handleInputLastName(e)}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={e => this.handleInputEmail(e)}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={e => this.handleInputPassword(e)}
                        />
                    </div>
                    <button type="submit">Add User</button>
                </form>

                <table className="current_users">
                    <thead>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUsers(userCollection)}
                    </tbody>
                </table>

            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("Register ", state)
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(Register);