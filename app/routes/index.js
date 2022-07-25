import Route from '@ember/routing/route';
export default class IndexRoute extends Route {
  async model() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', '[]');
    }
    if (!localStorage.getItem('expire')) {
      localStorage.setItem('expire', '7');
    }
    if (!localStorage.getItem('books')) {
      let data = await fetch('/api/books.json').then((response) => {
        return response.json();
      });
      localStorage.setItem('books', JSON.stringify(data));
    }
  }
}
