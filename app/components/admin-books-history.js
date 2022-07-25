import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AdminBooksHistoryComponent extends Component {
  @tracked results = this.args.booksdata;
  @tracked sortBtn = true;

  @action
  filter(sort) {
    let query = this.query,
      books = this.args.booksdata;
    if (query) {
      books = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (sort) {
      let check = this.sortBtn;
      books.sort(function (a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        if (check) {
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        } else {
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        }
      });
      this.sortBtn = !check;
    }
    this.results = books;
  }
}
