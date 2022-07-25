import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ShowHistoryComponent extends Component {
  @tracked return = this.args.userdata.returned;
  @tracked borrow = this.args.userdata.borrowed;
  @tracked filter = this.args.books;
  @service localStorageVariable;
  @action
  returnBook(element) {
    let date = new Date();
    let users = JSON.parse(localStorage.getItem('users')),
      currentUser = JSON.parse(localStorage.getItem('currentUser')),
      index,
      booksData = this.filter,
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
      if (check[0]) {
        arr.push(check[0]);
      }
    }
    this.return = users[index].history.returned;
    this.borrow = users[index].history.borrowed;
    this.filter = arr;
    this.localStorageVariable.availableBooks(element.id, 'returned');
  }
}
