import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getSingleBook, updateSingleBook, deleteBook, clearBook} from '../../actions';

class EditReview extends Component {

    state = {
        formdata : {
            _id : this.props.match.params.bookId,
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
        console.log("On Submit ",this.state.formdata)        
        this.props.dispatch(updateSingleBook(this.props.book.singleBook._id, this.state.formdata))
    }  

    deleteBook = () => {
        this.props.dispatch(deleteBook(this.props.match.params.bookId));
    }

    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/user/reviews');
        },1500)
    }

    componentWillMount() {
        this.props.dispatch(getSingleBook(this.props.match.params.bookId))
    }

    componentWillReceiveProps(nextProps) {
        console.log("Next Props", nextProps);
        let book = nextProps.book.singleBook;

        this.setState({
            formdata : {
                name : book.name,
                author : book.author,
                review : book.review,
                pages : book.pages,
                rating : book.rating,
                price : book.price
            }
        })
    }

    componentWillUnmount() {
        this.props.dispatch(clearBook())
    }

    render() {
        let book = this.props.book;
        return (
            <div className="rl_container article">
                {
                    book.updateBook ?
                        <div className="edit_confirm">
                            Book Updated, <Link to={`/books/${book.singleBook._id}`}>Click here to see the updated book</Link>
                        </div>
                    :null
                }
                {
                    book.bookDeleted ?
                        <div className="red_tag">
                            Book Deleted!!!
                            {this.redirectUser()}
                        </div>
                    :null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit Review</h2>
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
                    <button type="submit">Edit Review</button>
                    <div className="delete_post">
                        <div className="button" onClick={this.deleteBook}>
                            Delete Review
                        </div>
                    </div>
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

export default connect(mapStateToProps)(EditReview);