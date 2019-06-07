import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

export default class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  }

  handleBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

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
      <div className="app">
        <Route exact path="/" component={ListBooks} />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <SearchBooks
              books={this.state.books}
              shelves={shelves}
              handleBooks={this.handleBooks}
            />
          )}
        />
      </div>
    );
  }
}
