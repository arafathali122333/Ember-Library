import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AddbooksRoute extends Route {
  @service router;
  model() {
    if (!localStorage.getItem('currentUser')) {
      this.router.transitionTo('index');
    }
  }
}
