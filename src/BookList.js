import React, { Component } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import { observer } from "mobx-react";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";

// Stores
import bookStore from "./stores/BookStore";

// const instance = axios.create({
//   baseURL: "https://the-index-api.herokuapp.com"
// });

class BookList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     books: [],
  //     loading: true
  //   };
  // }

  // componentDidMount() {
  //   instance
  //     .get("https://the-index-api.herokuapp.com/api/books/")
  //     .then(res => res.data)
  //     .then(books =>
  //       this.setState({
  //         books,
  //         loading: false
  //       })
  //     )
  //     .catch(err => console.error(err));
  // }

  // filterBooksByColor(bookColor) {
  //   return this.state.books.filter(book => book.color === bookColor);
  // }

  render() {
    const bookColor = bookStore.color;
    let books;
    let allBooksButton;

    if (!bookColor) {
      books = bookStore.books;
    } else {
      books = bookStore.filterBooksByColor(bookColor);
      allBooksButton = (
        <Link to="/books">
          <button className="btn">All Books</button>
        </Link>
      );
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div className="books">
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        {allBooksButton}
        <BookTable books={books} />
      </div>
    );
  }
}

export default observer(BookList);
