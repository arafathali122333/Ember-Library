import EmberRouter from '@ember/routing/router';
import config from 'library-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home');
  this.route('admin');
  this.route('userhistory');
  this.route('addbooks');
  this.route('bookhistory');
});
