import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';

export default class ShowBooksComponent extends Component {
  @tracked query = '';
  @tracked select = 'title';
  @tracked sortBooks = this.args.books;
  @tracked results = this.sortBooks;
  @tracked afterBorrow = this.args.books;
  @tracked sortBtn = true;
  sortBy = ['title'];
  @sort('results', 'sortBy') std;
  @service localStorageVariable;
  @service router;

  @action
  search() {
    let books = this.sortBooks,
      query = this.query,
      sortBy = this.select;
    if (query) {
      if (sortBy == 'title' || sortBy == 'author') {
        this.results = books.filter((book) => (book[sortBy]).toLowerCase().includes(query.toLowerCase()));
      } else {
        this.sortBtn
          ? (this.results = books.filter(function (book) {
              return book[sortBy] >= parseInt(query);
            }))
          : (this.results = books.filter(function (book) {
              return book[sortBy] <= parseInt(query);
            }));
      }
    } else {
      this.results = books;
    }
  }

  @action
  ascOrDesc() {
    this.sortBtn = !this.sortBtn;
    let option = this.select;
    if (this.sortBtn) {
      this.sortBy = [option];
      this.sortBooks = this.std;
      this.results = this.sortBooks;
    } else {
      this.sortBy = [option + ':desc'];
      this.sortBooks = this.std;
      this.results = this.sortBooks;
    }
    this.query = '';
  }

  @action
  sortBooksBy() {
    let option = document.getElementsByClassName('home-filters-select')[0]
      .value;
    if (option) {
      this.select = option;
      this.sortBtn
        ? (this.sortBy = [option])
        : (this.sortBy = [option + ':desc']);
      this.sortBooks = this.std;
      this.results = this.sortBooks;
    }
    this.query = '';
  }

  @action
  reset() {
    this.sortBooks = this.afterBorrow;
    this.results = this.sortBooks;
    this.query = '';
  }

  @action
  borrowBook(element) {
    let date = new Date();
    let users = JSON.parse(localStorage.getItem('users')),
      currentUser = JSON.parse(localStorage.getItem('currentUser')),
      index,
      booksData = this.args.books;

    for (let i = 0; i < users.length; i++) {
      if (
        users[i].userName == currentUser.userName &&
        users[i].password == currentUser.password
      ) {
        index = i;
        break;
      }
    }

    this.localStorageVariable.borrowed({ id: element.id, time: date }, index);
    users = JSON.parse(localStorage.getItem('users'));
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    for (let element of users[index].borrowed) {
      let check = booksData.filter(function (book) {
        if (!book.id.includes(element.id)) {
          return book;
        }
      });
      booksData = check;
    }
    this.query = '';
    document.getElementsByClassName('home-filters-select')[0].value = '';
    this.sortBtn = true;
    this.afterBorrow = booksData;
    this.results = booksData;
    this.sortBooks = booksData;
    this.localStorageVariable.availableBooks(element.id, 'borrowed');
  }

  @action
  returnBook(element) {
    let date = new Date();
    let users = JSON.parse(localStorage.getItem('users')),
      currentUser = JSON.parse(localStorage.getItem('currentUser')),
      index,
      booksData = this.args.books,
      arr = [],
      check;

    for (let i = 0; i < users.length; i++) {
      if (
        users[i].userName == currentUser.userName &&
        users[i].password == currentUser.password
      ) {
        index = i;
        break;
      }
    }

    this.localStorageVariable.returned({ id: element.id, time: date }, index);
    users = JSON.parse(localStorage.getItem('users'));
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    for (let element of users[index].borrowed) {
      check = booksData.filter((book) => book.id.includes(element.id));
      arr.push(check[0]);
    }
    this.query = '';
    document.getElementsByClassName('home-filters-select')[0].value = '';
    this.sortBtn = true;
    this.afterBorrow = arr;
    this.results = arr;
    this.sortBooks = arr;
    this.localStorageVariable.availableBooks(element.id, 'returned');
  }

  @action
  goHistory() {
    this.router.transitionTo('userhistory');
  }
  @action
  goHome() {
    this.router.transitionTo('home');
  }

  @action
  info() {
    window.alert(
      `Each books are returned into ${localStorage.getItem('expire')} days`
    );
  }

  @tracked historyOrBorrowIcon = true;
  @tracked currentUserHistory = '';
  @tracked expiredData = '';
  @action
  historyOrBorrow() {
    this.historyOrBorrowIcon = !this.historyOrBorrowIcon;

    let users = JSON.parse(localStorage.getItem('users')),
      currentUser = JSON.parse(localStorage.getItem('currentUser')),
      index,
      arr = [],
      booksData = this.args.books,
      check;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].userName == currentUser.userName &&
        users[i].password == currentUser.password
      ) {
        index = i;
        this.currentUserHistory = users[i].history;
        break;
      }
    }
    if (!this.historyOrBorrowIcon) {
      for (let element of users[index].borrowed) {
        let time = element.time,
          countDownDate = new Date(time).getTime(),
          now = new Date().getTime(),
          distance = now - countDownDate,
          days = Math.floor(distance / (1000 * 60 * 60 * 24)),
          expire = parseInt(localStorage.getItem('expire'));
        if (days >= expire) {
          check = booksData.filter((book) => book.id.includes(element.id));
          arr.push(check[0]);
        }
      }
      this.expiredData = arr;
    } else {
      for (let element of users[index].borrowed) {
        check = booksData.filter((book) => book.id.includes(element.id));
        arr.push(check[0]);
      }
      this.afterBorrow = arr;
      this.results = arr;
      this.sortBooks = arr;
    }
  }

  @action
  signOut() {
    localStorage.removeItem('currentUser');
    this.router.transitionTo('index');
  }

  @action
  deleteAccount() {
    if (confirm('Are you sure delete this account?') == true) {
      let users = this.localStorageVariable.getData,
        user = JSON.parse(localStorage.getItem('currentUser'));
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].userName == user.userName &&
          users[i].password == user.password
        ) {
          if (users[i].borrowed.length) {
            let borrowedBooks = [];
            users[i].borrowed.forEach(function (book, i) {
              borrowedBooks.push(i + 1 + ', ' + book.id);
            });
            window.alert(
              'Please return following books then remove your account:\n' +
                borrowedBooks.join('\n')
            );
          } else {
            this.localStorageVariable.removeUser(i);
            localStorage.removeItem('currentUser');
            this.router.transitionTo('index');
          }
        }
      }
    }
  }
}
