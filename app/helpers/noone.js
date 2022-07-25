import { helper } from '@ember/component/helper';

export default helper(function noone([positional] /*, named*/) {
  let usersLength = positional.length,
    noActiveLength = 0;
  for (let element of positional) {
    if (element.borrowed.length === 0 && element.returned.length === 0) {
      noActiveLength++;
    }
  }
  if (usersLength === noActiveLength) {
    return 'admin-noonefound';
  }
  return 'hide';
});
