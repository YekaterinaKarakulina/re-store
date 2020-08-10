import React from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils'
import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {
        books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book.id)} />
            </li>
          )
        })
      }
    </ul>
  )
}

class BookListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchBooks();
    /* const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError } = this.props;

    booksRequested();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data))
      .catch((error) => booksError(error)); */
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;
    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <ErrorIndicator />
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />
  }
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
  return { books, loading, error }
}

/* const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksError
} */

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  }
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
