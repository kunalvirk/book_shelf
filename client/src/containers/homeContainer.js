import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../actions';
import BookItem from '../widgets/bookItem';

class HomeContainer extends Component {
    
    componentWillMount() {
        this.props.dispatch(getBooks(3,0,"desc"))
    }

    renderItems = (books) => (
        books.list ? 
            books.list.map(book => (
                <BookItem {...book} key={book._id} />
            ))
            :null
    )
    

    loadMore = () => {
        let count = this.props.book.list.length;
        this.props.dispatch(getBooks(3,count,'desc', this.props.book.list))
    }

    render() {
        return (
            <div>   
                {this.renderItems(this.props.book)}   
                <div className="loadmore" onClick={this.loadMore}>
                    Load More
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {book : state.book}
}

export default connect(mapStateToProps)(HomeContainer);