import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getBookWithReviewer, clearBookView} from '../../actions/';

class BookView extends Component {

    componentWillMount() {
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
    }

    componentWillUnmount() {
        this.props.dispatch(clearBookView());
    }

    renderBookView = (bookInfo) => {
        return bookInfo.book ?
            <div className="br_container">
                <div className="br_header">
                    <h2>{bookInfo.book.name}</h2>
                    <h5>{bookInfo.book.author}</h5>
                    <div className="br_reviewer">
                        <span>Reviewed By</span> {bookInfo.reviewer.firstname} {bookInfo.reviewer.lastname}
                    </div>
                    <div className="br_review">
                        {bookInfo.book.review}
                    </div>
                    <div className="br_box">
                        <div className="left">  
                            <div>
                                <span>Pages:</span> {bookInfo.book.pages}
                            </div>
                            <div>
                                <span>Price:</span> ${bookInfo.book.price}
                            </div>
                        </div>
                        <div className="right">
                            <span>Rating</span>
                            <div>{bookInfo.book.rating}/5</div>
                        </div>
                    </div>
                </div>
            </div>
        :null
    }

    render() {
        let bookInfo = this.props.books;
        console.log(bookInfo)
        return (
            <div>
                {this.renderBookView(bookInfo)}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        books : state.book
    }
}

export default connect(mapStateToProps)(BookView);