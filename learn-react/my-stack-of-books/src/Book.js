import React, { Component } from 'react';

class Book extends Component {
  constructor(props){
    super(props);
    
    this.state = { isEditing: false };
    
    this.titleInput = React.createRef();
    this.authorInput = React.createRef();
    this.isbnInput = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const key = this.props.book.isbn;
    const title = this.titleInput.current.value;
    const author = this.authorInput.current.value;
    const isbn = this.isbnInput.current.value;

    this.props.onBookEdited({ key, title, author, isbn });
    this.setState({ isEditing: false });
  }

  handleToggleEditMode = (event) => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  }

  render() {
    const { title, author, isbn } = this.props.book;
    const updateBook = e => this.handleSubmit(e);
    const enterEditMode = e => this.handleToggleEditMode(e);
    
    if (this.state.isEditing){
      return (
        <tr key={isbn}>
          <td colSpan="3">
          <form onSubmit={updateBook}>
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" placeholder="Title" defaultValue={title} ref={this.titleInput}/>
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Author" defaultValue={author} ref={this.authorInput}/>
              </div>
              <div className="col">
                <input type="text" className="form-control text-right" placeholder="ISBN" defaultValue={isbn} ref={this.isbnInput}/>
              </div>
              <div className="col-2 align-middle text-right">
                <span onClick={() => this.setState({isEditing: false})}><i className="text-secondary fal fa-2x fa-times-circle"></i></span>&nbsp;
                <button type="submit"><i className="text-success fal fa-2x fa-check-circle"></i></button>
              </div>
            </div>
          </form>
          </td>
        </tr>
      );
    } 
    else {
      return (
        <tr key={isbn} onClick={enterEditMode}>
          <td>{title}</td>
          <td>{author}</td>
          <td className="text-right">{isbn}</td>
        </tr>
      );
    }
  }
}

export default Book;
