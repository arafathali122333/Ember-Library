import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AdminHomeComponent extends Component {
  @service localStorageVariable;
  @tracked usersData = this.localStorageVariable.getData;
  @tracked sortBtn = true;

  @action deleteUser(user) {
    let users = this.localStorageVariable.getData,
      index;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].userName == user.userName &&
        users[i].password == user.password
      ) {
        index = i;
      }
    }
    this.localStorageVariable.removeUser(index);
    this.usersData = this.localStorageVariable.getData;
    this.filter();
  }

  showAlert(books) {
    let borrowedBooks = [];
    books.forEach(function (book, i) {
      borrowedBooks.push(i + 1 + ', ' + book.id);
    });
    window.alert(
      'This user not returned following books:\n' + borrowedBooks.join('\n')
    );
  }

  @action
  filter(sort) {
    let query = this.query,
      users = this.localStorageVariable.getData;
    if (query) {
      users = users.filter((user) =>
        user.userName.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (sort) {
      let check = this.sortBtn;
      users.sort(function (a, b) {
        var textA = a.userName.toUpperCase();
        var textB = b.userName.toUpperCase();
        if (check) {
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        } else {
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        }
      });
      this.sortBtn = !check;
    }
    this.usersData = users;
  }
}
