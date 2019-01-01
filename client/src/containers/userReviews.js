import React, { Component } from 'react';
import { connect } from 'react-redux';  
import {getUserReviews} from '../actions';
import moment from 'moment-js';
import {Link} from 'react-router-dom';

class UserReviews extends Component {

    componentWillMount() {
        this.props.dispatch(getUserReviews(this.props.user.login.id))
    }

    showReviews = user => (
        user.reviews ?
            user.reviews.map(review => (
                <tr key={review._id}>
                    <td>
                        <Link to={`/user/editReview/${review._id}`}>{review.name}</Link>
                    </td>
                    <td>{review.author}</td>
                    <td>{
                        moment(review.createdDate).format("DD/MM/YY")
                    }</td>
                </tr>
            ))
        :null
    )

    render() {
        let reviews = this.props.user;    
        return (
            <div className="user_posts">
                <h4>Your Reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showReviews(reviews)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("My Reviews", state)
    return {
        reviews : state.reviews
    }
}

export default connect(mapStateToProps)(UserReviews);