import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AdminNavBarComponent extends Component {
  @service router;

  @action
  setExpiryDate() {
    let days = parseInt(
      prompt(
        'Please set the expiry date of books!(Put only numbers & days are below 30)'
      )
    );
    if (isNaN(days)) {
      this.setExpiryDate();
      return;
    } else if (days > 30) {
      this.setExpiryDate();
      return;
    } else {
      localStorage.setItem('expire', days);
    }
  }

  @action
  addBooks() {
    this.router.transitionTo('addbooks');
  }
  @action
  gotoHome() {
    this.router.transitionTo('admin');
  }

  @action
  booksHistory() {
    this.router.transitionTo('bookhistory');
  }

  @action
  signOut() {
    localStorage.removeItem('currentUser');
    this.router.transitionTo('index');
  }
}
