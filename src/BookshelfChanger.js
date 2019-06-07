import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

export default class BookshelfChanger extends Component {
  static propTypes = {
    handleBookUpdate: PropTypes.func
  };

  state = {
    value: this.props.book.shelf ? this.props.book.shelf : "none"
  };

  updateBook() {
    BooksAPI.update(this.props.book, this.state.value).then(books => {
      if (books.error !== "empty query") {
        if (window.location.pathname === "/") {
          this.props.handleBookUpdate();
        }
      }
    });
  }
  onChange = event => {
    this.setState({ value: event.target.value }, () => {
      if (this.state.value) {
        this.updateBook();
      } else if (!this.state.value) {
      }
    });
  };

  render() {
    console.log(this.props)
    return (
      <select onChange={this.onChange} value={this.state.value} name="category">
        <option disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}
