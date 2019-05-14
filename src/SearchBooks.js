import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
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

  componentDidMount() {
    this.searchBooks = _.debounce(this.searchBooks, 1000);
  }

  searchBooks() {
    if (this.state.query.trim() && this.state.query.trim().length > 1) {
      BooksAPI.search(this.state.query.trim())
        .then(books => {
          this.setState({
            books: books
          });
        })
        .catch(() => this.setState({ books: [] }));
    }
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
          this.setState({
            books: []
          });
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
            {!this.state.books ? (
              <li> No books to show </li>
            ) : (
              this.state.books.map(book => {
                const thumbnailImage = book.imageLinks
                  ? book.imageLinks.thumbnail
                  : "http://via.placeholder.com/128x193?text=No%20Cover";

                const bookAuthors = book.authors
                  ? book.authors
                  : "No author specified";

                return (
                  <li key={book.id}>
                    <Book
                      book={book}
                      title={book.title}
                      authors={bookAuthors}
                      url={`url(${thumbnailImage})`}
                    />
                  </li>
                );
              })
            )}
          </ol>
        </div>
      </div>
    );
  }
}
