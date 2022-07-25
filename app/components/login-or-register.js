import Component from '@ember/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginOrRegisterComponent extends Component {
  @service router;
  @service localStorageVariable;
  @tracked login = false;
  @tracked register = true;

  @action
  showRegister() {
    this.element.querySelector('form').reset();
    this.login = true;
    this.register = false;
  }

  @action
  showLogin() {
    this.element.querySelector('form').reset();
    this.login = false;
    this.register = true;
  }

  @action
  abc(e) {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target).entries()),
      arr = this.localStorageVariable.getData;
    if (
      this.element.getElementsByClassName('login-btn')[0].innerText == 'Login'
    ) {
      if (data.uname == 'Library' && data.psw == 'Lib@123') {
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ userName: data.uname, password: data.psw })
        );
        this.router.transitionTo('admin');
        return;
      } else {
        for (let element of arr) {
          if (element.userName == data.uname && element.password == data.psw) {
            this.router.transitionTo('home');
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ userName: data.uname, password: data.psw })
            );
            return;
          }
        }
      }
      window.alert("Please enter your userName and password correctly!");
      document.getElementsByClassName('login-input')[1].focus();
    } else {
      if (
        data.psw.match(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        )
      ) {
        

        for (let element of arr) {
          if (element.userName == data.uname) {
            window.alert("This UserName is already in used one");
            return;
          }
        }


        this.localStorageVariable.add({
          userName: data.uname,
          password: data.psw,
          borrowed: [],
          history: { borrowed: [], returned: [] },
        });
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ userName: data.uname, password: data.psw })
        );
        this.router.transitionTo('home');
        window.alert(
          `Each books are returned into ${localStorage.getItem('expire')} days!`
        );
      } else {
        document
          .getElementsByClassName('login-input')[1]
          .setCustomValidity(
            'Password must contain one digits,upper,lower,special cases and 8 to 12 characters!'
          );
        document.getElementsByClassName('login-input')[1].reportValidity();
      }
    }
  }
}
