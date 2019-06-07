import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

export default class Bookshelf extends Component {
  static propTypes = {
    handleBookUpdate: PropTypes.func,
    books: PropTypes.array.isRequired
  };

  render() {
    console.log(this.props)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => {
              const thumbnailImage = book.imageLinks
                ? book.imageLinks.thumbnail
                : "http://via.placeholder.com/128x193?text=No%20Cover";

              const bookAuthors = book.authors
                ? book.authors
                : "No author specified";

              return (
                <li key={book.id}>
                  <Book
                    handleBookUpdate={this.props.handleBookUpdate}
                    book={book}
                    title={book.title}
                    authors={bookAuthors}
                    url={`url(${thumbnailImage})`}
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
