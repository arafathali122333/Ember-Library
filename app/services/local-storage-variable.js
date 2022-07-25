import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LocalStorageVariableService extends Service {
  @tracked getData = JSON.parse(localStorage.getItem('users'));
  @tracked getBooksData = JSON.parse(localStorage.getItem('books'));
  @tracked expiredDays = JSON.parse(localStorage.getItem('expire'));

  @action
  add(item) {
    this.getData.push(item);
    localStorage.setItem('users', JSON.stringify(this.getData));
  }

  @action
  borrowed(item, index) {
    this.getData[index].borrowed.push(item);
    this.getData[index].history.borrowed.push(item);
    localStorage.setItem('users', JSON.stringify(this.getData));
  }

  @action
  returned(item, index) {
    let borrow = this.getData[index].borrowed;
    for (let i = 0; i < borrow.length; i++) {
      if (borrow[i].id == item.id) {
        borrow.splice(i, 1);
        break;
      }
    }
    this.getData[index].borrowed = borrow;
    this.getData[index].history.returned.push(item);
    localStorage.setItem('users', JSON.stringify(this.getData));
  }

  @action
  removeUser(index) {
    this.getData.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(this.getData));
  }

  @action
  addBooks(item) {
    this.getBooksData.data.push(item);
    localStorage.setItem('books', JSON.stringify(this.getBooksData));
  }

  @action
  availableBooks(bookId, status) {
    let books = this.getBooksData;
    for (let book of books.data) {
      if (book.id == bookId) {
        status == 'borrowed'
          ? book.attributes.availablebooks--
          : status == 'returned'
          ? book.attributes.availablebooks++
          : status == 'remove'
          ? (book.attributes.isthere = false)
          : (book.attributes.isthere = true);
        break;
      }
    }
    localStorage.setItem('books', JSON.stringify(books));
  }
}
