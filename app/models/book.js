import Model, { attr } from '@ember-data/model';

export default class BookModel extends Model {
  @attr author;
  @attr year;
  @attr pages;
  @attr country;
  @attr title;
  @attr image;
  @attr availablebooks;
  @attr isthere;
}
