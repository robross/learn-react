import React, { Component } from 'react';
import Book from './Book';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [
        { title: 'Code Complete', author: 'McConnell', isbn: '12345' },
        { title: 'Refactoring', author: 'Fowler', isbn: '9875' },
      ],
      bookInEditMode: null
    };
  }

  onBookSelect(isbn) {
    const selectedTitle = this.state.books.filter((b) => b.isbn === isbn)[0].title;
    alert(`You selected ${selectedTitle}`);
  }

  onBookStartEditing(isbn) {
    this.setState({ bookInEditMode: isbn });
  }

  onBookEndEditing() {
    this.setState({ bookInEditMode: null });
  }

  onBookUpdate({ key, title, author, isbn }) {
    const books = this.state.books.slice();
    const bookToUpdate = books.filter((b) => b.isbn === key)[0]

    bookToUpdate.title = title;
    bookToUpdate.author = author;
    bookToUpdate.isbn = isbn;

    this.setState({ books: books, bookInEditMode: null });
  }

  onBookRemove(isbn) {
    const books = this.state.books.slice();
    const newBooks = books.filter((b) => b.isbn !== isbn)

    this.setState({ books: newBooks });
  }

  render() {
    const books = this.state.books.map(book =>
      <Book book={book}
        key={book.isbn}
        isAnyoneEditing={this.state.bookInEditMode}
        isEditing={this.state.bookInEditMode === book.isbn}
        onSelect={this.onBookSelect.bind(this)}
        onStartEditing={this.onBookStartEditing.bind(this)}
        onEndEditing={this.onBookEndEditing.bind(this)}
        onUpdate={this.onBookUpdate.bind(this)}
        onRemove={this.onBookRemove.bind(this)}
      />);

    return (
      <div className='container'>
        <h1 className='display-3'>My Stack of Books</h1>
        <ul className='list-group list-group-flush border-top border-bottom'>
          {books}
        </ul>
      </div>
    );
  }
}

export default App;
