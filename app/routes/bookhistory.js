import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BookhistoryRoute extends Route {
  @service localStorageVariable;
  @service store;
  @service router;
  model() {
    if (!localStorage.getItem('currentUser')) {
      this.router.transitionTo('index');
      return;
    }
    let books = this.localStorageVariable.getBooksData.data;
    let users = this.localStorageVariable.getData;
    let booksHistory = [];
    for (let element of books) {
      booksHistory.push({
        title: element.id,
        img: element.attributes.image,
        attributes: [],
      });
      let len = booksHistory.length - 1;
      for (let user of users) {
        booksHistory[len].attributes.push({
          name: user.userName,
          borrowed: [],
          returned: [],
        });
        let len2 = booksHistory[len].attributes.length - 1;
        for (let borrow of user.history.borrowed) {
          if (element.id === borrow.id) {
            booksHistory[len].attributes[len2].borrowed.push({
              time: borrow.time,
            });
          }
        }
        for (let returned of user.history.returned) {
          if (element.id === returned.id) {
            booksHistory[len].attributes[len2].returned.push({
              time: returned.time,
            });
          }
        }
      }
    }
    return booksHistory;
  }
}
