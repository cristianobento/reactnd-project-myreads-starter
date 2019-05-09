import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

export default class Bookshelf extends Component {
  static propTypes = {
    handleBookUpdate: PropTypes.func,
    books: PropTypes.array.isRequired
  };
  
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => {
              if (typeof book.authors === "undefined") {
                book["authors"] = "";
              }
              if (typeof book.imageLinks === "undefined") {
                book["imageLinks"] = "";
              }
              return (
                <li key={book.id}>
                  <Book
                    handleBookUpdate={this.props.handleBookUpdate}
                    book={book}
                    title={book.title}
                    authors={book.authors}
                    url={`url(${book.imageLinks["thumbnail"]})`}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
