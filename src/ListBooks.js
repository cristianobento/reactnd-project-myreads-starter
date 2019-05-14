import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

export default class ListBooks extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
    this.handleBookUpdate = this.handleBookUpdate.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getBookById = id => {
    BooksAPI.get(id).then(book => {
      return book;
    });
  };

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  };

  handleBookUpdate() {
    this.getAllBooks();
  }

  render() {
    const currReadingList = this.state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToReadList = this.state.books.filter(
      book => book.shelf === "wantToRead"
    );
    const readList = this.state.books.filter(book => book.shelf === "read");

    const shelves = [
      [currReadingList, "Currently Reading"],
      [wantToReadList, "Want to Read"],
      [readList, "Read"]
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map(shelf => (
            <Bookshelf
              key={shelf[1]}
              handleBookUpdate={this.handleBookUpdate}
              category={shelf[1]}
              books={shelf[0]}
            />
          ))}
        </div>

        <div className="open-search">
          <Link to="/search" className="add-book">
            Add a book{" "}
          </Link>
        </div>
      </div>
    );
  }
}
