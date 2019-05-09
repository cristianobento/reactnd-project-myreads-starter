import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

export default class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      query: ""
    };
  }

  searchBooks() {
    BooksAPI.search(this.state.query.trim()).then(books => {
      if (books.error === "empty query") {
        this.setState({
          books: []
        });
      } else {
        this.setState({
          books: books
        });
      }
    });
  }
  updateQuery = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length >= 1) {
          this.searchBooks();
        } else if (!this.state.query) {
        }
      }
    );
  };
  render() {
    const { query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              ref={input => (this.search = input)}
              value={query}
              onChange={() => this.updateQuery()}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state &&
              this.state.books &&
              this.state.books.map(book => {
                if (typeof book.authors === "undefined") {
                  book["authors"] = "";
                }
                if (typeof book.imageLinks === "undefined") {
                  book["imageLinks"] = "";
                }
                return (
                  <li key={book.id}>
                    <Book
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
