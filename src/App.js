import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

export default class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListBooks} />
        <Route exact path="/search" component={SearchBooks} />
      </div>
    );
  }
}
