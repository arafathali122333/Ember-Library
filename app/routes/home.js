import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class HomeRoute extends Route {
  @service store;
  @service router;
  async model() {
    if (!localStorage.getItem('currentUser')) {
      this.router.transitionTo('index');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users')),
      currentUser = JSON.parse(localStorage.getItem('currentUser')),
      index,
      booksData = await this.store.findAll('book');
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].userName == currentUser.userName &&
        users[i].password == currentUser.password
      ) {
        index = i;
        break;
      }
    }
    for (let element of users[index].borrowed) {
      let check = booksData.filter(function (book) {
        if (!book.id.includes(element.id)) {
          return book;
        }
      });
      booksData = check;
    }
    return booksData;
  }
}
