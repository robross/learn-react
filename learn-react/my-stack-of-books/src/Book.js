import React, { Component } from 'react';
import './Book.css';

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = { showRemoveConfirm: false, showEditForm: false };

    this.titleInput = React.createRef();
    this.authorInput = React.createRef();
    this.isbnInput = React.createRef();
  }

  onConfirmRemove = (event) => {
    event.stopPropagation();
    this.setState({ showRemoveConfirm: true, showEditForm: false });
  }

  onShowForm = (event) => {
    event.stopPropagation();
    this.setState({ showRemoveConfirm: false, showEditForm: true });
  }

  handleListItemClick = (event) => {
    event.stopPropagation();

    if (this.props.isAnyoneEditing) {
      this.props.onEndEditing();
    } else {
      this.props.onSelect(this.props.book.isbn);
    }
  }

  handleStartEditing = (event) => {
    event.stopPropagation();
    this.props.onStartEditing(this.props.book.isbn);
  }

  handleEndEditing = (event) => {
    event.stopPropagation();

    if (this.props.book.isNew) {
      this.props.onRemove(this.props.book.isbn);
    } else {
      this.props.onEndEditing();
    }
  }

  handleUpdateBook = (event) => {
    event.preventDefault();

    const key = this.props.book.isbn;
    const title = this.titleInput.current.value;
    const author = this.authorInput.current.value;
    const isbn = this.isbnInput.current.value;

    this.props.onUpdate({ key, title, author, isbn });
  }

  handleRemoveBook = (event) => {
    event.preventDefault();
    this.props.onRemove(this.props.book.isbn);
  }

  render() {
    if (!this.props.isEditing && (this.state.showRemoveConfirm || this.state.showEditForm)) {
      this.setState({ showRemoveConfirm: false, showEditForm: false });
    }

    const { title, author, isbn, isNew } = this.props.book;
    const onShowRemoveConfirm = (e) => this.onConfirmRemove(e);
    const onShowForm = (e) => this.onShowForm(e);
    const handleItemClick = (e) => this.handleListItemClick(e);
    const handleStartEditing = (e) => this.handleStartEditing(e);
    const handleEndEditing = (e) => this.handleEndEditing(e);
    const handleUpdateBook = e => this.handleUpdateBook(e);
    const handleRemoveBook = (e) => this.handleRemoveBook(e);

    let modeClassName = '';
    if (this.state.showRemoveConfirm) {
      modeClassName = 'action-container-open action-container-expand-2';
    } else if (this.state.showEditForm || isNew) {
      modeClassName = 'action-container-open action-container-expand-3';
    } else if (this.props.isEditing) {
      modeClassName = 'action-container-open';
    }
    const liClassName = `list-group-item action-container ${modeClassName}`;
    const saveButtonText = isNew ? 'Add' : 'Update';

    return (
      <li className={liClassName} key={isbn} onClick={handleItemClick}>
        <span className="action-trigger" onClick={handleStartEditing}>
          <i className="fal fa-ellipsis-h-alt"></i>
        </span>

        <div className="action-container-content">
          <strong>{title}</strong> <small className="text-muted">{author} (ISBN:{isbn})</small>
        </div>

        <div className="action action-3" onClick={onShowForm}>
          <div className="action-icon bg-info text-light">
            <i className="fal fa-2x fa-pencil"></i>
          </div>
          <div className="action-content">
            <form onSubmit={handleUpdateBook}>
              <input type="text" placeholder="Title" defaultValue={title} ref={this.titleInput} />
              <input type="text" placeholder="Author" defaultValue={author} ref={this.authorInput} />
              <input type="text" placeholder="ISBN" required defaultValue={isbn} ref={this.isbnInput} />
              <button className="btn btn-sm btn-outline-success" type="submit">{saveButtonText}</button>
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={handleEndEditing}>Cancel</button>
            </form>
          </div>
        </div>

        <div className="action action-2" onClick={onShowRemoveConfirm}>
          <div className="action-icon bg-danger text-light">
            <i className="fal fa-2x fa-trash"></i>
          </div>
          <div className="action-content">
            Remove <strong>{title}</strong>?
            <button className="btn btn-sm btn-outline-danger" onClick={handleRemoveBook}>Yes</button>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleEndEditing}>No</button>
          </div>
        </div>

        <div className="action action-1" onClick={handleEndEditing}>
          <div className="action-icon bg-secondary text-light">
            <i className="fal fa-2x fa-times"></i>
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
