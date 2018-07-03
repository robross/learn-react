import React, { Component } from 'react';
import './Book.css';

class Book extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      showDeleteMode: false,
      showFormMode: false
    };

    this.titleInput = React.createRef();
    this.authorInput = React.createRef();
    this.isbnInput = React.createRef();
  }

  handleItemClick = (event) => {
    if (this.props.isAnyoneEditing){
      this.props.onEditModeExit();
    } else {
      alert('you clicked me');
    }
  }

  handleEditModeEnter = (event) => {
    event.stopPropagation();
    this.props.onEditModeEnter(this.props.book.isbn);
  }

  handleEditModeExit = (event) => {
    event.stopPropagation();
    this.props.onEditModeExit();
    this.setState({
      showDeleteMode: false,
      onShowFormMode: false
    });
  }

  handleUpdateBook = (event) => {
    const key = this.props.book.isbn;
    const title = this.titleInput.current.value;
    const author = this.authorInput.current.value;
    const isbn = this.isbnInput.current.value;

    this.props.onBookEdited({ key, title, author, isbn });
    this.setState({ isEditing: false });
  }

  onShowDeleteMode = (event) => {
    event.stopPropagation();
    this.setState({ 
      showDeleteMode: true,
      showFormMode: false
    });
  }

  onShowFormMode = (event) => {
    event.stopPropagation();
    this.setState({ 
      showDeleteMode: false,
      showFormMode: true
    });
  }

  render() {
    if (!this.props.isEditing && (this.state.showDeleteMode || this.state.showFormMode)){
      this.setState({ 
        showDeleteMode: false,
        showFormMode: false
      });
    }

    const { title, author, isbn } = this.props.book;
    const handleItemClick = (e) => this.handleItemClick(e);
    const handleEditModeEnter = (e) => this.handleEditModeEnter(e);
    const handleEditModeExit = (e) => this.handleEditModeExit(e);
    const onShowDeleteMode = (e) => this.onShowDeleteMode(e);
    const handleUpdateBook = e => this.handleUpdateBook(e);

    let modeClassName = '';
    if (this.state.showDeleteMode) {
      modeClassName = 'action-show action-expand-2';
    } else if (this.props.isEditing) {
      modeClassName = 'action-show';
    }
    
    const liClassName = `list-group-item action-container ${modeClassName}`;

    return (
      <li className={liClassName} key={isbn} onClick={handleItemClick}>
        <span className="float-right text-muted pl-4" onClick={handleEditModeEnter}>
          <i className="fal fa-ellipsis-h-alt"></i>
        </span>
        <strong>{title}</strong> <small className="text-muted">{author} (ISBN:{isbn})</small>
        <div className="action action-3 bg-info"><i className="fal fa-2x fa-pencil"></i></div>
        <div className="action action-2 bg-danger" onClick={onShowDeleteMode}>
          <div className="action-secondary">
              <button type="button" className="btn btn-light text-danger">Delete</button>
              <button type="button" className="btn btn-light" onClick={handleEditModeExit}>Cancel</button>
          </div>
          <i className="fal fa-2x fa-trash"></i>
        </div>
        <div className="action action-1 bg-secondary" onClick={handleEditModeExit}><i className="fal fa-2x fa-times"></i></div>
      </li>
    );
  }
}

export default Book;
