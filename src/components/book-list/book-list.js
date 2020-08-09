import React from 'react';
import BookListItem from '../book-list-item';

import './book-list.css';

export default class BookList extends React.Component {

  render() {
    const { books } = this.props;
    return (
      <ul>
        {
          books.map((book) => {
            return <li key={book.id}><BookListItem book={book} /></li>
          })
        }
      </ul>
    )
  }
}