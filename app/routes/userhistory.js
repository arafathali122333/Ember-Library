import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class UserhistoryRoute extends Route {
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
      booksData = await this.store.findAll('book'),
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

    for (let element of users[index].borrowed) {
      check = booksData.filter((book) => book.id.includes(element.id));
      arr.push(check[0]);
    }

    return arr;
  }
}
