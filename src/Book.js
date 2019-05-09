import React, { Component } from "react";
import BookshelfChanger from "./BookshelfChanger";
import PropTypes from "prop-types";

export default class Book extends Component {
  static propTypes = {
    handleBookUpdate: PropTypes.func,
    book: PropTypes.object
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: this.props.url }}
          />

          <div className="book-shelf-changer">
            <BookshelfChanger
              handleBookUpdate={this.props.handleBookUpdate}
              book={this.props.book}
            />
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    );
  }
}
