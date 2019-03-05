import React, { Component } from "react";
import PropTypes from "prop-types";
import BookshelfChanger from "./BookshelfChanger";

export default class Bookshelf extends Component {
  static propTypes = {};

  render() {
    const { category, books } = this.props;
    let showingBooks = books;
    console.log(books);
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{category}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {showingBooks.map(book => (
                <li key={book.id} className="book-item">
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url("${
                            book.imageLinks.smallThumbnail
                          }")`
                        }}
                      />
                      <BookshelfChanger />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
