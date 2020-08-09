import React from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils'
import './book-list.css';

class BookList extends React.Component {

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
    const { books, loading, error } = this.props;
    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <ErrorIndicator />
    }

    return (
      <ul className="book-list">
        {
          books.map((book) => {
            return <li key={book.id}><BookListItem book={book} /></li>
          })
        }
      </ul>
    )
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error }
}

/* const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksError
} */

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: () => {
      console.log('fetching books');
      dispatch(booksRequested());
      bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((error) => dispatch(booksError(error)));

    }
  }
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
