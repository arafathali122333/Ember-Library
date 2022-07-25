import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AdminManageBooksComponent extends Component {
    @service localStorageVariable;
    @tracked switchBtn = true;
    @tracked allBooks = JSON.parse(localStorage.getItem('books')).data;
    @tracked sortBtn = true;
    @tracked showBooksBtn = true;
  
    @action
    changeBtn() {
      this.switchBtn = !this.switchBtn;
      if(!this.switchBtn){
      this.filter();}
    }
  
    @action
    addBook(e) {
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.target).entries()),
        reader = new FileReader(),
        self = this;
      if (data.img) {
        reader.readAsDataURL(data.img);
      }
      reader.onload = function () {
        self.localStorageVariable.addBooks({
          type: 'books',
          id: data.title,
          attributes: {
            author: data.author,
            country: data.country,
            image: reader.result,
            pages: data.pages,
            availablebooks: data.noOfBooks,
            title: data.title,
            year: data.year,
            isthere: true,
          },
        });
      };
      e.target.reset();
      window.alert('Book added successfully!');
    }
    @action
    removeAllBooks(book, status) {
      this.localStorageVariable.availableBooks(book, status);
      this.filter();
    }
  
    @action
    filter(sort) {
      let query = this.query,
        Books = JSON.parse(localStorage.getItem('books')).data;
      if (query) {
        Books = Books.filter((book) =>
          book.id.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (sort) {
        let check = this.sortBtn;
        Books.sort(function (a, b) {
          var textA = a.id.toUpperCase();
          var textB = b.id.toUpperCase();
          if (check) {
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          } else {
            return textA > textB ? -1 : textA < textB ? 1 : 0;
          }
        });
        this.sortBtn = !check;
      }
      this.allBooks = Books;
    }
  
    @action
    showAvailAll() {
      this.showBooksBtn = !this.showBooksBtn;
    }
}
