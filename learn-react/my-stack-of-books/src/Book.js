import React, { Component } from 'react';

class Book extends Component {
  constructor(props){
    super(props);
    
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

  render() {
    const { title, author, isbn } = this.props.book;
    
    if (this.props.isEditing){
      const onEditModeExit = () => this.props.onEditModeExit({isbn});
      const updateBook = e => this.handleSubmit(e);

      return (
        <li className="list-group-item" key={isbn}>
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
                <span onClick={onEditModeExit}><i className="text-secondary fal fa-2x fa-times-circle"></i></span>&nbsp;
                <button type="submit"><i className="text-success fal fa-2x fa-check-circle"></i></button>
              </div>
            </div>
          </form>
        </li>
      );
    } 
    else {
      const onEditModeEnter = () => this.props.onEditModeEnter({isbn});

      return (
        <li className="list-group-item" key={isbn}>
          <span className="float-right text-muted pl-4" onClick={onEditModeEnter}>
            <i class="fal fa-ellipsis-h-alt"></i>
          </span>
          <strong>{title}</strong> <small className="text-muted">{author} (ISBN:{isbn})</small>
        </li>
      );
    }
  }
}

export default Book;
