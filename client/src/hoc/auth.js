import React, {Component} from 'react';
import { auth } from '../actions/';
import { connect } from 'react-redux';

export default function(ComposedClass, reload) {
    class Authentication extends Component {

        state = {
            loading : true
        }

        componentWillMount() {
            this.props.dispatch(auth())
        }

        componentWillReceiveProps(nextProps) {
            this.setState({
                loading: false
            })

            if (!nextProps.user.login.isAuth) {  //if user is not authenticated
                if (reload) {
                    this.props.history.push('/user/login');
                }
            } else {  //if user is authorized
                if (reload === false) {
                    this.props.history.push('/user')
                }
            }

        }

        render() {
            if (this.state.loading) {
                return <div className="loader">loading</div>
            }
            return (
                <ComposedClass {...this.props} />
            )
        }
    }

    function mapStateToProps(state) {
        console.log(state)
        return {
            user : state.user
        }
    }

    return connect(mapStateToProps)(Authentication)
}