import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {addBook, clearBook} from '../../actions';

class AddReview extends Component {

    state = {
        formdata : {
            name : '',
            author : '',
            review : '',
            pages : '',
            rating : '',
            price : ''
        }
    }

    handleInput = (event, field) => {
        let newState = {...this.state.formdata}
        newState[field] = event.target.value;
        this.setState({
            formdata : newState
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId : this.props.user.login.id
        }))
        console.log({
            ...this.state.formdata,
            ownerId : this.props.user.login.id
        })
    }  

    showBook = (book) => (
        book.post ?
            <div className="conf_link">
                Great!!! New book uploaded. <Link to={`/books/${book.bookId}`}>View book</Link>
            </div>
        :null
    )

    componentWillUnmount() {
        this.props.dispatch(clearBook())
    }

    render() {
        return (
            <div className="rl_container article">
                {
                    this.props.book.newBook ? 
                        this.showBook(this.props.book.newBook)
                    :null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Add a Review</h2>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={this.state.formdata.name}
                            onChange={(e) => this.handleInput(e, 'name')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Author Name"
                            value={this.state.formdata.author}
                            onChange={(e) => this.handleInput(e, 'author')}
                        />
                    </div>
                    <div className="form_element">
                        <textarea
                            value={this.state.formdata.review}
                            placeholder="Write a fantastic review"
                            onChange={(e) => this.handleInput(e, 'review')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter Pages"
                            value={this.state.formdata.pages}
                            onChange={(e) => this.handleInput(e, 'pages')}
                        />
                    </div>
                    <div className="form_element">
                        <select value={this.state.formdata.rating} onChange={(e) => this.handleInput(e, 'rating')}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter Price"
                            value={this.state.formdata.price}
                            onChange={(e) => this.handleInput(e, 'price')}
                        />
                    </div>
                    <button type="submit">Add Review</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        book : state.book
    }
}

export default connect(mapStateToProps)(AddReview);