import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  constructor() {
    this.books = [];
    this.color = "";
    this.loading = true;
    this.query = "";
  }

  fetchBooks() {
    return instance
      .get("/api/books/")
      .then(res => res.data)
      .then(books => {
        this.books = books;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  get filterBooks() {
    return this.books.filter(book =>
      `${book.title}`.toLowerCase().includes(this.query)
    );
  }

  get filterBooksByColor() {
    return this.books.filter(book => book.color === this.color);
  }

  //   getBookById(id) {
  //     return this.books.find(book => +book.id === +id);
  //   }
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  color: observable,
  query: observable,
  filterBooks: computed,
  filterBooksByColor: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
