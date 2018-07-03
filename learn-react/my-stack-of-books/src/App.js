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

  onBookEdited({key, title, author, isbn}){
    const books = this.state.books.slice();
    const bookToUpdate = books.filter((b) => b.isbn === key)[0]

    bookToUpdate.title = title;
    bookToUpdate.author = author;
    bookToUpdate.isbn = isbn;

    this.setState({ books: books });
  }

  onBookEditModeEnter(isbn) {
    this.setState({bookInEditMode: isbn});
  }

  onBookEditModeExit() {
    this.setState({bookInEditMode: null});
  }

  render() {
    const books = this.state.books.map(book => 
      <Book book={book} 
        key={book.isbn} 
        onBookEdited={this.onBookEdited.bind(this)} 
        onEditModeEnter={this.onBookEditModeEnter.bind(this)} 
        onEditModeExit={this.onBookEditModeExit.bind(this)}
        isEditing = {this.state.bookInEditMode === book.isbn}
        isAnyoneEditing = {this.state.bookInEditMode}
        />);  

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className='display-3'>My Stack of Books</h1>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col'>
            <ul className='list-group list-group-flush border-top border-bottom'>
                {books}      
            </ul>
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
