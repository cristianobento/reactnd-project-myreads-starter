import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookshelfChanger from "./BookshelfChanger";

export default class SearchBooks extends Component {
  state = {
    books: [],
    query: ""
  };

  updateQuery = query => {
    this.setState(() => ({
      query: query.trim()
    }));

    if (query) {
      BooksAPI.search(query).then(books => {
        if (!books.error) {
          this.setState(() => ({
            books
          }));
        }
      });
    }
  };

  componentDidMount() {
    BooksAPI.getAll().then(result => {
      this.setState(currentState => ({
        books: result
      }));
    });
  }

  render() {
    const { query, books } = this.state;
    const showingBooks =
      query === ""
        ? books
        : books.filter(b =>
            b.title.toLowerCase().includes(query.toLocaleLowerCase())
          );

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
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
                          typeof book.imageLinks !== "undefined"
                            ? book.imageLinks.smallThumbnail
                            : "https://placekitten.com/130/195"
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
    );
  }
}
