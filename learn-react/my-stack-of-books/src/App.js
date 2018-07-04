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
    bookToUpdate.isNew = false;

    this.setState({ books: books, bookInEditMode: null });
  }

  onBookRemove(isbn) {
    const books = this.state.books.slice();
    const newBooks = books.filter((b) => b.isbn !== isbn)

    this.setState({ books: newBooks });
  }

  onBookAdd() {
    let books = this.state.books.slice();
    books.unshift({ isbn: '', isNew: true });

    this.setState({ books: books, bookInEditMode: '' });
  }

  render() {
    const onBookAdd = () => this.onBookAdd();
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

    const hasNewBooks = this.state.books.filter((b) => b.isNew).length > 0;
    const addButtonClassName = hasNewBooks ? 'btn btn-lg btn-link disabled' : 'btn btn-lg btn-link';

    return (
      <div className="container">
        <div className="row">
          <div className="col-9 pl-4">
            <h1 className="display-4">My Stack of Books</h1>
          </div>
          <div className="col-3 pt-3 text-right">
            <button className={addButtonClassName} onClick={onBookAdd}>Add Book</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul className="list-group list-group-flush border-top border-bottom">
              {books}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
